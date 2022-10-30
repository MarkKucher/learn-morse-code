import React from 'react';
import styles from "../styles/LanguageIcon.module.scss"

interface LanguageIconProps {
    language: string;
}

const LanguageIcon: React.FC<LanguageIconProps> = ({language}) => {
    return (
        <div className={styles.main}>
            {language}
        </div>
    );
};

export default LanguageIcon;