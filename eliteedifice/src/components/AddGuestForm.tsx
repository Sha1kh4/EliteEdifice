import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const ADD_GUEST = gql`
  mutation AddGuest($name: String!, $email: String!, $phone: String) {
    addGuest(name: $name, email: $email, phone: $phone) {
      id
      name
      email
      phone
    }
  }
`;

const AddGuestForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [addGuest] = useMutation(ADD_GUEST, {
    refetchQueries: ['GetGuests'],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addGuest({ variables: { name, email, phone } });
    // Reset form
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <h3 className="text-xl font-semibold">Add New Guest</h3>
      <div>
        <label htmlFor="name" className="block">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-2 border rounded dark:bg-gray-700" />
      </div>
      <div>
        <label htmlFor="email" className="block">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-2 border rounded dark:bg-gray-700" />
      </div>
      <div>
        <label htmlFor="phone" className="block">Phone:</label>
        <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700" />
      </div>
      <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-300">Add Guest</button>
    </form>
  );
};

export default AddGuestForm;