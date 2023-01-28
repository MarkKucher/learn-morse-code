import React from 'react';
import styles from "../../styles/CheckElement.module.scss";
import {selectTranslator, setTextToCheck} from "../../store/slices/translator";
import {useAppSelector} from "../../hooks/redux";
import {selectSiteLanguageState} from "../../store/slices/siteLanguage";
import CheckInput from "../input/CheckInput";

const CheckElement = () => {
    const {shouldShowResult, accuracy, textToCheck} = useAppSelector(selectTranslator)
    const {selected} = useAppSelector(selectSiteLanguageState)

    return (
        <div className={shouldShowResult ? accuracy >= 80 ? styles.correct : styles.incorrect : styles.main}>
            <CheckInput
                text={textToCheck}
                setText={setTextToCheck}
                placeholder={selected === 'ua' ? 'тут ви можете написати і перевірити очікуваний результат'
                    : selected === 'ru' ? 'здесь вы можете написать и проверить ожидаемый результат'
                        : 'here you can type and verify the expected result'}
            />
        </div>
    );
};

export default CheckElement;