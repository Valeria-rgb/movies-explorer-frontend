import './Techs.css';
import line from "../../images/landing__line.svg";

function Techs() {
    return(
        <section className='techs'>
            <h4 className='techs__header'>Технологии</h4>
            <img className='techs__line' src={line} alt='Декоративная линия'/>
            <h2 className='techs__list-header'>7 технологий</h2>
            <p className='techs__text'>
                На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
            </p>
            <div className='techs__container'>
                <div className='techs__card'>
                    <p className='techs__tech-name'>HTML</p>
                </div>
                <div className='techs__card'>
                    <p className='techs__tech-name'>CSS</p>
                </div>
                <div className='techs__card'>
                    <p className='techs__tech-name'>JS</p>
                </div>
                <div className='techs__card'>
                    <p className='techs__tech-name'>React</p>
                </div>
                <div className='techs__card'>
                    <p className='techs__tech-name'>Git</p>
                </div>
                <div className='techs__card'>
                    <p className='techs__tech-name'>Express.js</p>
                </div>
                <div className='techs__card'>
                    <p className='techs__tech-name'>mongoDB</p>
                </div>
            </div>
        </section>
    );
}

export default Techs;
