// pages/ClientManagement.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, addDoc, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

const ClientManagement = () => {
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({
    name: '',
    address: '',
    email: '',
    phone: ''
  });
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadClients();
  }, [user]);

  const loadClients = async () => {
    try {
      const q = query(
        collection(db, 'clients'),
        where('userId', '==', user.uid)
      );
      const querySnapshot = await getDocs(q);
      const clientsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setClients(clientsData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading clients:', error);
      setIsLoading(false);
    }
  };

  const handleAddClient = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'clients'), {
        ...newClient,
        userId: user.uid,
        createdAt: new Date().toISOString()
      });
      setNewClient({ name: '', address: '', email: '', phone: '' });
      loadClients();
    } catch (error) {
      console.error('Error adding client:', error);
    }
  };

  const handleDeleteClient = async (clientId) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        await deleteDoc(doc(db, 'clients', clientId));
        loadClients();
      } catch (error) {
        console.error('Error deleting client:', error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Client Management</h2>
      
      {/* Add Client Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-4">Add New Client</h3>
        <form onSubmit={handleAddClient} className="space-y-4">
          <div>
            <label className="block mb-1">Client Name</label>
            <input
              type="text"
              value={newClient.name}
              onChange={(e) => setNewClient({...newClient, name: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Address</label>
            <textarea
              value={newClient.address}
              onChange={(e) => setNewClient({...newClient, address: e.target.value})}
              className="w-full p-2 border rounded"
              rows="3"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              value={newClient.email}
              onChange={(e) => setNewClient({...newClient, email: e.target.value})}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Phone</label>
            <input
              type="tel"
              value={newClient.phone}
              onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Client
          </button>
        </form>
      </div>

      {/* Clients List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Clients List</h3>
        {isLoading ? (
          <div>Loading clients...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {clients.map((client) => (
              <div key={client.id} className="border p-4 rounded">
                <h4 className="font-bold">{client.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{client.address}</p>
                <p className="text-sm text-gray-600">{client.email}</p>
                <p className="text-sm text-gray-600">{client.phone}</p>
                <button
                  onClick={() => handleDeleteClient(client.id)}
                  className="mt-2 text-red-500 hover:text-red-700 text-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientManagement;