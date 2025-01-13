import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav><ul>
      <li><Link to="/" className="nav-option">Home</Link></li>
    </ul></nav>
  );
};

export default NavBar;
