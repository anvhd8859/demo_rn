const { ApolloServer, gql } = require("apollo-server");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
dotenv.config();

const { DB_URI, DB_NAME, JWT_SECRET } = process.env;

const getToken = (user) => jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "10h" });

const getUserFromToken = async (req, db) => {
	try {
		const token = req.headers.authorization;
		const tokenData = jwt.verify(token, JWT_SECRET);
		return await db.collection("Users").findOne({ _id: ObjectId(tokenData.id) });
	} catch (e) {
		console.log(e);
		return null;
	}
};

const typeDefs = gql`
	type Query {
		myTaskList: [TaskList!]!
		getTaskList(id: ID!): TaskList!
	}

	type Mutation {
		signIn(input: SignInInput): AuthUser
		signUp(input: SignUpInput): AuthUser

		createTaskList(title: String!): TaskList
		updateTaskList(id: ID!, title: String!): TaskList!
		deleteTaskList(id: ID!): Boolean
		addUserToTaskList(taskId: ID!, userId: ID!): TaskList

		createTodo(content: String!, taskId: ID!): Todo!
        updateTodo(id: ID!, content: String!, isCompleted: Boolean): Todo!
        deleteTodo(id: ID!): Boolean
	}

	input SignInInput {
		email: String!
		password: String!
	}

	input SignUpInput {
		email: String!
		password: String!
		name: String!
		avatar: String
	}

	type AuthUser {
		user: User!
		token: String!
	}

	type User {
		id: ID!
		name: String!
		email: String!
		avatar: String
	}
	type TaskList {
		id: ID!
		title: String!
		progress: Float!
		createdAt: String!

		users: [User!]!
		todos: [Todo!]!
	}
	type Todo {
		id: ID!
		content: String!
		isCompleted: Boolean!

		taskList: TaskList!
	}
`;

const checkAuth = (user) => {
	if (!user) {
		throw new Error("You are not authorized");
	}
};

const resolvers = {
	Query: {
		myTaskList: async (_, __, { db, user }) => {
			checkAuth(user);
			return await db.collection("TaskList").find({ userIds: user._id }).toArray();
		},
		getTaskList: async (_, { id }, { db, user }) => {
			checkAuth(user);
			return await db.collection("TaskList").findOne({ _id: ObjectId(id) });
		},
	},
	Mutation: {
		signIn: async (_, { input }, { db }) => {
			const user = await db.collection("Users").findOne({ email: input.email });
			const isValid = user && bcrypt.compareSync(input.password, user.password);
			if (!isValid) {
				throw new Error("Invalid authentication credentials");
			}
			return { user: user, token: getToken(user) };
		},
		signUp: async (_, { input }, { db }) => {
			const hashedPassword = bcrypt.hashSync(input.password);
			const newUser = {
				...input,
				password: hashedPassword,
			};

			//save to db, id has write to user  don't need process result
			await db.collection("Users").insertOne(newUser);
			return { user: newUser, token: getToken(newUser) };
		},

		// TaskList
		createTaskList: async (_, { title }, { db, user }) => {
			checkAuth(user);
			const newTaskList = {
				title,
				createdAt: new Date().toISOString(),
				userIds: [user._id],
			};
			const result = await db.collection("TaskList").insertOne(newTaskList);
			return newTaskList;
		},
		updateTaskList: async (_, { id, title }, { db, user }) => {
			checkAuth(user);
			const result = await db
				.collection("TaskList")
				.updateOne({ _id: ObjectId(id) }, { $set: { title } });
			// console.log(result);
			return await db.collection("TaskList").findOne({ _id: ObjectId(id) });
		},
		deleteTaskList: async (_, { id }, { db, user }) => {
			checkAuth(user);
			const result = await db.collection("TaskList").deleteOne({ _id: ObjectId(id) });
			return result.deletedCount > 0;
		},
		addUserToTaskList: async (_, { taskId, userId }, { db, user }) => {
			checkAuth(user);
			const taskList = await db.collection("TaskList").findOne({ _id: ObjectId(taskId) });
			if (!taskList) {
				return null;
			}
			if (taskList.userIds.find((id) => id.toString() === userId.toString())) {
				return taskList;
			}
			const result = await db.collection("TaskList").updateOne(
				{
					id: ObjectId(taskId),
				},
				{ $push: { userIds: ObjectId(userId) } }
			);
			taskList.userIds.push(ObjectId(userId));
			return taskList;
		},

		//To do
		createTodo: async (_, { content, taskId }, { db, user }) => {
			checkAuth(user);
			const newTodo = {
				content,
				taskId: ObjectId(taskId),
				isCompleted: false,
			};
			await db.collection("Todo").insertOne(newTodo);
			return newTodo;
		},
        updateTodo: async (_, args, { db, user }) => {
            checkAuth(user);
            const result = await db
                .collection("Todo")
                .updateOne({ _id: ObjectId(args.id) }, { $set: args });
            return await db.collection("Todo").findOne({ _id: ObjectId(args.id) });
        },
        deleteTodo: async (_, { id }, { db, user }) => {
            checkAuth(user);
            const result = await db.collection("Todo").deleteOne({ _id: ObjectId(id) });
            return result.deletedCount > 0;
        }
	},
	User: {
		id: ({ _id, id }) => _id || id,
	},
	TaskList: {
		id: ({ _id, id }) => _id || id,
		progress: async ({_id}, _, { db}) => {
            const todos = await db.collection("Todo").find({ taskId: ObjectId(_id) }).toArray();
            if(todos.length === 0)  return 0;

            const completedTodos = todos.filter((todo) => todo.isCompleted);
            return completedTodos.length / todos.length;
        },
		users: async ({ userIds }, _, { db }) =>
			Promise.all(userIds.map((userId) => db.collection("Users").findOne({ _id: userId }))),
        todos: async ({ _id }, _, { db }) => (
            await db.collection("Todo").find({ taskId: ObjectId(_id) }).toArray()
        ),
	},
	Todo: {
		id: ({ _id, id }) => _id || id,
		taskList: async ({ taskId }, _, { db }) => await db.collection("TaskList").findOne({ _id: taskId }),
	},
};

const start = async () => {
	const client = new MongoClient(DB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		serverApi: ServerApiVersion.v1,
	});
	await client.connect();
	const db = client.db(DB_NAME);

	const context = async ({ req }) => {
		const user = await getUserFromToken(req, db);
		return {
			db,
			user,
		};
	};

	// The ApolloServer constructor requires two parameters: your schema
	// definition and your set of resolvers.
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		context,
		csrfPrevention: true,
	});

	// The `listen` method launches a web server.
	server.listen().then(({ url }) => {
		console.log(`🚀  Server ready at ${url}`);
	});
};

start();
