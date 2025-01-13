import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Level = ({ image, title }) => {
  return (
    <div className="level-container">
      <Link to='/game'>
        <img src={image} className="level-frame item-hover" id={title} />
      </Link>
      <label>{title}</label>
    </div>
  );
};

Level.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string
};

export default Level;
