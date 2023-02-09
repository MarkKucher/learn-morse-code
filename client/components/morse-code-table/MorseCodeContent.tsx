import React, {useEffect, useRef, useState} from 'react';
import styles from "../../styles/DefaultModal.module.scss";
import {getObjectValuesTypeFriendly} from "../../adjuvant/getKeyValueTypeFriendly";
import {useAppSelector} from "../../hooks/redux";
import {selectTranslator} from "../../store/slices/translator";
import {selectSiteLanguageState} from "../../store/slices/siteLanguage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCircle, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import {MorseCodeType} from "../../utils/morse-code-language";
import {noMorse} from "../../utils/morse-code-no";
import {specialSymbolsMorse} from "../../utils/morse-code-special-symbols";
import {specialCharactersMorse} from "../../utils/morse-code-special-characters";
import {CSSTransition, SwitchTransition, TransitionGroup} from "react-transition-group";

interface numberType {
    ua: 'цифри',
    ru: 'цифры',
    en: 'numbers'
}

interface symbolType {
    ua: 'символи',
    ru: 'символы',
    en: 'symbols'
}

interface specialCharactersType {
    ua: 'спеціальні символи',
    ru: 'специальные символы',
    en: 'special characters'
}

interface letterType {
    ua: 'букви',
    ru: 'буквы',
    en: 'letters'
}

type outputTypeInterface = letterType | numberType | symbolType | specialCharactersType

const MorseCodeContent = () => {
    const [outputType, setOutputType] = useState<outputTypeInterface>({ua: 'букви', ru: 'буквы', en: 'letters'})
    const {translationRelationships} = useAppSelector(selectTranslator)
    const {selected} = useAppSelector(selectSiteLanguageState)
    const [tableContent, setTableContent] = useState<MorseCodeType | typeof noMorse | typeof specialSymbolsMorse | typeof specialCharactersMorse>(translationRelationships)
    const lettersRef = useRef<HTMLDivElement>(null)
    const numbersRef = useRef<HTMLDivElement>(null)
    const symbolsRef = useRef<HTMLDivElement>(null)
    const specialCharactersRef = useRef<HTMLDivElement>(null)
    const titleRef = outputType.en === 'letters' ? lettersRef : outputType.en === 'numbers' ? numbersRef : outputType.en === 'symbols' ? symbolsRef : specialCharactersRef
    const [shouldAnimate, setShouldAnimate] = useState<boolean>(false)

    useEffect(() => {
        setShouldAnimate(true)
    }, [outputType])

    const changeOutputType = (isMovingForward: boolean) => {
        return (e: React.MouseEvent<HTMLDivElement>) => {
            switch (outputType['en']) {
                case 'letters':
                    isMovingForward ? setOutputType({ua: 'цифри', ru: 'цифры', en: 'numbers'})
                        : setOutputType({ua: 'спеціальні символи', ru: 'специальные символы', en: 'special characters'})
                    break
                case "numbers":
                    isMovingForward ? setOutputType({ua: 'символи', ru: 'символы', en: 'symbols'})
                        : setOutputType({ua: 'букви', ru: 'буквы', en: 'letters'})
                    break
                case "symbols":
                    isMovingForward ? setOutputType({ua: 'спеціальні символи', ru: 'специальные символы', en: 'special characters'})
                        : setOutputType({ua: 'цифри', ru: 'цифры', en: 'numbers'})
                    break
                case "special characters":
                    isMovingForward ? setOutputType({ua: 'букви', ru: 'буквы', en: 'letters'})
                        : setOutputType({ua: 'символи', ru: 'символы', en: 'symbols'})
            }
        }
    }

    const chooseOption = (number: number) => {
        return (e: React.MouseEvent) => {
            switch (number) {
                case 1:
                    setOutputType({ua: 'букви', ru: 'буквы', en: 'letters'})
                    break
                case 2:
                    setOutputType({ua: 'цифри', ru: 'цифры', en: 'numbers'})
                    break
                case 3:
                    setOutputType({ua: 'символи', ru: 'символы', en: 'symbols'})
                    break
                case 4:
                    setOutputType({ua: 'спеціальні символи', ru: 'специальные символы', en: 'special characters'})
            }
        }
    }

    useEffect(() => {
        switch (outputType.en) {
            case "letters":
                setTableContent(translationRelationships)
                break
            case "numbers":
                setTableContent(noMorse)
                break
            case "symbols":
                setTableContent(specialSymbolsMorse)
                break
            case "special characters":
                setTableContent(specialCharactersMorse)
        }
    }, [outputType])

    return (
        <div className={styles.contentCentered}>
            <div ref={titleRef} className={styles.title}>
                <h2>{outputType[selected]}</h2>
            </div>
            <div className={styles.table}>
                {getObjectValuesTypeFriendly(tableContent).map((value, index) => <div key={value}>
                    <div>{Object.keys(tableContent)[index]}</div>
                    <div>-</div>
                    <div>{value}</div>
                </div>)}
            </div>
            <footer className={styles.footer}>
                <div className={styles.icon} onClick={changeOutputType(false)}>
                    <FontAwesomeIcon icon={faChevronLeft}/>
                </div>
                <div>
                    <div className={styles.options}>
                        <FontAwesomeIcon
                            onClick={chooseOption(1)}
                            className={outputType.en === 'letters' ? styles.chosenOption : styles.defaultOption}
                            icon={faCircle}
                        />
                        <FontAwesomeIcon
                            onClick={chooseOption(2)}
                            className={outputType.en === 'numbers' ? styles.chosenOption : styles.defaultOption}
                            icon={faCircle}
                        />
                        <FontAwesomeIcon
                            onClick={chooseOption(3)}
                            className={outputType.en === 'symbols' ? styles.chosenOption : styles.defaultOption}
                            icon={faCircle}
                        />
                        <FontAwesomeIcon
                            onClick={chooseOption(4)}
                            className={outputType.en === 'special characters' ? styles.chosenOption : styles.defaultOption}
                            icon={faCircle}
                        />
                    </div>
                </div>
                <div className={styles.icon} onClick={changeOutputType(true)}>
                    <FontAwesomeIcon icon={faChevronRight}/>
                </div>
            </footer>
        </div>
    );
};

export default MorseCodeContent;