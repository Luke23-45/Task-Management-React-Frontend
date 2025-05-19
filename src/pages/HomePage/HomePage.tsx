
import React from 'react';
import { useSelector } from 'react-redux'; 
import { type RootState } from '@/store/types'; 
import { Link } from 'react-router-dom'; 

function HomePage() {
  
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', padding: '20px' }}>
      <h2>Welcome to the Task Manager!</h2>

      {isAuthenticated ? (
        
        <>
          <p style={{ fontSize: '1.1em', color: '#555' }}>
            You are logged in. Manage your tasks efficiently.
          </p>
          <div style={{ marginTop: '20px' }}>
            <Link to="/tasks" style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '5px',
              fontSize: '1.1em',
              transition: 'background-color 0.3s ease'
            }}>
              View My Tasks
            </Link>
          </div>
        </>
      ) : (
        
        <>
          <p style={{ fontSize: '1.1em', color: '#555' }}>
            Organize your work and life with the task management tool - Luke.
          </p>
          <div style={{ marginTop: '20px' }}>
            <p style={{ fontSize: '1em', color: '#666',marginBottom:"40px" }}>
              Please log in or register to start managing your tasks.
            </p>
            <Link to="/login" style={{
              padding: '10px 20px',
              marginTop:"30px",
              backgroundColor: '#28a745',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '5px',
              fontSize: '1.1em',
              transition: 'background-color 0.3s ease'
            }}>
              Get Started
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default HomePage;