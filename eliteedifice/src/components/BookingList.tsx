import React from 'react';
import { useMutation, gql } from '@apollo/client';

const CANCEL_BOOKING = gql`
  mutation CancelBooking($id: ID!) {
    cancelBooking(id: $id)
  }
`;

interface Booking {
  id: string;
  room: {
    number: string;
  };
  guest: {
    name: string;
  };
  checkIn: string;
  checkOut: string;
  status: string;
}

interface BookingListProps {
  bookings: Booking[];
}

const BookingList: React.FC<BookingListProps> = ({ bookings }) => {
  const [cancelBooking] = useMutation(CANCEL_BOOKING, {
    refetchQueries: ['GetBookings'],
  });

  const handleCancelBooking = (id: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      cancelBooking({ variables: { id } });
    }
  };

  return (
    <ul className="space-y-4">
      {bookings.map((booking) => (
        <li key={booking.id} className="border p-4 rounded-lg dark:border-gray-700">
          <h3 className="text-lg font-semibold">Booking for Room {booking.room.number}</h3>
          <p>Guest: {booking.guest.name}</p>
          <p>Check-in: {new Date(booking.checkIn).toLocaleDateString()}</p>
          <p>Check-out: {new Date(booking.checkOut).toLocaleDateString()}</p>
          <p>Status: {booking.status}</p>
          {booking.status !== 'cancelled' && (
            <button 
              onClick={() => handleCancelBooking(booking.id)}
              className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300"
            >
              Cancel Booking
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default BookingList;