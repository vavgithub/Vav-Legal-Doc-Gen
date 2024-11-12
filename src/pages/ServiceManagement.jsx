// pages/ServiceManagement.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, addDoc, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

const ServiceManagement = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    defaultRate: ''
  });
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, [user]);

  const loadServices = async () => {
    try {
      const q = query(
        collection(db, 'services'),
        where('userId', '==', user.uid)
      );
      const querySnapshot = await getDocs(q);
      const servicesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setServices(servicesData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading services:', error);
      setIsLoading(false);
    }
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'services'), {
        ...newService,
        defaultRate: parseFloat(newService.defaultRate),
        userId: user.uid,
        createdAt: new Date().toISOString()
      });
      setNewService({ name: '', description: '', defaultRate: '' });
      loadServices();
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  const handleDeleteService = async (serviceId) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await deleteDoc(doc(db, 'services', serviceId));
        loadServices();
      } catch (error) {
        console.error('Error deleting service:', error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Service Management</h2>
      
      {/* Add Service Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-4">Add New Service</h3>
        <form onSubmit={handleAddService} className="space-y-4">
          <div>
            <label className="block mb-1">Service Name</label>
            <input
              type="text"
              value={newService.name}
              onChange={(e) => setNewService({...newService, name: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Description</label>
            <textarea
              value={newService.description}
              onChange={(e) => setNewService({...newService, description: e.target.value})}
              className="w-full p-2 border rounded"
              rows="3"
            />
          </div>
          <div>
            <label className="block mb-1">Default Rate (per hour)</label>
            <input
              type="number"
              value={newService.defaultRate}
              onChange={(e) => setNewService({...newService, defaultRate: e.target.value})}
              className="w-full p-2 border rounded"
              required
              min="0"
              step="0.01"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Service
          </button>
        </form>
      </div>

      {/* Services List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Services List</h3>
        {isLoading ? (
          <div>Loading services...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => (
              <div key={service.id} className="border p-4 rounded">
                <h4 className="font-bold">{service.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                <p className="text-sm font-semibold mt-1">
                  Default Rate: ${service.defaultRate}/hr
                </p>
                <button
                  onClick={() => handleDeleteService(service.id)}
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

export default ServiceManagement;