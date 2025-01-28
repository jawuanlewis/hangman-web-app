import { Link } from 'react-router-dom';
import { sessionService } from '@/services/sessionService';

const NavBar = () => {
  const handleReset = async () => {
    try {
      await sessionService.resetSession();
    } catch (error) {
      console.error('Error resetting game session:', error);
    }
  };

  return (
    <nav><ul>
      <li><Link 
        to="/"
        onClick={handleReset}
      >
        Home
      </Link></li>
    </ul></nav>
  );
};

export default NavBar;
