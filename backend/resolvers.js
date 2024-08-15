const resolvers = {
    Query: {
      rooms: async (_, __, { Room }) => {
        return await Room.find();
      },
      room: async (_, { id }, { Room }) => {
        return await Room.findById(id);
      },
      availableRooms: async (_, { checkIn, checkOut }, { Room, Booking }) => {
        const bookedRoomIds = await Booking.find({
          $or: [
            { checkIn: { $gte: new Date(checkIn), $lt: new Date(checkOut) } },
            { checkOut: { $gt: new Date(checkIn), $lte: new Date(checkOut) } },
            {
              $and: [
                { checkIn: { $lte: new Date(checkIn) } },
                { checkOut: { $gte: new Date(checkOut) } },
              ],
            },
          ],
        }).distinct('room');
  
        return await Room.find({ _id: { $nin: bookedRoomIds }, available: true });
      },
      bookings: async (_, __, { Booking }) => {
        return await Booking.find().populate('room').populate('guest');
      },
      booking: async (_, { id }, { Booking }) => {
        return await Booking.findById(id).populate('room').populate('guest');
      },
      guests: async (_, __, { Guest }) => {
        return await Guest.find();
      },
      guest: async (_, { id }, { Guest }) => {
        return await Guest.findById(id);
      },
      settings: async (_, __, { Settings }) => {
        let settings = await Settings.findOne();
        if (!settings) {
          settings = await new Settings().save();
        }
        return settings;
      },
    },
    Mutation: {
      addRoom: async (_, { number, type, price, capacity, amenities, available }, { Room }) => {
        const newRoom = new Room({ number, type, price, capacity, amenities, available });
        return await newRoom.save();
      },
      updateRoom: async (_, { id, ...rest }, { Room }) => {
        return await Room.findByIdAndUpdate(id, rest, { new: true });
      },
      deleteRoom: async (_, { id }, { Room }) => {
        await Room.findByIdAndDelete(id);
        return true;
      },
      addGuest: async (_, { name, email, phone, address }, { Guest }) => {
        const newGuest = new Guest({ name, email, phone, address });
        return await newGuest.save();
      },
      updateGuest: async (_, { id, ...rest }, { Guest }) => {
        return await Guest.findByIdAndUpdate(id, rest, { new: true });
      },
      deleteGuest: async (_, { id }, { Guest }) => {
        await Guest.findByIdAndDelete(id);
        return true;
      },
      createBooking: async (_, { roomId, guestId, checkIn, checkOut }, { Room, Guest, Booking }) => {
        const room = await Room.findById(roomId);
        const guest = await Guest.findById(guestId);
        if (!room || !guest) {
          throw new Error('Room or Guest not found');
        }
  
        const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
        const totalPrice = room.price * nights;
  
        const newBooking = new Booking({
          room: roomId,
          guest: guestId,
          checkIn,
          checkOut,
          totalPrice,
        });
  
        return await newBooking.save();
      },
      updateBookingStatus: async (_, { id, status }, { Booking }) => {
        return await Booking.findByIdAndUpdate(id, { status }, { new: true });
      },
      cancelBooking: async (_, { id }, { Booking }) => {
        await Booking.findByIdAndUpdate(id, { status: 'cancelled' });
        return true;
      },
      updateSettings: async (_, { darkMode }, { Settings }) => {
        let settings = await Settings.findOne();
        if (!settings) {
          settings = new Settings();
        }
        settings.darkMode = darkMode;
        return await settings.save();
      },
    },
  };
  
  module.exports = resolvers;