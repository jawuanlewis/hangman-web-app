import Level from './Level';
import movies from '@/assets/images/movies.jpeg';
import videoGames from '@/assets/images/video-games.jpeg';
import sports from '@/assets/images/sports.jpeg';
import idioms from '@/assets/images/idioms.jpeg';
import tvShows from '@/assets/images/tv-shows.jpeg';
import food from '@/assets/images/food.jpeg';
import animals from '@/assets/images/animals.jpeg';
import cities from '@/assets/images/cities.jpeg';

const Levels = () => {
  return (
    <div id="levels-container">
      <Level image={movies} title="Movies" />
      <Level image={videoGames} title="Video Games" />
      <Level image={sports} title="Sports" />
      <Level image={idioms} title="Idioms" />
      <Level image={tvShows} title="TV Shows" />
      <Level image={food} title="Food" />
      <Level image={animals} title="Animals" />
      <Level image={cities} title="Cities" />
    </div>
  );
};

export default Levels;
