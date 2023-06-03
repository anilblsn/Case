import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HomePage from './Pages/HomePage/HomePage';
import Admin from './Pages/AdminPage/Admin';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
