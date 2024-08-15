import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const ADD_ROOM = gql`
  mutation AddRoom($number: String!, $type: String!, $price: Float!, $capacity: Int!, $amenities: [String!], $available: Boolean!) {
    addRoom(number: $number, type: $type, price: $price, capacity: $capacity, amenities: $amenities, available: $available) {
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

const AddRoomForm: React.FC = () => {
  const [number, setNumber] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [capacity, setCapacity] = useState('');
  const [amenities, setAmenities] = useState('');
  const [available, setAvailable] = useState(true);

  const [addRoom] = useMutation(ADD_ROOM, {
    refetchQueries: ['GetRooms'],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addRoom({
      variables: {
        number,
        type,
        price: parseFloat(price),
        capacity: parseInt(capacity),
        amenities: amenities.split(',').map(a => a.trim()),
        available,
      },
    });
    // Reset form
    setNumber('');
    setType('');
    setPrice('');
    setCapacity('');
    setAmenities('');
    setAvailable(true);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <h3 className="text-xl font-semibold">Add New Room</h3>
      <div>
        <label htmlFor="number" className="block">Room Number:</label>
        <input type="text" id="number" value={number} onChange={(e) => setNumber(e.target.value)} required className="w-full p-2 border rounded dark:bg-gray-700" />
      </div>
      <div>
        <label htmlFor="type" className="block">Type:</label>
        <input type="text" id="type" value={type} onChange={(e) => setType(e.target.value)} required className="w-full p-2 border rounded dark:bg-gray-700" />
      </div>
      <div>
        <label htmlFor="price" className="block">Price per Night:</label>
        <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required className="w-full p-2 border rounded dark:bg-gray-700" />
      </div>
      <div>
        <label htmlFor="capacity" className="block">Capacity:</label>
        <input type="number" id="capacity" value={capacity} onChange={(e) => setCapacity(e.target.value)} required className="w-full p-2 border rounded dark:bg-gray-700" />
      </div>
      <div>
        <label htmlFor="amenities" className="block">Amenities (comma-separated):</label>
        <input type="text" id="amenities" value={amenities} onChange={(e) => setAmenities(e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700" />
      </div>
      <div>
        <label htmlFor="available" className="block">
          <input type="checkbox" id="available" checked={available} onChange={(e) => setAvailable(e.target.checked)} />
          {' '}Available
        </label>
      </div>
      <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-300">Add Room</button>
    </form>
  );
};

export default AddRoomForm;