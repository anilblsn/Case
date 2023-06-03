import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteMovie } from '../../redux/reducer/movieReducer';
import EditMoviePopup from '../../components/EditMoviePopUp/EditMoviePopup';
import './HomePage.css';

const HomePage = () => {
  const movies = useSelector((state) => state.movies);
  const dispatch = useDispatch();
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleDelete = (id) => {
    dispatch(deleteMovie(id));
  };

  const handleEdit = (movie) => {
    setSelectedMovie(movie);
  };

  const handleEditPopupClose = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="home-container">
      <div className="home-title">Film Listesi</div>
      {movies.length === 0 ? (
        <div className="no-movies-container">
          <p className="no-movies-message">Listelenecek film bulunmamaktadır. Lütfen film ekleyiniz.</p>
          <Link to="/admin">
            <button className="add-button">Film Ekle</button>
          </Link>
        </div>
      ) : (
        <div className="movie-list">
          {movies.map((movie) => (
            <div className="movie-item" key={movie.id}>
              <div className="movie-image-container">
                <img src={movie.image} alt={movie.title} className="movie-image" />
              </div>
              <div className="movie-details">
                <h3 className="movie-title">Adı: {movie.title}</h3>
                <p className="movie-author">Yönetmen: {movie.author}</p>
                <p className="movie-year">Yıl: {movie.year}</p>
                <div className="movie-actions">
                  <button className="edit-button" onClick={() => handleEdit(movie)}>
                    Düzenle
                  </button>
                  <button className="delete-button" onClick={() => handleDelete(movie.id)}>
                    Sil
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedMovie && (
        <EditMoviePopup movie={selectedMovie} onClose={handleEditPopupClose} />
      )}
    </div>
  );
};

export default HomePage;
