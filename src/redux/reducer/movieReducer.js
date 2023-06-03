import { createSlice } from '@reduxjs/toolkit';

// createSlice fonksiyonu ile bir movieSlice oluşturuluyor
const movieSlice = createSlice({
  name: 'movies',
  initialState: [], // Başlangıç durumu boş bir dizi olarak tanımlanıyor
  reducers: {
    addMovie: (state, action) => {
      const movie = action.payload; // action'ın payload kısmı, eklenen filmin bilgilerini içerir
      state.push(movie); // state'in sonuna yeni filmi ekler
    },
    editMovie: (state, action) => {
      const updatedMovie = action.payload; // action'ın payload kısmı, güncellenen filmin bilgilerini içerir
      const index = state.findIndex((movie) => movie.id === updatedMovie.id); // Güncellenen filmin index değeri bulunur
      if (index !== -1) {
        // Eğer index bulunmuşsa
        state[index] = updatedMovie; // Güncellenen filmin bilgileri ile state güncellenir
      }
    },
    deleteMovie: (state, action) => {
      const id = action.payload; // action'ın payload kısmı, silinecek filmin id'sini içerir
      return state.filter((movie) => movie.id !== id); // id'si verilen filmi state'den filtreleyerek çıkarır
    },
  },
});

export const { addMovie, editMovie, deleteMovie } = movieSlice.actions; // action'lar export edilir
export default movieSlice.reducer; // reducer export edilir
