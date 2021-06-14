import './AboutMe.css';
import line from "../../images/landing__line.svg";
import photo from "../../images/about-me__photo.jpeg";

function AboutMe() {
    return(
        <section className='about-me'>
            <h4 className='about-me__header'>Студент</h4>
            <img className='about-me__line' src={line} alt='Декоративная линия'/>
            <div className='about-me__info'>
                <img className='about-me__photo' src={photo} alt='Фото'/>
                <h2 className='about-me__name'>Валерия</h2>
                <p className='about-me__job'>Фронтенд-разработчик, 28 лет</p>
                <p className='about-me__description'>
                     Я родилась в Барнауле, но сейчас живу на два крутых города: Санкт-Петербург и Сочи. Недавно закончила курс по веб-разработке в "Яндекс.Практикум", и теперь продолжаю учиться самостоятельно. Я позитивный и легкий в общении человек. В сфере моих будничных интересов: тренажерный зал, бег, йога, сноуборд. Также очень люблю туристические походы по Горному Алтаю и Кавказу.
                </p>
                <div className='about-me__links'>
                    <a className='about-me__link' href='https://github.com/Valeria-rgb' rel='noreferrer' target='_blank'>Github</a>
                </div>
            </div>
        </section>
    );
}
export default AboutMe;
