import React, { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMovie } from '../../redux/reducer/movieReducer';
import './Admin.css';

const Admin = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(''); // Film adını tutan state
  const [author, setAuthor] = useState(''); // Yazarı tutan state
  const [year, setYear] = useState(''); // Yılı tutan state
  const [image, setImage] = useState(null); // Resim dosyasını tutan state
  const [showAlert, setShowAlert] = useState(false); // Film eklendiğinde gösterilecek uyarıyı kontrol eden state

  const movies = useSelector((state) => state.movies);
  const totalMovies = movies.length; // Listede kaç adet film olduğunu gösterir


  const handleTitleChange = (e) => {
    setTitle(e.target.value); // Film adı alanındaki değişiklikleri takip eden fonksiyon
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value); // Yazar alanındaki değişiklikleri takip eden fonksiyon
  };

  const handleYearChange = (e) => { 
    setYear(e.target.value); // Yıl alanındaki değişiklikleri takip eden fonksiyon
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file); // Resim dosyası seçildiğinde çalışan fonksiyon ve seçilen resmi state'e atar
  };

  const handleOkClick = () => {
    setShowAlert(false); // Uyarı kutusundaki "Tamam" butonuna tıklandığında uyarıyı kapatır
  };

  const handleSubmit = (e) => {
    if( !title || !year || !author){
      alert('lütfen alanları doldurunuz')
      return;
    }
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('image', image);

    const movie = {
      id: Date.now().toString(),
      title,
      author,
      year,
      image: URL.createObjectURL(image), // Resim dosyasının URL'sini oluşturup movie nesnesine ekler
    };

    dispatch(addMovie(movie)); // Yeni filmi eklemek için redux dispatch işlemi yapar
    setTitle(''); // Film adını temizler
    setAuthor(''); // Yazarı temizler
    setYear(''); // Yılı temizler
    setImage(null); // Resmi temizler
    setShowAlert(true); // Film başarıyla eklendi uyarısını gösterir
  };
  return (
    <div className="admin-container">
      <h1>Admin</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label className="label" htmlFor="title">
              Film Adı:
            </label>
            <input
              className="input"
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div className="input-container">
            <label className="label" htmlFor="author">
              Yazar:
            </label>
            <input
              className="input"
              type="text"
              id="author"
              value={author}
              onChange={handleAuthorChange}
            />
          </div>
          <div className="input-container">
            <label className="label" htmlFor="year">
              Yıl:
            </label>
            <input
              className="input"
              type="text"
              id="year"
              value={year}
              onChange={handleYearChange}
            />
          </div>
          <div className="input-container">
            <label className="label" htmlFor="image">
              Resim:
            </label>
            <input
              className="input"
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <button className="button" type="submit">
            Kaydet
          </button>
        </form>
      </div>

      {showAlert && (
        <div className="alert-container">
          <div className="alert-box">
            Film başarıyla eklendi
            <button className="alert-button" onClick={handleOkClick}>
              Tamam
            </button>
          </div>
        </div>
      )}
            <p>Toplam Film Sayısı: {totalMovies}</p>

    </div>
  );
};

export default Admin;
