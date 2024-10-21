import React, { useState, useRef } from 'react';
import { format, addDays } from 'date-fns';
import { usePDF } from 'react-to-pdf';

const InvoiceGenerator = () => {
  const [clientName, setClientName] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [items, setItems] = useState([{ service: '', hours: 0, rate: 0 }]);
  const [invoiceNumber, setInvoiceNumber] = useState('A-001');
  const { toPDF, targetRef } = usePDF({filename: 'invoice.pdf'});

  const currentDate = new Date();
  const invoiceDate = format(currentDate, 'MMMM d, yyyy');
  const dueDate = format(addDays(currentDate, 5), 'MMMM d, yyyy');

  const addItem = () => {
    setItems([...items, { service: '', hours: 0, rate: 0 }]);
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.hours * item.rate), 0);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-4">Invoice Generator</h1>
        <div className="mb-4">
          <label className="block mb-2">Invoice Number:</label>
          <input
            type="text"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Client Name:</label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Client Address:</label>
          <textarea
            value={clientAddress}
            onChange={(e) => setClientAddress(e.target.value)}
            className="border p-2 w-full"
            rows="3"
          ></textarea>
        </div>
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
                  <input
                    type="text"
                    value={item.service}
                    onChange={(e) => updateItem(index, 'service', e.target.value)}
                    className="w-full"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    value={item.hours}
                    onChange={(e) => updateItem(index, 'hours', Number(e.target.value))}
                    className="w-full"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    value={item.rate}
                    onChange={(e) => updateItem(index, 'rate', Number(e.target.value))}
                    className="w-full"
                  />
                </td>
                <td className="border p-2">${(item.hours * item.rate).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={addItem} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
          Add Item
        </button>
        <button onClick={() => toPDF()} className="bg-green-500 text-white px-4 py-2 rounded mt-4 ml-4">
          Generate Invoice
        </button>
      </div>

      {/* PDF Template */}
      <div ref={targetRef} className="p-8 bg-white">
        <div className="flex justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">Value at Void LLC</h2>
            <p>Dubai, United Arab Emirates</p>
            <p>India</p>
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
          <p>{clientName}</p>
          <p>{clientAddress}</p>
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