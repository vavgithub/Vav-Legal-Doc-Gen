import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import InvoiceGenerator from './InvoiceGenerator'
import ContractGenerator from './ContractGenerator';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="container mx-auto p-4 flex justify-around">
            <div className='h-[120px] w-[120px] border flex items-center justify-center'>
              <Link to="/invoice" className="text-blue-500 hover:text-blue-700">Invoice Generator</Link>
            </div>

            <div className='h-[120px] w-[120px] border flex items-center justify-center'>
              <Link to="/contract" className="text-blue-500 hover:text-blue-700">Contract Generator</Link>
            </div>
          </div>
        } />
        <Route path="/invoice" element={<InvoiceGenerator />} />
        <Route path="/contract" element={<ContractGenerator />} />
      </Routes>

    </Router>
  );
}

export default App;