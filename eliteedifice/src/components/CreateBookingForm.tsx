import React, { useState } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';

const CREATE_BOOKING = gql`
  mutation CreateBooking($roomId: ID!, $guestName: String!, $checkIn: String!, $checkOut: String!) {
    createBooking(roomId: $roomId, guestName: $guestName, checkIn: $checkIn, checkOut: $checkOut) {
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

const GET_AVAILABLE_ROOMS = gql`
  query GetAvailableRooms($checkIn: String!, $checkOut: String!) {
    availableRooms(checkIn: $checkIn, checkOut: $checkOut) {
      id
      number
      type
    }
  }
`;

interface CreateBookingFormProps {
  onBookingCreated: () => void;
}

const CreateBookingForm: React.FC<CreateBookingFormProps> = ({ onBookingCreated }) => {
  const [roomId, setRoomId] = useState('');
  const [guestName, setGuestName] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  const [createBooking] = useMutation(CREATE_BOOKING);
  const { data: availableRoomsData, loading: availableRoomsLoading, refetch: refetchAvailableRooms } = useQuery(GET_AVAILABLE_ROOMS, {
    variables: { checkIn, checkOut },
    skip: !checkIn || !checkOut,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createBooking({
        variables: {
          roomId,
          guestName,
          checkIn,
          checkOut,
        },
      });
      onBookingCreated();
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  const handleDateChange = () => {
    if (checkIn && checkOut) {
      refetchAvailableRooms({ checkIn, checkOut });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 space-y-4">
      <input
        type="date"
        value={checkIn}
        onChange={(e) => {
          setCheckIn(e.target.value);
          handleDateChange();
        }}
        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        required
      />
      <input
        type="date"
        value={checkOut}
        onChange={(e) => {
          setCheckOut(e.target.value);
          handleDateChange();
        }}
        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        required
      />
      <select
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        required
      >
        <option value="">Select a room</option>
        {availableRoomsLoading ? (
          <option disabled>Loading rooms...</option>
        ) : (
          availableRoomsData?.availableRooms.map((room: any) => (
            <option key={room.id} value={room.id}>
              Room {room.number} - {room.type}
            </option>
          ))
        )}
      </select>
      <input
        type="text"
        value={guestName}
        onChange={(e) => setGuestName(e.target.value)}
        placeholder="Guest Name"
        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        required
      />
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Create Booking
      </button>
    </form>
  );
};

export default CreateBookingForm;