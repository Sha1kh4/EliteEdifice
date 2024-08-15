import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const CREATE_BOOKING = gql`
  mutation CreateBooking($roomId: ID!, $guestId: ID!, $checkIn: String!, $checkOut: String!) {
    createBooking(roomId: $roomId, guestId: $guestId, checkIn: $checkIn, checkOut: $checkOut) {
      id
      room {
        number
      }
      guest {
        name
      }
      checkIn
      checkOut
      status
    }
  }
`;

interface Room {
  id: string;
  number: string;
}

interface Guest {
  id: string;
  name: string;
}

interface BookRoomFormProps {
  rooms: Room[];
  guests: Guest[];
}

const BookRoomForm: React.FC<BookRoomFormProps> = ({ rooms, guests }) => {
  const [roomId, setRoomId] = useState('');
  const [guestId, setGuestId] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  const [createBooking] = useMutation(CREATE_BOOKING, {
    refetchQueries: ['GetBookings'],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createBooking({ variables: { roomId, guestId, checkIn, checkOut } });
    // Reset form
    setRoomId('');
    setGuestId('');
    setCheckIn('');
    setCheckOut('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <h3 className="text-xl font-semibold">Book a Room</h3>
      <div>
        <label htmlFor="room" className="block">Room:</label>
        <select id="room" value={roomId} onChange={(e) => setRoomId(e.target.value)} required className="w-full p-2 border rounded dark:bg-gray-700">
          <option value="">Select a room</option>
          {rooms.map((room) => (
            <option key={room.id} value={room.id}>Room {room.number}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="guest" className="block">Guest:</label>
        <select id="guest" value={guestId} onChange={(e) => setGuestId(e.target.value)} required className="w-full p-2 border rounded dark:bg-gray-700">
          <option value="">Select a guest</option>
          {guests.map((guest) => (
            <option key={guest.id} value={guest.id}>{guest.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="checkIn" className="block">Check-in Date:</label>
        <input type="date" id="checkIn" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} required className="w-full p-2 border rounded dark:bg-gray-700" />
      </div>
      <div>
        <label htmlFor="checkOut" className="block">Check-out Date:</label>
        <input type="date" id="checkOut" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} required className="w-full p-2 border rounded dark:bg-gray-700" />
      </div>
      <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-300">Book Room</button>
    </form>
  );
};

export default BookRoomForm;