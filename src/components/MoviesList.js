import React from 'react';

import Movie from './Movie';
import classes from './MoviesList.module.css';

const MovieList = (props) => {

  const deletehandler = (id) => {
    props.onRemoveMovie(id)
  }
  const editMovieHandler = (movie) => {
    props.onEditMovie(movie)
  }
  return (
    <ul className={classes['movies-list']}>
      {props.movies.map((movie) => (
        <Movie
          key={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
          onDelete={deletehandler.bind(null, movie.id)}
          onEdit={editMovieHandler.bind(null, movie)}
        />
      ))}
    </ul>
  );
};

export default MovieList;
