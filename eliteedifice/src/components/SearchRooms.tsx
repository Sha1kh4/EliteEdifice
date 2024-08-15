import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

const SEARCH_ROOMS = gql`
  query SearchRooms($checkIn: String!, $checkOut: String!) {
    availableRooms(checkIn: $checkIn, checkOut: $checkOut) {
      id
      number
      type
      price
      capacity
      amenities
    }
  }
`;

const SearchRooms: React.FC = () => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [searched, setSearched] = useState(false);

  const { data, loading, error, refetch } = useQuery(SEARCH_ROOMS, {
    variables: { checkIn, checkOut },
    skip: !searched,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    refetch();
  };

  return (
    <div className="mb-8">
      <form onSubmit={handleSearch} className="flex space-x-4 mb-4">
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          required
        />
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          required
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Search
        </button>
      </form>

      {searched && (
        <div>
          {loading && <p>Searching for available rooms...</p>}
          {error && <p className="text-red-500">Error: {error.message}</p>}
          {data && (
            <div>
              <h3 className="text-xl font-semibold mb-2">Available Rooms:</h3>
              <ul className="space-y-2">
                {data.availableRooms.map((room: any) => (
                  <li key={room.id} className="border p-2 rounded dark:border-gray-700">
                    Room {room.number} - {room.type} - ${room.price}/night
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchRooms;