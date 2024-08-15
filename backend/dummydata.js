require('dotenv').config();
const mongoose = require('mongoose');
const Room = require('./models/Room');
const Guest = require('./models/Guest');
const Booking = require('./models/Booking');

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const roomTypes = ['Single', 'Double', 'Suite', 'Deluxe'];
const amenities = ['Wi-Fi', 'TV', 'Mini-bar', 'Room service', 'Ocean view', 'Balcony'];

const generateRooms = (count) => {
  const rooms = [];
  for (let i = 1; i <= count; i++) {
    rooms.push({
      number: `${Math.floor(i / 10) + 1}${i % 10}${String.fromCharCode(65 + (i % 26))}`,
      type: roomTypes[Math.floor(Math.random() * roomTypes.length)],
      price: Math.floor(Math.random() * (300 - 50 + 1)) + 50,
      capacity: Math.floor(Math.random() * 4) + 1,
      amenities: amenities.filter(() => Math.random() > 0.5),
      available: Math.random() > 0.3,
    });
  }
  return rooms;
};

const generateGuests = (count) => {
  const guests = [];
  for (let i = 1; i <= count; i++) {
    guests.push({
      name: `Guest ${i}`,
      email: `guest${i}@example.com`,
      phone: `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      address: `${Math.floor(Math.random() * 1000) + 1} Main St, City, Country`,
    });
  }
  return guests;
};

const generateBookings = (rooms, guests, count) => {
  const bookings = [];
  const statuses = ['confirmed', 'checked-in', 'checked-out', 'cancelled'];
  
  for (let i = 1; i <= count; i++) {
    const checkIn = new Date();
    checkIn.setDate(checkIn.getDate() + Math.floor(Math.random() * 30));
    const checkOut = new Date(checkIn);
    checkOut.setDate(checkOut.getDate() + Math.floor(Math.random() * 7) + 1);

    bookings.push({
      room: rooms[Math.floor(Math.random() * rooms.length)]._id,
      guest: guests[Math.floor(Math.random() * guests.length)]._id,
      checkIn,
      checkOut,
      totalPrice: Math.floor(Math.random() * (1000 - 100 + 1)) + 100,
      status: statuses[Math.floor(Math.random() * statuses.length)],
    });
  }
  return bookings;
};

const populateDb = async () => {
  try {
    // Clear existing data
    await Room.deleteMany({});
    await Guest.deleteMany({});
    await Booking.deleteMany({});

    // Generate and insert rooms
    const roomsData = generateRooms(50);
    const rooms = await Room.insertMany(roomsData);
    console.log('Rooms created:', rooms.length);

    // Generate and insert guests
    const guestsData = generateGuests(100);
    const guests = await Guest.insertMany(guestsData);
    console.log('Guests created:', guests.length);

    // Generate and insert bookings
    const bookingsData = generateBookings(rooms, guests, 200);
    const bookings = await Booking.insertMany(bookingsData);
    console.log('Bookings created:', bookings.length);

    console.log('Database populated successfully!');
  } catch (error) {
    console.error('Error populating database:', error);
  } finally {
    mongoose.disconnect();
  }
};

populateDb();