import React from "react";
import {Link} from "react-router-dom";
import '../NotFoundWindow/NotFoundWindow.css'

function NotFoundWindow() {
    return(
        <section className='not-found-window'>
            <div className='not-found-window__container'>
                <h1 className='not-found-window__error'>404</h1>
                <p className='not-found-window__text'>Страница не найдена</p>
                <Link to='/' className='not-found-window__link'>Назад</Link>
            </div>
        </section>
    );
}
export default NotFoundWindow;
