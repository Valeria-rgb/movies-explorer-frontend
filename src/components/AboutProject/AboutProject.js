import './AboutProject.css';
import line from "../../images/about-project__line.svg";

function AboutProject() {
    return(
        <section className='about-project'>
            <h4 className='about-project__heading'>О проекте</h4>
            <img className='about-project__line' src={line} alt='Декоративная линия'/>
            <div className='about-project__container'>
            <h4 className='about-project__heading about-project__heading_stages'>
                Дипломный проект включал 5 этапов</h4>
            <p className='about-project__text about-project__text_stages'>
                Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
            </p>
            <h4 className='about-project__heading about-project__heading_weeks'>
                На выполнение диплома ушло 5 недель</h4>
            <p className='about-project__text about-project__text_weeks'>
                У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
            </p>
            </div>
            <div className='about-project__infographics'>
                <div className='about-project__one-week'>
                    <p className='about-project__weeks-text'>1 неделя</p>
                </div>
                <div className='about-project__four-weeks'>
                    <p className='about-project__weeks-text about-project__weeks-text_four'>4 недели</p>
                </div>
                 <p className='about-project__backend'>Back-end</p>
                 <p className='about-project__frontend'>Front-end</p>
            </div>
        </section>
    );
}
export default AboutProject;
