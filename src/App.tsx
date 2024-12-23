import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navigation from './components/Navigation';
import { PrivateRoute } from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import MobileQuantumDashboard from './pages/MobileQuantumDashboard';
import BlogDashboard from './pages/BlogDashboard';
import Login from './pages/Login';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white" dir="rtl">
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
            direction: 'rtl'
          }
        }}
      />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <div className="flex flex-col lg:flex-row">
            <Navigation />
            <main className="flex-1 p-4 lg:pr-72">
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            </main>
          </div>
        } />
        <Route path="/dashboard" element={
          <div className="flex flex-col lg:flex-row">
            <Navigation />
            <main className="flex-1 p-4 lg:pr-72">
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            </main>
          </div>
        } />
        <Route path="/mobile-dashboard" element={
          <div className="flex flex-col lg:flex-row">
            <Navigation />
            <main className="flex-1 p-4 lg:pr-72">
              <PrivateRoute>
                <MobileQuantumDashboard />
              </PrivateRoute>
            </main>
          </div>
        } />
        <Route path="/blog-dashboard" element={
          <div className="flex flex-col lg:flex-row">
            <Navigation />
            <main className="flex-1">
              <PrivateRoute>
                <BlogDashboard />
              </PrivateRoute>
            </main>
          </div>
        } />
      </Routes>
    </div>
  );
}

export default App;