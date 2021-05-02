import './Portfolio.css';
import line from "../../images/portfolio__line.svg";
import link from "../../images/portfolio__icon.svg";


function Portfolio() {
    return(
        <section className='portfolio'>
            <h5 className='portfolio__header'>Портфолио</h5>
            <div className='portfolio__item'>
                <h4 className='portfolio__item-name'>Статичный сайт</h4>
                <a href='https://github.com/Valeria-rgb/russian-travel' target='_blank'>
                    <img className='portfolio__item-link' src={link} alt='Декоративная стрелка'/>
                </a>
            </div>
                <img className='portfolio__line' src={line} alt='Декоративная линия'/>
            <div className='portfolio__item'>
                <h4 className='portfolio__item-name'>Адаптивный сайт</h4>
                <a href='https://github.com/Valeria-rgb/russian-travel' target='_blank'>
                    <img className='portfolio__item-link' src={link} alt='Декоративная стрелка'/>
                </a>
            </div>
            <img className='portfolio__line' src={line} alt='Декоративная линия'/>
            <div className='portfolio__item'>
                 <h4 className='portfolio__item-name'>Одностраничное приложение</h4>
                <a href='https://valeria-rgb.students.nomoredomains.icu' target='_blank'>
                    <img className='portfolio__item-link' src={link} alt='Декоративная стрелка'/>
                </a>
             </div>
        </section>
    );
}
export default Portfolio;
