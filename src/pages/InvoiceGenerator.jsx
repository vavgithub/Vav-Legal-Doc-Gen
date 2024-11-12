// InvoiceGenerator.jsx
import React, { useState, useRef, useEffect } from 'react';
import { format, addDays } from 'date-fns';
import { usePDF } from 'react-to-pdf';
import { db } from '../config/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

const InvoiceGenerator = () => {
  const { user } = useAuth();
  const [clients, setClients] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [items, setItems] = useState([{ serviceId: '', hours: 0, rate: 0, service: '' }]);
  const [invoiceNumber, setInvoiceNumber] = useState('A-001');
  const { toPDF, targetRef } = usePDF({filename: 'invoice.pdf'});

  const currentDate = new Date();
  const invoiceDate = format(currentDate, 'MMMM d, yyyy');
  const dueDate = format(addDays(currentDate, 5), 'MMMM d, yyyy');

  // Load clients and services on component mount
  useEffect(() => {
    const loadClientsAndServices = async () => {
      try {
        // Load clients
        const clientsQuery = query(
          collection(db, 'clients'),
          where('userId', '==', user.uid)
        );
        const clientsSnapshot = await getDocs(clientsQuery);
        const clientsData = clientsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setClients(clientsData);

        // Load services
        const servicesQuery = query(
          collection(db, 'services'),
          where('userId', '==', user.uid)
        );
        const servicesSnapshot = await getDocs(servicesQuery);
        const servicesData = servicesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setServices(servicesData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadClientsAndServices();
  }, [user]);

  const handleClientSelect = (clientId) => {
    setSelectedClient(clientId);
  };

  const addItem = () => {
    setItems([...items, { serviceId: '', hours: 0, rate: 0, service: '' }]);
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    if (field === 'serviceId') {
      const selectedService = services.find(s => s.id === value);
      newItems[index] = {
        ...newItems[index],
        serviceId: value,
        service: selectedService.name,
        rate: selectedService.defaultRate
      };
    } else {
      newItems[index][field] = value;
    }
    setItems(newItems);
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.hours * item.rate), 0);
  };

  const selectedClientData = clients.find(c => c.id === selectedClient);

  return (
    <div className="container grid grid-cols-2 gap-4 mx-auto p-4">
      <div className="mb-4 text-left">
        <h1 className="text-2xl font-bold mb-4">Invoice Generator</h1>
        
        {/* Invoice Details */}
        <div className="mb-4">
          <label className="block mb-2">Invoice Number:</label>
          <input
            type="text"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
            className="border p-2 w-full rounded"
          />
        </div>

        {/* Client Selection */}
        <div className="mb-4">
          <label className="block mb-2">Select Client:</label>
          <select
            value={selectedClient}
            onChange={(e) => handleClientSelect(e.target.value)}
            className="border p-2 w-full rounded"
          >
            <option value="">Select a client...</option>
            {clients.map(client => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>

        {/* Services Table */}
        <table className="w-full mb-4">
          <thead>
            <tr>
              <th className="border p-2">Service</th>
              <th className="border p-2">Hours</th>
              <th className="border p-2">Rate</th>
              <th className="border p-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td className="border p-2">
                  <select
                    value={item.serviceId}
                    onChange={(e) => updateItem(index, 'serviceId', e.target.value)}
                    className="w-full rounded"
                  >
                    <option value="">Select a service...</option>
                    {services.map(service => (
                      <option key={service.id} value={service.id}>
                        {service.name} (${service.defaultRate}/hr)
                      </option>
                    ))}
                  </select>
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    value={item.hours}
                    onChange={(e) => updateItem(index, 'hours', Number(e.target.value))}
                    className="w-full rounded"
                    min="0"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    value={item.rate}
                    onChange={(e) => updateItem(index, 'rate', Number(e.target.value))}
                    className="w-full rounded"
                    min="0"
                  />
                </td>
                <td className="border p-2">${(item.hours * item.rate).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex gap-4">
          <button onClick={addItem} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add Item
          </button>
          <button onClick={() => toPDF()} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Generate Invoice
          </button>
        </div>
      </div>

      {/* PDF Template */}
      <div ref={targetRef} className="p-8 border bg-white">
        <div className="flex justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">Value at Void LLC</h2>
            <p>Dubai, United Arab Emirates</p>
            <p>Contact Information</p>
            <p>Mobile: +971 567 010 999</p>
            <p>www.atvoid.com</p>
          </div>
          <div className="text-right">
            <h1 className="text-4xl font-bold mb-2">INVOICE</h1>
            <p>Invoice Number: {invoiceNumber}</p>
            <p>Invoice Date: {invoiceDate}</p>
            <p>Payment Due: {dueDate}</p>
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="font-bold mb-2">BILL TO</h3>
          {selectedClientData && (
            <>
              <p>{selectedClientData.name}</p>
              <p>{selectedClientData.address}</p>
              <p>{selectedClientData.email}</p>
              <p>{selectedClientData.phone}</p>
            </>
          )}
        </div>

        <table className="w-full mb-8">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">ITEMS</th>
              <th className="p-2 text-right">HOURS</th>
              <th className="p-2 text-right">RATE</th>
              <th className="p-2 text-right">AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td className="p-2">{item.service}</td>
                <td className="p-2 text-right">{item.hours}</td>
                <td className="p-2 text-right">${item.rate.toFixed(2)}</td>
                <td className="p-2 text-right">${(item.hours * item.rate).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-right">
          <p className="mb-2"><strong>Total:</strong> ${calculateTotal().toFixed(2)}</p>
          <p className="text-xl font-bold">Amount Due (USD): ${calculateTotal().toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceGenerator;