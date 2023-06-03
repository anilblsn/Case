import { configureStore } from '@reduxjs/toolkit';

import movieReducer from '../reducer/movieReducer';

// Redux store oluşturuluyor
const store = configureStore({
  reducer: {
    movies: movieReducer, // movies reducer'ı movies adı altında stora ekleniyor
  },
});

export default store; // Oluşturulan store export ediliyor
