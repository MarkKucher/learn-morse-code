import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {selectTypingType} from "../../../store/slices/typingType";
import styles from "../../../styles/TranslationContainer.module.scss";
import ReversedTranslationOutput from "./reversedTranslationOutput";
import TranslationOutput from "./translationOutput";
import {selectTranslator, setTranslation, singleChar} from "../../../store/slices/translator";
import {getValueByKey} from "../../../adjuvant/getValueByKey";
import {noMorse} from "../../../utils/morse-code-no";
import {specialSymbolsMorse} from "../../../utils/morse-code-special-symbols";
import {specialCharactersMorse} from "../../../utils/morse-code-special-characters";
import {selectSiteLanguageState} from "../../../store/slices/siteLanguage";
import IconList, {typeStates} from "../icons/iconList";
import CheckElement from "../checkElement";
import {returnArrayWithoutCursor} from "../../../adjuvant/filter/returnArrayWithoutCursor";

interface TranslationContainerProps {
    highlight: Function;
}

const TranslationContainer: React.FC<TranslationContainerProps> = ({highlight}) => {
    const [shouldFocus, setShouldFocus] = useState<boolean>(false)
    const {isReversed} = useAppSelector(selectTypingType);
    const {sentence, reversedArray, translationRelationships, translation, isTranslationVisible, textToCheck, accuracy, shouldShowResult} = useAppSelector(selectTranslator);
    const {selected} = useAppSelector(selectSiteLanguageState);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(sentence.length !== 1 || sentence[0].value.length !== 1) {
            let translationArray = [] as singleChar[]
            let translateFrom = isReversed ? reversedArray : sentence
            translateFrom.map((obj) => {
                translationArray.push({
                    value: getValueByKey(obj.value.toLowerCase(), [noMorse, translationRelationships, specialSymbolsMorse, specialCharactersMorse, {' ': ' '}], isReversed),
                    isHighlighted: obj.isHighlighted
                })
            })
            dispatch(setTranslation(translationArray))
        }
    }, [translationRelationships])

    useEffect(() => {
        return () => {
            dispatch(setTranslation([]))
        }
    }, [])

    useEffect(() => {
        if(!isReversed) {
            reversedArray.length > 1 && dispatch(setTranslation(returnArrayWithoutCursor(reversedArray)))
        } else {
            sentence.length > 1 && dispatch(setTranslation(sentence.filter(obj => obj.value !== '|')))
        }
    }, [isReversed])

    if(sentence.length === 1) return null;

    return (
        <div className={styles.main}>
            {translation.length > 0 && <IconList type={isTranslationVisible ? typeStates.translation : typeStates.checking}/>}
            {
                isTranslationVisible ? isReversed ? <ReversedTranslationOutput highlight={highlight}/> : <TranslationOutput highlight={highlight}/>
                    : <CheckElement/>
            }
        </div>
    );
};

export default TranslationContainer;