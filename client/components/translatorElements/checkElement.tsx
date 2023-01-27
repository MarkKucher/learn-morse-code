import React, {useEffect, useState} from 'react';
import styles from "../../styles/CheckElement.module.scss";
import CustomInput from "../input/checkInput";
import {selectTranslator, setShouldAutoTranslate, setTextToCheck} from "../../store/slices/translator";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {selectSiteLanguageState} from "../../store/slices/siteLanguage";
import {translate} from "../../adjuvant/translate";
import {selectTypingType} from "../../store/slices/typingType";
import CheckInput from "../input/checkInput";

const CheckElement = () => {
    const {shouldShowResult, accuracy, textToCheck, shouldAutoTranslate} = useAppSelector(selectTranslator)
    const {selected} = useAppSelector(selectSiteLanguageState)
    const {isReversed} = useAppSelector(selectTypingType)
    const dispatch = useAppDispatch()

    useEffect(() => {
        return () => {
            isReversed && dispatch(setShouldAutoTranslate(false))
        }
    }, [])

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