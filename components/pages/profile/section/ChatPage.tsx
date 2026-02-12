'use client'
import { FC } from 'react';
import scss from './ChatPage.module.scss';

export const ChatPage: FC = () => {
    return (
        <section className={scss.ChatPage}>
            <div className='container'>
                <div className={scss.content}>ChatPage</div>
            </div>
        </section>
    );
};
