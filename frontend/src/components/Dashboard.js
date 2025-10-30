import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddSubscription from './AddSubscription';

const Dashboard = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/subscriptions', {
          headers: { 'x-auth-token': token },
        });
        setSubscriptions(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };

    fetchSubscriptions();
  }, []);

  const addSubscription = subscription => {
    setSubscriptions([...subscriptions, subscription]);
  };

  const deleteSubscription = async id => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/subscriptions/${id}`, {
        headers: { 'x-auth-token': token },
      });
      setSubscriptions(subscriptions.filter(sub => sub.id !== id));
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container px-4 py-8 mx-auto">
        <h1 className="mb-8 text-3xl font-bold">Subscription Dashboard</h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <AddSubscription onAdd={addSubscription} />
          </div>
          <div>
            <h2 className="mb-4 text-2xl font-bold">Your Subscriptions</h2>
            <div className="space-y-4">
              {subscriptions.map(sub => (
                <div key={sub.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
                  <div>
                    <h3 className="font-bold">{sub.name}</h3>
                    <p className="text-gray-600">${sub.price} / month</p>
                    <p className="text-sm text-gray-500">Renews on: {new Date(sub.renewal_date).toLocaleDateString()}</p>
                  </div>
                  <button
                    onClick={() => deleteSubscription(sub.id)}
                    className="px-3 py-1 text-sm text-white bg-red-500 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
