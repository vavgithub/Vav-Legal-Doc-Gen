// App.jsx
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import InvoiceGenerator from './pages/InvoiceGenerator';
import ContractGenerator from './pages/ContractGenerator';
import ClientManagement from './pages/ClientManagement';
import ServiceManagement from './pages/ServiceManagement';
import Login from './pages/Login';
import ProtectedRoute from './config/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import DashboardLayout from './components/DashboardLayout';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className='h-[120px] border rounded-lg flex items-center justify-center hover:bg-gray-50'>
                      <Link to="/invoice" className="text-blue-500 hover:text-blue-700">
                        Invoice Generator
                      </Link>
                    </div>
                    <div className='h-[120px] border rounded-lg flex items-center justify-center hover:bg-gray-50'>
                      <Link to="/contract" className="text-blue-500 hover:text-blue-700">
                        Contract Generator
                      </Link>
                    </div>
                    <div className='h-[120px] border rounded-lg flex items-center justify-center hover:bg-gray-50'>
                      <Link to="/clients" className="text-blue-500 hover:text-blue-700">
                        Client Management
                      </Link>
                    </div>
                    <div className='h-[120px] border rounded-lg flex items-center justify-center hover:bg-gray-50'>
                      <Link to="/services" className="text-blue-500 hover:text-blue-700">
                        Service Management
                      </Link>
                    </div>
                  </div>
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/invoice"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <InvoiceGenerator />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/contract"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <ContractGenerator />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/clients"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <ClientManagement />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/services"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <ServiceManagement />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;