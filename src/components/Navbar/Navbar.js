import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // CSS dosyasını içe aktarın

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">Anasayfa</Link>
        </li>
        <li className="navbar-item">
          <Link to="/admin" className="navbar-link">Admin</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
