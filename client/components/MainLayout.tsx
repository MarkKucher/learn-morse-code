import React from 'react';
import styles from '../styles/MainLayout.module.scss';
import LanguageIcon from "./LanguageIcon";
import Header from "./Header";

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({children}) => {
    return (
        <div className={styles.main}>
            <Header/>
            {children}
        </div>
    );
};

export default MainLayout;