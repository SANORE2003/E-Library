import React from 'react'
import { Link } from 'react-router-dom'
import backgroundImage from '../assets/Lib_bg.png'

const Home = () => {
  return (
    <div style={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative'
    }}>
      {/* Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust opacity as needed
      }} />
      
      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        textAlign: 'center'
      }}>
        <h1 style={{ 
          marginBottom: '20px', 
          color: '#ffffff',  // Changed to white for better visibility
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' // Added shadow for better readability
        }}>
          Welcome to Sanore's E-Library
        </h1>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link
            to="/login"
            style={{
              padding: '12px 24px',
              background: '#1877f2',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              transition: 'transform 0.2s, background 0.2s',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              hover: {
                transform: 'translateY(-2px)',
                background: '#166fe5'
              }
            }}
          >
            Login
          </Link>
          <Link
            to="/register"
            style={{
              padding: '12px 24px',
              background: '#42b72a',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              transition: 'transform 0.2s, background 0.2s',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              hover: {
                transform: 'translateY(-2px)',
                background: '#36a420'
              }
            }}
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home