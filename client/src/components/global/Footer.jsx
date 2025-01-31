import linkedinLogo from '@/assets/icons/icons8-linkedin.svg';
import githubLogo from '@/assets/icons/icons8-github.svg';
import instagramLogo from '@/assets/icons/icons8-instagram.svg';
import facebookLogo from '@/assets/icons/icons8-facebook.svg';

const Footer = () => {
  return (
    <footer>
      <ul>
        <li>
          <a target="_blank" href="https://www.linkedin.com/in/jawuan-lewis">
            <img src={linkedinLogo} className="item-hover" />
          </a>
        </li>
        <li>
          <a target="_blank" href="https://github.com/jawuanlewis">
            <img src={githubLogo} className="item-hover" />
          </a>
        </li>
        <li>
          <a target="_blank" href="https://www.instagram.com">
            <img src={instagramLogo} className="item-hover" />
          </a>
        </li>
        <li>
          <a target="_blank" href="https://www.facebook.com">
            <img src={facebookLogo} className="item-hover" />
          </a>
        </li>
      </ul>
      <div className="icon-desc">
        Icons by{' '}
        <a target="_blank" href="https://icons8.com">
          Icons8
        </a>
      </div>
    </footer>
  );
};

export default Footer;
