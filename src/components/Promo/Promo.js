import './Promo.css';
import icon from '../../images/promo__icon.svg'

function Promo() {
    return(
        <section className='promo'>
            <h1 className='promo__heading'>Учебный проект студента факультета Веб-разработки.</h1>
            <img className='promo__icon' src={icon} alt='Декоративный элемент'/>
        </section>
    );
}
export default Promo;
