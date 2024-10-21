import React, { useState, useRef } from 'react';
import { format } from 'date-fns';
import { usePDF } from 'react-to-pdf';

const ContractGenerator = () => {
  const [step, setStep] = useState(1);
  const [agreementDate] = useState(format(new Date(), 'MMMM d, yyyy'));
  const [clientName, setClientName] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [sowData, setSOWData] = useState({
    role: 'Designer',
    employmentType: 'Full-time',
    skills: '',
    startDate: '',
    rate: '',
    hoursPerWeek: '',
    responsibilities: ''
  });

  const { toPDF, targetRef } = usePDF({ filename: 'contract.pdf' });

  const handleSOWChange = (e) => {
    const { name, value } = e.target;
    setSOWData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const renderServiceAgreementForm = () => (
    <div>
      <h2 className="text-xl font-semibold mb-4">Service Agreement Details</h2>
      <p className="mb-2"><strong>Agreement Date:</strong> {agreementDate}</p>
      <div className="mb-2">
        <label className="block mb-1">Client Name:</label>
        <input
          type="text"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1">Client Address:</label>
        <textarea
          value={clientAddress}
          onChange={(e) => setClientAddress(e.target.value)}
          className="w-full p-2 border rounded"
          rows="3"
        ></textarea>
      </div>
    </div>
  );

  const renderSOWForm = () => (
    <div>
      <h2 className="text-xl font-semibold mb-4">Statement of Work Details</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Role:</label>
          <select
            name="role"
            value={sowData.role}
            onChange={handleSOWChange}
            className="w-full p-2 border rounded"
          >
            <option value="Designer">Designer</option>
            <option value="Developer">Developer</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Employment Type:</label>
          <select
            name="employmentType"
            value={sowData.employmentType}
            onChange={handleSOWChange}
            className="w-full p-2 border rounded"
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Skills:</label>
          <input
            type="text"
            name="skills"
            value={sowData.skills}
            onChange={handleSOWChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={sowData.startDate}
            onChange={handleSOWChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Rate (USD per hour):</label>
          <input
            type="number"
            name="rate"
            value={sowData.rate}
            onChange={handleSOWChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Hours per Week:</label>
          <input
            type="number"
            name="hoursPerWeek"
            value={sowData.hoursPerWeek}
            onChange={handleSOWChange}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
      <div className="mt-4">
        <label className="block mb-1">Responsibilities:</label>
        <textarea
          name="responsibilities"
          value={sowData.responsibilities}
          onChange={handleSOWChange}
          className="w-full p-2 border rounded"
          rows="5"
        ></textarea>
      </div>
    </div>
  );

  
  const renderSOW = () => {
    if (sowData.role === 'Developer' && sowData.employmentType === 'Full-time') {
      return (
        <>
          <h2 className="text-2xl font-bold mt-8 mb-4">STATEMENT OF WORK (SOW) - Full-Time Developer</h2>
          <p>This Statement of Work ("SOW") is entered into on {agreementDate} pursuant to the General Services Agreement dated {agreementDate} between Value at Void LLC ("Service Provider") and {clientName} ("Client").</p>
          
          <h3 className="text-xl font-bold mt-6 mb-2">1. RESOURCE DETAILS</h3>
          <ul className="list-disc list-inside mb-4">
            <li>Role: Full-Time Developer</li>
            <li>Skills: {sowData.skills}</li>
            <li>Commitment: Full-time ({sowData.hoursPerWeek} hours per week)</li>
            <li>Rate: ${sowData.rate} USD per hour</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-2">2. RESPONSIBILITIES</h3>
          <ul className="list-disc list-inside mb-4">
            <li>Develop and maintain web applications using specified technologies</li>
            <li>Implement responsive and accessible user interfaces</li>
            <li>Collaborate with designers to translate designs into functional code</li>
            <li>Optimize application performance and scalability</li>
            <li>Conduct code reviews and implement best practices</li>
            <li>Troubleshoot and debug issues as they arise</li>
            <li>Stay updated with the latest trends and technologies in web development</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-2">3. TIMELINE</h3>
          <ul className="list-disc list-inside mb-4">
            <li>Start Date: {sowData.startDate}</li>
            <li>End Date: Ongoing</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-2">4. DELIVERABLES</h3>
          <p>Deliverables will vary based on the specific tasks and projects assigned. These may include but are not limited to:</p>
          <ul className="list-disc list-inside mb-4">
            <li>Functional web applications and features</li>
            <li>Code documentation</li>
            <li>Technical specifications and architecture documents</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-2">5. COMPENSATION</h3>
          <ul className="list-disc list-inside mb-4">
            <li>Hourly Rate: ${sowData.rate} USD per hour</li>
            <li>Hours per Week: {sowData.hoursPerWeek} hours</li>
            <li>Payment Schedule: Bi-weekly invoicing based on actual hours worked</li>
            <li>Invoicing: Every two weeks, Service Provider will invoice for the actual hours worked during that period</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-2">6. ADDITIONAL TERMS</h3>
          <p>6.1 Hours Commitment: The {sowData.hoursPerWeek} hours per week are a general commitment, but actual billable hours may vary based on the number of working days in each bi-weekly period.</p>
          <p>6.2 Overtime: Any hours worked beyond {sowData.hoursPerWeek} hours/week must be pre-approved by the Client and will be billed at the same hourly rate.</p>
          <p>6.3 Expenses: Any project-related expenses must be pre-approved by the Client and will be billed at cost.</p>
        </>
      );
    } else if (sowData.role === 'Designer' && sowData.employmentType === 'Part-time') {
      return (
        <>
          <h2 className="text-2xl font-bold mt-8 mb-4">STATEMENT OF WORK (SOW) - Part-Time Designer</h2>
          <p>This Statement of Work ("SOW") is entered into on {agreementDate} pursuant to the General Services Agreement dated {agreementDate} between Value at Void LLC ("Service Provider") and {clientName} ("Client").</p>
          
          <h3 className="text-xl font-bold mt-6 mb-2">1. RESOURCE DETAILS</h3>
          <ul className="list-disc list-inside mb-4">
            <li>Role: Part-Time Designer</li>
            <li>Skills: {sowData.skills}</li>
            <li>Commitment: Part-time ({sowData.hoursPerWeek} hours per week)</li>
            <li>Rate: ${sowData.rate} USD per hour</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-2">2. RESPONSIBILITIES</h3>
          <ul className="list-disc list-inside mb-4">
            <li>Create user-centered designs for web and mobile applications</li>
            <li>Develop brand identities and design systems</li>
            <li>Produce high-fidelity mockups and prototypes</li>
            <li>Conduct user research and usability testing</li>
            <li>Collaborate with developers to ensure design feasibility</li>
            <li>Create and maintain design documentation</li>
            <li>Stay current with design trends and best practices in UI/UX</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-2">3. TIMELINE</h3>
          <ul className="list-disc list-inside mb-4">
            <li>Start Date: {sowData.startDate}</li>
            <li>End Date: Ongoing</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-2">4. DELIVERABLES</h3>
          <p>Deliverables will vary based on the specific tasks and projects assigned. These may include but are not limited to:</p>
          <ul className="list-disc list-inside mb-4">
            <li>UI/UX designs and prototypes</li>
            <li>Brand identity assets</li>
            <li>Design systems and style guides</li>
            <li>User research reports</li>
            <li>Design documentation</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-2">5. COMPENSATION</h3>
          <ul className="list-disc list-inside mb-4">
            <li>Hourly Rate: ${sowData.rate} USD per hour</li>
            <li>Hours per Week: {sowData.hoursPerWeek} hours</li>
            <li>Payment Schedule: Bi-weekly invoicing based on actual hours worked</li>
            <li>Invoicing: Every two weeks, Service Provider will invoice for the actual hours worked during that period</li>
          </ul>

          <h3 className="text-xl font-bold mt-6 mb-2">6. ADDITIONAL TERMS</h3>
          <p>6.1 Hours Commitment: The {sowData.hoursPerWeek} hours per week are a general commitment, but actual billable hours may vary based on the number of working days in each bi-weekly period.</p>
          <p>6.2 Overtime: Any hours worked beyond {sowData.hoursPerWeek} hours/week must be pre-approved by the Client and will be billed at the same hourly rate.</p>
          <p>6.3 Expenses: Any project-related expenses must be pre-approved by the Client and will be billed at cost.</p>
        </>
      );
    } else {
      return (
        <p>Please select a valid role and employment type combination.</p>
      );
    }
  };


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Contract Generator</h1>
      
      {step === 1 ? renderServiceAgreementForm() : renderSOWForm()}
      
      <div className="mt-4 flex justify-between">
        {step > 1 && (
          <button
            onClick={() => setStep(step - 1)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Previous
          </button>
        )}
        {step < 2 ? (
          <button
            onClick={() => setStep(step + 1)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Next
          </button>
        ) : (
          <button
            onClick={() => toPDF()}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Generate Contract
          </button>
        )}
      </div>

      {/* PDF Template */}
      <div ref={targetRef} className="p-8 bg-white">
        <h1 className="text-2xl font-bold mb-4">General Services Agreement</h1>
        <p>This General Services Agreement (the "Agreement") is entered into on {agreementDate} by and between:</p>
        <p><strong>Value at Void LLC</strong>, a company organized and existing under the laws of Dubai, United Arab Emirates, with its principal place of business at 904, ART XVIII, Business Bay, Dubai ("Service Provider")</p>
        <p>and</p>
        <p><strong>{clientName}</strong>, a company organized and existing under the laws of [Client's State/Country], with its principal place of business at {clientAddress} ("Client")</p>
        <p>(each a "Party" and collectively the "Parties").</p>

        <h2 className="text-xl font-bold mt-6 mb-2">1. SERVICES</h2>
        <p>1.1 Service Provider agrees to provide Client with design and development services as outlined in one or more Statements of Work ("SOW") to be attached to this Agreement (the "Services").</p>
        <p>1.2 Each SOW shall ideally include:</p>
        <p>a) A description of the Services to be performed</p>
        <p>b) The timeline for completion of the Services (If a fixed time project)</p>
        <p>c) The fees for the Services</p>
        <p>d) Any deliverables to be provided</p>
        <p>e) Any other terms specific to the engagement</p>
        <p>1.3 Each SOW shall be governed by the terms of this Agreement unless explicitly stated otherwise in the SOW.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">2. TERM AND TERMINATION</h2>
        <p>2.1 This Agreement shall commence on {agreementDate} and continue until terminated by either Party with 10 days' written notice.</p>
        <p>2.2 Termination of this Agreement will not affect any SOWs in progress, which shall continue until completed unless otherwise agreed by the Parties.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">3. PAYMENT</h2>
        <p>3.1 Client agrees to pay Service Provider for the Services as specified in each SOW.</p>
        <p>3.2 Invoices will be submitted bi-weekly and are due within 7 days of receipt.</p>
        <p>3.3 Late payments shall bear interest at the rate of 1.5% per month.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">4. INDEPENDENT CONTRACTOR</h2>
        <p>4.1 Service Provider is an independent contractor. Nothing in this Agreement shall be construed as creating an employer-employee relationship.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">5. CONFIDENTIALITY</h2>
        <p>5.1 Each Party agrees to keep confidential all non-public information disclosed by the other Party in connection with this Agreement.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">6. INTELLECTUAL PROPERTY</h2>
        <p>6.1 Any pre-existing intellectual property shall remain the property of its owner.</p>
        <p>6.2 Intellectual property created specifically for Client as part of the Services shall be owned by Client upon full payment.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">7. LIMITATION OF LIABILITY</h2>
        <p>7.1 Neither Party shall be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with this Agreement.</p>
        <p>7.2 Service Provider's total liability under this Agreement shall not exceed the amount paid by Client for the Services.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">8. GOVERNING LAW AND JURISDICTION</h2>
        <p>8.1 This Agreement shall be governed by and construed in accordance with the laws of Dubai, United Arab Emirates.</p>
        <p>8.2 Any disputes arising from this Agreement shall be subject to the exclusive jurisdiction of the courts of Dubai, United Arab Emirates.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">9. ENTIRE AGREEMENT</h2>
        <p>9.1 This Agreement, together with any SOWs, constitutes the entire agreement between the Parties and supersedes all prior agreements and understandings, whether written or oral.</p>

        <h2 className="text-xl font-bold mt-6 mb-2">10. AMENDMENTS</h2>
        <p>10.1 This Agreement may only be amended in writing signed by both Parties.</p>

        <p className="mt-8 mb-4">IN WITNESS WHEREOF, the Parties have executed this Agreement as of the date first above written.</p>

        <div className="flex justify-between">
          <div>
            <p>{clientName}</p>
            <p>By: ________________________</p>
            <p>Name:</p>
            <p>Title:</p>
            <p>Date:</p>
          </div>
          <div>
            <p>Value at Void LLC</p>
            <p>By: ________________________</p>
            <p>Name:</p>
            <p>Title:</p>
            <p>Date:</p>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Statement of Work (SOW)</h2>
        <p><strong>Role:</strong> {sowData.role}</p>
        <p><strong>Employment Type:</strong> {sowData.employmentType}</p>
        <p><strong>Skills:</strong> {sowData.skills}</p>
        <p><strong>Start Date:</strong> {sowData.startDate}</p>
        <p><strong>Rate:</strong> ${sowData.rate} USD per hour</p>
        <p><strong>Hours per Week:</strong> {sowData.hoursPerWeek}</p>
        <p><strong>Responsibilities:</strong></p>
        <p>{sowData.responsibilities}</p>

        {renderSOW()}

        <div className="flex justify-between">
          <div>
            <p>{clientName}</p>
            <p>By: ________________________</p>
            <p>Name:</p>
            <p>Title:</p>
            <p>Date:</p>
          </div>
          <div>
            <p>Value at Void LLC</p>
            <p>By: ________________________</p>
            <p>Name:</p>
            <p>Title:</p>
            <p>Date:</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContractGenerator;