import style from '../css/Footer.module.css';

function Footer() {
  return (
    <footer className={`mw fontBodyM ${style.ft}`}>
      <p>&#169;2024 FitWeather. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
