import { use, useEffect, useState } from 'react'
import { useDebounce } from 'react-use'
import Search from './components/Search'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard'

import './App.css'

const App = () => {
  const API_URL =`https://api.themoviedb.org/3`
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY 
  const Options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNjRjZmVkZDhiMjVmZmQ5OWYyNTIzMjk2NjVkOTM5NSIsIm5iZiI6MTc1MjcwOTM5OC44ODcsInN1YiI6IjY4NzgzOTE2MzZiMzY3YmZiMzBjMmVjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qbDY8fV92DI-peDtyPH11TTorDp32sqa2S0krlcy_7A`
    }
  }
  const [searchItem, setSearchItem] = useState('')
  const [error, setError] = useState('')
  const [movieList, setMovieList] = useState([])
  const [loading, setLoading] = useState(false)  
  const [debouncedSearchItem, setDebouncedSearchItem] = useState('')
  useDebounce(() => {
    setDebouncedSearchItem(searchItem)
  }, 500, [searchItem])
 
  const fetchMovies = async (query = '') => {
    setLoading(true);
    setError('');

    try {
      const endpoint = query ? `${API_URL}/search/movie?query=${encodeURIComponent(query)}`
        :`${API_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, Options);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      
      if (data.Response === 'False') {
        setError(data.Error || 'An error occurred while fetching movies');
        setMovieList([]);
        return;
        
      }
      setMovieList(data.results || []);

    }catch (error) {
      console.error('Error fetching movies:', error)
      setError('Failed to fetch movies. Please try again later.')
    }
    finally {
      setLoading(false);
    } 
  }
    useEffect(() => {
    fetchMovies(debouncedSearchItem);
  }, [debouncedSearchItem])
  
  return (
    <main>
      <div className='pattern'/>
      <div className='wrapper'>
        <header>
          <img src="./hero-img.png" alt="hero banner" />
          <h1>Find <span className='text-gradient'>Movies</span> you will enjoy without the hassle</h1>
        </header>
        <Search searchItem={searchItem} setSearchItem ={setSearchItem}/>
        <section className='all-movies'>
          <h2 className='mt-[40px]'>All movies</h2>
          {loading ? <Spinner />  : (error) ? (<p className='text-red-500'>{error}</p>) : (<ul className='movies-list'>
            {movieList.map((movie) => (<MovieCard key={movie.id} movie = {movie}/>))}</ul>)}
        </section>
      </div>
    </main>
  )
}
    


export default App
