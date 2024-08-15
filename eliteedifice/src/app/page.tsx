'use client'

import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useTheme } from '../components/ThemeProvider';
import RoomList from '../components/RoomList';
import BookingList from '../components/BookingList';
import GuestList from '../components/GuestList';
import AddRoomForm from '../components/AddRoomForm';
import AddGuestForm from '../components/AddGuestForm';
import BookRoomForm from '../components/BookRoomForm';
import AvailableRoomSearch from '../components/AvailableRoomSearch';


const GET_ROOMS = gql`
  query GetRooms {
    rooms {
      id
      number
      type
      price
      capacity
      amenities
      available
    }
  }
`;

const GET_BOOKINGS = gql`
  query GetBookings {
    bookings {
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

const GET_GUESTS = gql`
  query GetGuests {
    guests {
      id
      name
      email
      phone
    }
  }
`;

export default function Home() {
  const { darkMode, toggleDarkMode } = useTheme();
  const { data: roomsData, loading: roomsLoading } = useQuery(GET_ROOMS);
  const { data: bookingsData, loading: bookingsLoading } = useQuery(GET_BOOKINGS);
  const { data: guestsData, loading: guestsLoading } = useQuery(GET_GUESTS);

  const [activeTab, setActiveTab] = useState('rooms');

  return (
    <main className="min-h-screen p-8 transition-colors duration-300 dark:bg-gray-800 dark:text-white">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Hotel Management System</h1>
          <button
            onClick={toggleDarkMode}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
          >
            Toggle {darkMode ? 'Light' : 'Dark'} Mode
          </button>
        </div>
        
        <div className="mb-8">
          <button
            className={`mr-4 px-4 py-2 rounded ${activeTab === 'rooms' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => setActiveTab('rooms')}
          >
            Rooms
          </button>
          <button
            className={`mr-4 px-4 py-2 rounded ${activeTab === 'bookings' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => setActiveTab('bookings')}
          >
            Bookings
          </button>
          <button
            className={`px-4 py-2 rounded ${activeTab === 'guests' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => setActiveTab('guests')}
          >
            Guests
          </button>
        </div>
        {activeTab === 'rooms' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Rooms</h2>
          {roomsLoading ? (
            <p>Loading rooms...</p>
          ) : (
            <>
              <RoomList rooms={roomsData?.rooms || []} />
              <AddRoomForm />
              <AvailableRoomSearch />
            </>
          )}
        </div>
      )}



        {activeTab === 'bookings' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Bookings</h2>
            {bookingsLoading ? (
              <p>Loading bookings...</p>
            ) : (
              <>
                <BookingList bookings={bookingsData?.bookings || []} />
                <BookRoomForm rooms={roomsData?.rooms || []} guests={guestsData?.guests || []} />
              </>
            )}
          </div>
        )}

        {activeTab === 'guests' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Guests</h2>
            {guestsLoading ? (
              <p>Loading guests...</p>
            ) : (
              <>
                <GuestList guests={guestsData?.guests || []} />
                <AddGuestForm />
              </>
            )}
          </div>
        )}
      </div>
    </main>
  )
}