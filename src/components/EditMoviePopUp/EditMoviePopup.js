import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editMovie } from '../../redux/reducer/movieReducer';
import './EditMoviePopup.css';

const EditMoviePopup = ({ movie, onClose }) => {
  const [title, setTitle] = useState(movie.title);
  const [author, setAuthor] = useState(movie.author);
  const [year, setYear] = useState(movie.year);
  const dispatch = useDispatch();

  const handleSave = () => {
    const updatedMovie = {
      id: movie.id,
      title,
      author,
      year,
      image: movie.image,
    };

    dispatch(editMovie(updatedMovie));
    onClose();
  };

  return (
    <div className="edit-movie-popup">
      <h2 className="edit-movie-title">Düzenle: {movie.title}</h2>
      <div className="edit-movie-inputs">
        <label htmlFor="title" className="edit-movie-label">
          Başlık:
        </label>
        <input
          type="text"
          id="title"
          className="edit-movie-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="author" className="edit-movie-label">
          Yazar:
        </label>
        <input
          type="text"
          id="author"
          className="edit-movie-input"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <label htmlFor="year" className="edit-movie-label">
          Yıl:
        </label>
        <input
          type="text"
          id="year"
          className="edit-movie-input"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </div>
      <div className="edit-movie-buttons">
        <button className="edit-movie-save-button" onClick={handleSave}>
          Kaydet
        </button>
        <button className="edit-movie-cancel-button" onClick={onClose}>
          İptal
        </button>
      </div>
    </div>
  );
};

export default EditMoviePopup;
