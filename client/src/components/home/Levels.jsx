import Level from './Level';
import movies from '@/assets/images/movies.jpeg';
import videoGames from '@/assets/images/video-games.jpeg';
import sports from '@/assets/images/sports.jpeg';
import idioms from '@/assets/images/idioms.jpeg';

const Levels = () => {
  return (
    <div id="levels-container">
      <Level image={movies} title="Movies" />
      <Level image={videoGames} title="Video Games" />
      <Level image={sports} title="Sports" />
      <Level image={idioms} title="Idioms" />
    </div>
  );
};

export default Levels;
