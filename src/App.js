import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import AddMovie from './components/AddMovie';

function App() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchDataHandler = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("https://reactdatabasehttp-default-rtdb.firebaseio.com/movies.json")
      console.log(response)

      if (!response.ok) {
        throw new Error ("Error 404 'Not found'")
      }
      const data = await response.json()
        const transformedMovies = []

        for (const key in data) {
          transformedMovies.unshift({
            id: key,
            title: data[key].title,
            releaseDate: data[key].releaseDate,
            openingText: data[key].openingText
          })
        }
      setMovies(transformedMovies)
    }

    catch (error) {
      setError(error.message)
    }
    setIsLoading(false)
    }, [])

    useEffect(() => {
      fetchDataHandler()
    }, [fetchDataHandler])

    async function addMovieHandler (movies) {
      const response = await fetch("https://reactdatabasehttp-default-rtdb.firebaseio.com/movies.json", {
        method: "POST",
        body: JSON.stringify(movies),
        headers: {
          "Content-Type": 'application/json'
        }
      })
      const data = await response.json()
      fetchDataHandler()
      console.log(data)
    }

    async function removeMovieHandler (id) {
      const response = await fetch (`https://reactdatabasehttp-default-rtdb.firebaseio.com/movies/${id}.json`, {
        method: "DELETE"
      })
      const data = await response.json()
      fetchDataHandler()
      console.log(data)
    }

    let content = <p>No movies found</p>
    if (movies.length > 0) {
      content = <MoviesList movies={movies} onRemoveMovie={removeMovieHandler} />
    }
    if (error) {
      content = <p>{error}</p>
    }

    if (isLoading) {
      content = <p>Loading...</p>
    }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie= {addMovieHandler}/>
      </section>
      <section>
        <button onClick={fetchDataHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
