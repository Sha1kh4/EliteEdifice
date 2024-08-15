import React from 'react';

interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface GuestListProps {
  guests: Guest[];
}

const GuestList: React.FC<GuestListProps> = ({ guests }) => {
  return (
    <ul className="space-y-4">
      {guests.map((guest) => (
        <li key={guest.id} className="border p-4 rounded-lg dark:border-gray-700">
          <h3 className="text-lg font-semibold">{guest.name}</h3>
          <p>Email: {guest.email}</p>
          <p>Phone: {guest.phone}</p>
        </li>
      ))}
    </ul>
  );
};

export default GuestList;