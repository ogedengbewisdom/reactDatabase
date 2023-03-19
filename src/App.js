import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  async function fetchDataHandler () {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("https://swapi.dev/api/films")

      if (!response.ok) {
        throw new Error ("Error 404 'Not found'")
      }
      const data = await response.json()
      
        const transformedMovies = data.results.map(movie => {
          return {
            id: movie.episode_id,
            title: movie.title,
            openingText: movie.opening_crawl,
            releaseDate: movie.release_date
          }
      })
      setMovies(transformedMovies)
    }

    catch (error) {
      setError(error.message)
    }
    setIsLoading(false)
    }

    let content = <p>No movies found</p>
    if (movies.length > 0) {
      content = <MoviesList movies={movies} />
    }
    if (error) {
      content = <p>{error}</p>
    }

    if (isLoading) {
      content = <p>Loading</p>
    }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchDataHandler}>Fetch Movies</button>
      </section>
      <section>
        {/* {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>No movies found!</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading...</p>} */}
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
