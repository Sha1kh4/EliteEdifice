import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_AVAILABLE_ROOMS = gql`
  query GetAvailableRooms($checkIn: String!, $checkOut: String!) {
    availableRooms(checkIn: $checkIn, checkOut: $checkOut) {
      id
      number
      type
      price
    }
  }
`;

const AvailableRoomSearch: React.FC = () => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);

  const { loading, error, data, refetch } = useQuery(GET_AVAILABLE_ROOMS, {
    variables: { checkIn, checkOut },
    skip: !searchPerformed,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchPerformed(true);
    refetch();
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Search Available Rooms</h3>
      <form onSubmit={handleSearch} className="space-y-4">
        <div>
          <label htmlFor="searchCheckIn" className="block">Check-in Date:</label>
          <input 
            type="date" 
            id="searchCheckIn" 
            value={checkIn} 
            onChange={(e) => setCheckIn(e.target.value)} 
            required 
            className="w-full p-2 border rounded dark:bg-gray-700"
          />
        </div>
        <div>
          <label htmlFor="searchCheckOut" className="block">Check-out Date:</label>
          <input 
            type="date" 
            id="searchCheckOut" 
            value={checkOut} 
            onChange={(e) => setCheckOut(e.target.value)} 
            required 
            className="w-full p-2 border rounded dark:bg-gray-700"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300">
          Search
        </button>
      </form>

      {searchPerformed && (
        <div className="mt-4">
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">Error: {error.message}</p>}
          {data && (
            <ul className="space-y-2">
              {data.availableRooms.map((room: any) => (
                <li key={room.id} className="border p-2 rounded">
                  Room {room.number} - {room.type} - ${room.price}/night
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default AvailableRoomSearch;