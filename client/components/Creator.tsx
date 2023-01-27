import React from 'react';
import styles from "../styles/Version.module.scss";
import {useAppSelector} from "../hooks/redux";
import {selectSiteLanguageState} from "../store/slices/siteLanguage";

const Creator = () => {
    const {selected} = useAppSelector(selectSiteLanguageState)

    const text = selected === 'ua' ? 'Розробник: Кучер Марк' : selected === 'ru' ? 'Разработчик: Кучер Марк' : 'Developer: Mark Kucher'

    return (
        <div className={styles.creator}>
            {text}
        </div>
    );
};

export default Creator;