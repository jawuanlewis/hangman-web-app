import Level from './Level';
import sports from '@/assets/images/sports.jpeg';
import movies from '@/assets/images/movies.jpeg';
import videoGames from '@/assets/images/video-games.jpeg';
import funPhrases from '@/assets/images/phrases.jpeg';

const Levels = () => {
  return (
    <div id="levels-container">
      <Level image={sports} title="Sports" />
      <Level image={movies} title="Movies" />
      <Level image={videoGames} title="Video Games" />
      <Level image={funPhrases} title="Fun Phrases" />
    </div>
  );
};

export default Levels;
