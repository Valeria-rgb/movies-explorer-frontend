import './Portfolio.css';
import line from "../../images/landing__line.svg";

function Portfolio() {
    return(
        <section className='portfolio'>
            <h5 className='portfolio__header'>Портфолио</h5>
            <div className='portfolio__item'>
                <h4 className='portfolio__item-name'>Статичный сайт</h4>
                <img className='portfolio__item-link'/>
            </div>
            <img className='portfolio__line' src={line} alt='Декоративная линия'/>
            <div className='portfolio__item'>
                <h4 className='portfolio__item-name'>Адаптивный сайт</h4>
                <img className='portfolio__item-link'/>
            </div>
            <img className='portfolio__line' src={line} alt='Декоративная линия'/>
            <div className='portfolio__item'>
                <h4 className='portfolio__item-name'>Одностраничное приложение</h4>
                <img className='portfolio__item-link'/>
            </div>
        </section>
    );
}
export default Portfolio;
