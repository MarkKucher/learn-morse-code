import React from 'react';
import styles from '../styles/MainLayout.module.scss';
import Header from "./Header";
import Version from "./Version";
import Creator from "./Creator";
import Head from "next/head";

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({children}) => {
    return (
        <div className={styles.picture}>
            <Head>
                <title>Перекладач азбуки Морзе</title>
                <meta name="description" content="Цей додаток дає змогу перекласти код Морзе та вивчити його."/>
                <meta name="keywords" content="Morse code, азбука морзе, перекласти код морзе"/>
                <meta property="og:type" content="website"/>
                <meta property="og:url" content="https://translator-morse-code.vercel.app/"/>
                <meta property="og:title" content="Перекладач азбуки Морзе"/>
                <meta property="og:description" content="Цей додаток дає змогу перекласти код Морзе та вивчити його."/>
                <meta property="og:image" content="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcb2Yayi7-wTgaqcdFqZ3xl5trpTRUvL9cCQ&usqp=CAU"/>
            </Head>
            <div className={styles.main} id={'MainLayout'}>
                <Header/>
                <Version/>
                <Creator/>
                {children}
            </div>
        </div>
    );
};

export default MainLayout;