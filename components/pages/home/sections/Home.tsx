'use client'
import { FC } from 'react';
import scss from './Home.module.scss';

export const Home: FC = () => {
    return (
        <section className={scss.Home}>
            <div className='container'>
                <div className={scss.content}>Home</div>
            </div>
        </section>
    );
};
