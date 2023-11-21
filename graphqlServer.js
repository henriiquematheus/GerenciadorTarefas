/// graphqlServer.js
const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const mongoose = require('mongoose');

// Importe seus modelos e controladores aqui
const Task = require('./models/task');
const User = require('./models/user');
const taskController = require('./controllers/taskController');
const userController = require('./controllers/userController');

// Defina seu schema GraphQL
const typeDefs = gql`
  type Task {
    _id: ID!
    descricao: String!
    completada: Boolean!
    owner: User!
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    tasks: [Task!]!
  }

  type Query {
    tasks: [Task!]!
    users: [User!]!
    task(_id: ID!): Task
    user(_id: ID!): User
  }

  type Mutation {
    createTask(descricao: String!, completada: Boolean!): Task!
    createUser(name: String!, email: String!, password: String!): User!
    updateTask(_id: ID!, descricao: String, completada: Boolean): Task!
    deleteTask(_id: ID!): Task!
  }
`;

// Implemente os resolvers para suas operações
const resolvers = {
  Query: {
    tasks: async () => {
      return await Task.find();
    },
    users: async () => {
      return await User.find();
    },
    task: async (_, { _id }) => {
      return await Task.findById(_id);
    },
    user: async (_, { _id }) => {
      return await User.findById(_id);
    },
  },
  Mutation: {
    createTask: async (_, args) => {
      const task = new Task(args);
      await task.save();
      return task;
    },
    createUser: async (_, args) => {
      const user = new User(args);
      await user.save();
      return user;
    },
    updateTask: async (_, { _id, ...args }) => {
      return await Task.findByIdAndUpdate(_id, args, { new: true });
    },
    deleteTask: async (_, { _id }) => {
      return await Task.findByIdAndDelete(_id);
    },
  },
  User: {
    tasks: async (parent) => {
      return await Task.find({ owner: parent._id });
    },
  },
  Task: {
    owner: async (parent) => {
      return await User.findById(parent.owner);
    },
  },
};

const startApolloServer = async () => {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });
  
    await server.start();
  
    const app = express();
  
    server.applyMiddleware({ app });
  
    // Configurações adicionais do Express, se houver
  
    return { server, app };
  };
  
  module.exports = startApolloServer;