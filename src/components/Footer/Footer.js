import { Link } from 'react-router-dom';
import './Footer.css'
import line from "../../images/portfolio__line.svg";

function Footer() {
    const currentYear = new Date().getFullYear();
    return(
        <footer className='footer'>
            <p className='footer__text'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <img className='footer__line' src={line} alt='Декоративная линия'/>
            <div className='footer__container'>
                <div className='footer__links'>
                    <Link className='footer__link'>Яндекс.Практикум</Link>
                    <Link className='footer__link'>Github</Link>
                    <Link className='footer__link'>Facebook</Link>
                </div>
                <p className="footer__copyright">&copy;{currentYear}</p>
            </div>
        </footer>
    );
}
export default Footer
