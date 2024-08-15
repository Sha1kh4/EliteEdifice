const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Room {
    id: ID!
    number: String!
    type: String!
    price: Float!
    capacity: Int!
    amenities: [String]
    available: Boolean!
  }

  type Guest {
    id: ID!
    name: String!
    email: String!
    phone: String
    address: String
  }

  type Booking {
    id: ID!
    room: Room!
    guest: Guest!
    checkIn: String!
    checkOut: String!
    totalPrice: Float!
    status: String!
  }

  type Settings {
    id: ID!
    darkMode: Boolean!
  }

  type Query {
    rooms: [Room]
    room(id: ID!): Room
    availableRooms(checkIn: String!, checkOut: String!): [Room]
    bookings: [Booking]
    booking(id: ID!): Booking
    guests: [Guest]
    guest(id: ID!): Guest
    settings: Settings
  }

  type Mutation {
    addRoom(number: String!, type: String!, price: Float!, capacity: Int!, amenities: [String], available: Boolean!): Room
    updateRoom(id: ID!, number: String, type: String, price: Float, capacity: Int, amenities: [String], available: Boolean): Room
    deleteRoom(id: ID!): Boolean

    addGuest(name: String!, email: String!, phone: String, address: String): Guest
    updateGuest(id: ID!, name: String, email: String, phone: String, address: String): Guest
    deleteGuest(id: ID!): Boolean

    createBooking(roomId: ID!, guestId: ID!, checkIn: String!, checkOut: String!): Booking
    updateBookingStatus(id: ID!, status: String!): Booking
    cancelBooking(id: ID!): Boolean

    updateSettings(darkMode: Boolean!): Settings
  }
`;

module.exports = typeDefs;