import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import MainPage from './components/MainPage';
import BookDetails from './components/BookDetails';
import AccountPage from './components/AccountPage'; // Import the new AccountPage component

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/account" element={<AccountPage />} /> {/* Add the new route for AccountPage */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;