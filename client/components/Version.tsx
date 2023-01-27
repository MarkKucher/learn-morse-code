import React from 'react';
import styles from "../styles/Version.module.scss";
import {useAppSelector} from "../hooks/redux";
import {selectSiteLanguageState} from "../store/slices/siteLanguage";

const Version = () => {
    const {selected} = useAppSelector(selectSiteLanguageState)

    const text = selected === 'ua' ? 'Версія' : selected === 'ru' ? 'Версия' : 'Version'

    return (
        <div className={styles.version}>
            {text}: 1.0.0
        </div>
    );
};

export default Version;