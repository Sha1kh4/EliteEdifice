import React, { useState } from 'react';

interface Room {
  id: string;
  number: string;
  type: string;
  price: number;
  capacity: number;
  amenities: string[];
  available: boolean;
}

interface RoomListProps {
  rooms: Room[];
}

const RoomList: React.FC<RoomListProps> = ({ rooms }) => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  return (
    <div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <li 
            key={room.id} 
            className="border p-4 rounded-lg dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setSelectedRoom(room)}
          >
            <h3 className="text-lg font-semibold">Room {room.number}</h3>
            <p>Type: {room.type}</p>
            <p>Price: ${room.price}/night</p>
            <p>Status: {room.available ? 'Available' : 'Occupied'}</p>
          </li>
        ))}
      </ul>
      
      {selectedRoom && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" onClick={() => setSelectedRoom(null)}>
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-2">Room {selectedRoom.number} Details</h3>
            <p>Type: {selectedRoom.type}</p>
            <p>Price: ${selectedRoom.price}/night</p>
            <p>Capacity: {selectedRoom.capacity} person(s)</p>
            <p>Amenities: {selectedRoom.amenities.join(', ')}</p>
            <p>Status: {selectedRoom.available ? 'Available' : 'Occupied'}</p>
            <button 
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
              onClick={() => setSelectedRoom(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomList;