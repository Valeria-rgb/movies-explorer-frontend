import { useLocation } from 'react-router-dom';
import './Footer.css'
import line from "../../images/portfolio__line.svg";

function Footer() {
    const currentYear = new Date().getFullYear();
    const location = useLocation();
    const currentPath = location.pathname;

    return(
        <footer className={currentPath === '/profile' ? 'footer_invisible' : 'footer'}>
            <p className='footer__text'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <img className='footer__line' src={line} alt='Декоративная линия'/>
            <div className='footer__container'>
                <div className='footer__links'>
                    <a className='footer__link' href='https://praktikum.yandex.ru' rel='noreferrer' target='_blank'>Яндекс.Практикум</a>
                    <a className='footer__link' href='https://github.com' rel='noreferrer' target='_blank'>Github</a>
                    <a className='footer__link' href='https://www.facebook.com' rel='noreferrer' target='_blank'>Facebook</a>
                </div>
                <p className="footer__copyright">&copy;{currentYear}</p>
            </div>
        </footer>
    );
}
export default Footer
