import PropTypes from 'prop-types';

const Header = ({ title, type }) => {
  return (
    <header className={type}>
      <h1>{title}</h1>
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string
};

export default Header;
