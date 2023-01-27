import React from 'react';
import styles from '../styles/MainLayout.module.scss';
import Header from "./Header";
import Version from "./Version";
import Creator from "./Creator";

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({children}) => {
    return (
        <div className={styles.picture}>
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