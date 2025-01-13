import PropTypes from 'prop-types';

const Level = ({ image, title }) => {
  return (
    <div className="level-container">
      <img src={image} className="level-frame item-hover" id={title} />
      <label>{title}</label>
    </div>
  );
};

Level.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string
};

export default Level;
