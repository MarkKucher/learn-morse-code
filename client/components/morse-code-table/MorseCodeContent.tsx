import React, {useState} from 'react';
import styles from "../../styles/DefaultModal.module.scss";
import {getObjectValuesTypeFriendly} from "../../adjuvant/getKeyValueTypeFriendly";
import {useAppSelector} from "../../hooks/redux";
import {selectTranslator} from "../../store/slices/translator";
import {selectSiteLanguageState} from "../../store/slices/siteLanguage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCircle, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import {noMorse} from "../../utils/morse-code-no";
import {specialSymbolsMorse} from "../../utils/morse-code-special-symbols";
import {specialCharactersMorse} from "../../utils/morse-code-special-characters";

const MorseCodeContent = () => {
    const {translationRelationships} = useAppSelector(selectTranslator)
    const {selected} = useAppSelector(selectSiteLanguageState)
    const order = [
        {ua: 'букви', ru: 'буквы', en: 'letters', table: translationRelationships},
        {ua: 'цифри', ru: 'цифры', en: 'numbers', table: noMorse},
        {ua: 'символи', ru: 'символы', en: 'symbols', table: specialSymbolsMorse},
        {ua: 'спеціальні символи', ru: 'специальные символы', en: 'special characters', table: specialCharactersMorse}
    ];
    const [currentType, setCurrentType] = useState<number>(0)

    const changeOutputType = (isMovingForward: boolean) => {
        return (e: React.MouseEvent<HTMLDivElement>) => {
            const lastIndex = order.length - 1
            let index = 0;
            if(isMovingForward) {
                if(currentType === lastIndex) index = 0; else index = currentType + 1
            } else {
                if(currentType === 0) index = lastIndex; else index = currentType - 1
            }
            setCurrentType(index)
        }
    }

    const chooseOption = (number: number) => {
        return (e: React.MouseEvent) => {
            setCurrentType(number)
        }
    }

    return (
        <>
            <div className={styles.contentCentered}>
                <div className={styles.title}>
                    <h2>{order[currentType][selected]}</h2>
                </div>
                <div className={styles.table}>
                    {getObjectValuesTypeFriendly(order[currentType].table).map((value, index) => <div key={value}>
                        <div>{Object.keys(order[currentType].table)[index]}</div>
                        <div>-</div>
                        <div>{value}</div>
                    </div>)}
                </div>
            </div>
            <footer className={styles.footer}>
                <div className={styles.icon} onClick={changeOutputType(false)}>
                    <FontAwesomeIcon icon={faChevronLeft}/>
                </div>
                <div className={styles.options}>
                    <FontAwesomeIcon className={currentType === 0 ? styles.chosenOption : styles.defaultOption} icon={faCircle} onClick={chooseOption(0)}/>
                    <FontAwesomeIcon className={currentType === 1 ? styles.chosenOption : styles.defaultOption} icon={faCircle} onClick={chooseOption(1)}/>
                    <FontAwesomeIcon className={currentType === 2 ? styles.chosenOption : styles.defaultOption} icon={faCircle} onClick={chooseOption(2)}/>
                    <FontAwesomeIcon className={currentType === 3 ? styles.chosenOption : styles.defaultOption} icon={faCircle} onClick={chooseOption(3)}/>
                </div>
                <div className={styles.icon} onClick={changeOutputType(true)}>
                    <FontAwesomeIcon icon={faChevronRight}/>
                </div>
            </footer>
        </>
    );
};

export default MorseCodeContent;