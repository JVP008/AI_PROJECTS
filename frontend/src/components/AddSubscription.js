import React, { useState } from 'react';
import axios from 'axios';

const AddSubscription = ({ onAdd }) => {
  const [formData, setFormData] = useState({ name: '', price: '', renewal_date: '' });

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/subscriptions', formData, {
        headers: { 'x-auth-token': token },
      });
      onAdd(res.data);
      setFormData({ name: '', price: '', renewal_date: '' });
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold">Add New Subscription</h2>
      <form className="space-y-6" onSubmit={onSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onChange}
            required
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={onChange}
            required
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Renewal Date</label>
          <input
            type="date"
            name="renewal_date"
            value={formData.renewal_date}
            onChange={onChange}
            required
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Subscription
        </button>
      </form>
    </div>
  );
};

export default AddSubscription;
