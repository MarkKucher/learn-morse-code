import React, {useEffect, useRef, useState} from 'react';
import styles from "../../styles/MainInput.module.scss";
import {checkAffiliation} from "../../adjuvant/checkAffiliation";
import {noMorse} from "../../utils/morse-code-no";
import {specialCharactersMorse} from "../../utils/morse-code-special-characters";
import {specialSymbolsMorse} from "../../utils/morse-code-special-symbols";
import {useSelector} from "react-redux";
import {selectSiteLanguageState} from "../../store/slices/siteLanguage";
import {getValueByKey} from "../../adjuvant/getValueByKey";
import {MorseCodeLanguage} from "../../utils/morse-code-language";
import {selectTypingType} from "../../store/slices/typingType";
import TypingContainer from "./typing/typingContainer";
import TranslationContainer from "./translation/translationContainer";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {
    selectTranslator,
    setIsFocused,
    setIsForbiddenKeyPressed,
    setIsWriting,
    setReversedArray,
    setSentence,
    setTranslation,
    setTranslationRelationships, singleChar
} from "../../store/slices/translator";
import {findObjectByValue} from "../../adjuvant/searching/findObjectByValue";
import {switchIsHighlighted} from "../../adjuvant/switchIsHighlighted";
import {findCursorIndex} from "../../adjuvant/searching/findCursorIndex";
import {findSentenceIndexInReversedArray} from "../../adjuvant/searching/findSentenceIndexInReversedArray";
import {translate} from "../../adjuvant/translate";

const Translator = () => {
    const {selected} = useSelector(selectSiteLanguageState);
    const {isReversed} = useSelector(selectTypingType);
    const {sentence, translation, translationRelationships, isWriting, reversedArray, isFocused} = useAppSelector(selectTranslator);
    const dispatch = useAppDispatch();
    const ref = useRef<HTMLInputElement>(null);
    const timeoutRef = useRef<any>(null);
    const forbiddenRef = useRef<any>(null);

    useEffect(() => {
        dispatch(setTranslationRelationships(getValueByKey(selected, [MorseCodeLanguage], false)))
    }, [selected])


    useEffect(() => {
        if(!isWriting) {
            translate(reversedArray, isReversed, translationRelationships, dispatch, sentence)
        }
    }, [isWriting])

    const emitWriting = () => {
        dispatch(setIsWriting(true))
        if(timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => {
            dispatch(setIsWriting(false))
        }, 500)
    }

    const forbidden = () => {
        dispatch(setIsWriting(false))
        dispatch(setIsForbiddenKeyPressed(true))
        if(forbiddenRef.current) {
            clearTimeout(forbiddenRef.current)
        }
        forbiddenRef.current = setTimeout(() => {dispatch(setIsForbiddenKeyPressed(false))}, 300)
    }

    const changeSentence = (str: string) => {
        let index = findObjectByValue(sentence, '|');
        if(str.length > 1) {
            let isAllowed = true;
            str.split('').map((s) => {
                if(!checkAffiliation(
                    s.toLowerCase(), [translationRelationships, noMorse, specialCharactersMorse, specialSymbolsMorse, {' ': ' '}], isReversed)
                ) {
                    isAllowed = false;
                }
            })
            if(!isAllowed) {
                forbidden()
                return;
            }
            dispatch(setSentence([...sentence.slice(0, index), ...str.split('').map((s) => ({value: s, isHighlighted: false})),
                ...sentence.slice(index)]
                ))
        } else {
            if (!checkAffiliation(str.toLowerCase(), [translationRelationships, noMorse, specialCharactersMorse, specialSymbolsMorse, {' ': ' '}], isReversed)) {
                forbidden()
                return;
            }
            dispatch(setSentence([...sentence.slice(0, index), {value: str, isHighlighted: false}, ...sentence.slice(index)]))
        }
    }

    const onChange = (e) => {
        if(e.target.value.length > 1) {
            emitWriting()
            changeSentence(e.target.value)
        }
    }

    const onKeyDown = (e) => {
        let index = findObjectByValue(sentence, '|')
        switch (e.key) {
            case 'ArrowRight':
                if(index === sentence.length - 1) {
                    forbidden()
                    break
                }
                dispatch(setSentence([...sentence.slice(0, index), sentence[index + 1], {value: '|'}, ...sentence.slice(index + 2)]))
                break
            case 'ArrowLeft':
                if(index === 0) {
                    forbidden()
                    return;
                }
                dispatch(setSentence([...sentence.slice(0, index - 1), {value: '|'}, sentence[index - 1], ...sentence.slice(index + 1)]))
                break
            case 'Backspace':
                if(index === 0) {
                    forbidden()
                    return;
                }
                emitWriting()
                dispatch(setSentence([...sentence.slice(0, index - 1), {value: '|'}, ...sentence.slice(index + 1)]))
                break
            case 'Delete':
                if(index === sentence.length - 1) {
                    forbidden()
                    return;
                }
                emitWriting()
                dispatch(setSentence([...sentence.slice(0, index + 1), ...sentence.slice(index + 2)]))
                break
            case 'Enter':
                break
        }
    }

    const onKeyPress = (e) => {
        if(e.key !== 'Enter') {
            emitWriting()
            changeSentence(e.key)
        }
    }

    const highlight = (index: number, typingIndex?: number | null, translationIndex?: number | null) => {
        return (e: InputEvent) => {
            e.preventDefault()
            if(isReversed) {
                let indexInSentence = findSentenceIndexInReversedArray(reversedArray, index)
                dispatch(setSentence(switchIsHighlighted(sentence, indexInSentence)))
                let indexesOfEarlierIncorrectBits: number[] = [];
                let translationReversedIndex = index;
                reversedArray.forEach((obj, i) => {
                    obj.isTranslated === false && indexesOfEarlierIncorrectBits.push(i)
                })
                indexesOfEarlierIncorrectBits.forEach(num => {
                    num < index && translationReversedIndex--
                })
                dispatch(setTranslation(switchIsHighlighted(translation, translationReversedIndex)))
            } else {
                dispatch(setSentence(switchIsHighlighted(sentence, typingIndex ? typingIndex : index)))
                dispatch(setTranslation(switchIsHighlighted(translation, translationIndex ? translationIndex : index)))
            }
    }}

    return (
        <div className={styles.main}>
            <input value={''}
                   onChange={onChange}
                   onKeyDown={onKeyDown}
                   onBlur={() => {dispatch(setIsFocused(false))}}
                   ref={ref}
                   type="text"
                   className={styles.fakeInput}
                   onKeyPress={onKeyPress}/>
            <TypingContainer inputRef={ref} highlight={highlight}/>
            <TranslationContainer highlight={highlight}/>
        </div>
    );
};

export default Translator;