require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const cors = require('cors');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const Room = require('./models/Room');
const Booking = require('./models/Booking');
const Guest = require('./models/Guest');
const Settings = require('./models/Settings');

const PORT = process.env.PORT || 4000;

async function startServer() {
  const app = express();
  app.use(cors());

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: { Room, Booking, Guest, Settings }
  });
  
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    app.listen(PORT, () => 
      console.log(`Server running on http://localhost:${PORT}${apolloServer.graphqlPath}`)
    );
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

startServer();