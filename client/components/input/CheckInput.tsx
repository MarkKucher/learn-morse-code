import React, {useCallback, useEffect, useRef, useState} from 'react';
import styles from '../../styles/CheckInput.module.scss';
import Cursor from "../translatorElements/cursor";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {selectTranslator, setShouldShowResult} from "../../store/slices/translator";
import {selectTypingType} from "../../store/slices/typingType";
import {checkAffiliation} from "../../adjuvant/checkAffiliation";
import {noMorse} from "../../utils/morse-code-no";
import {specialCharactersMorse} from "../../utils/morse-code-special-characters";
import {specialSymbolsMorse} from "../../utils/morse-code-special-symbols";
import CustomPlaceholder from "./customPlaceholder";
import {findObjectByValue} from "../../adjuvant/searching/findObjectByValue";
import {calculateIndexInWordLikeArray} from "../../adjuvant/calculateIndexInWordLikeArray";
import {transformToBitLikeLook} from "../../adjuvant/transform/transformToBitLikeLook";
import {findIndexInWordsLikeArray} from "../../adjuvant/searching/findIndexInWordsLikeArray";
import {findSentenceIndexInReversedArray} from "../../adjuvant/searching/findSentenceIndexInReversedArray";
import {findIndexInBitLikeArray} from "../../adjuvant/searching/findIndexInBitLikeArray";
import {transformToWordLikeLook} from "../../adjuvant/transform/transformToWordLikeLook";

interface CheckInputProps {
    text: string[];
    setText: Function;
    placeholder?: string;
    rootClassName?: string;
    charactersClassName?: string;
}

const CheckInput: React.FC<CheckInputProps> = (
    {text, setText, placeholder, rootClassName, charactersClassName}
) => {
    const [isForbiddenKeyPressed, setIsForbiddenKeyPressed] = useState<boolean>(false)
    const [isWriting, setIsWriting] = useState<boolean>(false)
    const [isFocused, setIsFocused] = useState<boolean>(false)
    const [shouldShowPlaceholder, setShouldShowPlaceholder] = useState<boolean>(true)
    const [wordsLikeOutput, setWordsLikeOutput] = useState<string[][]>([['|']])
    const [bitLikeOutput, setBitLikeOutput] = useState<string[]>(['|'])
    const writingRef = useRef<any>(null)
    const forbiddenRef = useRef<any>(null)
    const ref = useRef<HTMLInputElement>(null);
    const {translationRelationships, correctIndexes, shouldShowResult} = useAppSelector(selectTranslator);
    const {isReversed} = useAppSelector(selectTypingType);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(text.length === 1 && placeholder && !isFocused) {
            setShouldShowPlaceholder(true)
        }
    }, [isFocused, text])

    useEffect(() => {
        dispatch(setShouldShowResult(false))
    }, [text])

    useEffect(() => {
        dispatch(setText(['|']))
    }, [isReversed])

    useEffect(() => {
        if(isReversed) {
            setWordsLikeOutput(transformToWordLikeLook(text))
        } else {
            setBitLikeOutput(transformToBitLikeLook(text))
        }
    }, [text])

    const changeSentence = (str: string) => {
        let index = text.indexOf('|')
        if(str.length > 1) {
            let isAllowed = true;
            str.split('').map((s) => {
                if(!checkAffiliation(
                    s.toLowerCase(), [translationRelationships, noMorse, specialCharactersMorse, specialSymbolsMorse, {' ': ' '}], !isReversed)
                ) {
                    isAllowed = false;
                }
            })
            if(!isAllowed) {
                forbid()
                return;
            }
            dispatch(setText([...text.slice(0, index), ...str.split(''), ...text.slice(index)]))
        } else {
            if (!checkAffiliation(str.toLowerCase(), [translationRelationships, noMorse, specialCharactersMorse, specialSymbolsMorse, {' ': ' '}], !isReversed)) {
                forbid()
                return;
            }
            dispatch(setText([...text.slice(0, index), str, ...text.slice(index)]))
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value.length > 1) {
            emitWriting()
            changeSentence(e.target.value)
        }
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        let index = text.indexOf('|')
        switch (e.key) {
            case 'ArrowRight':
                if(index === text.length - 1) {
                    forbid()
                    break
                }
                dispatch(setText([...text.slice(0, index), text[index + 1], '|', ...text.slice(index + 2)]))
                break
            case 'ArrowLeft':
                if(index === 0) {
                    forbid()
                    return;
                }
                dispatch(setText([...text.slice(0, index - 1), '|', text[index - 1], ...text.slice(index + 1)]))
                break
            case 'Backspace':
                if(index === 0) {
                    forbid()
                    return;
                }
                emitWriting()
                dispatch(setText([...text.slice(0, index - 1), '|', ...text.slice(index + 1)]))
                break
            case 'Delete':
                if(index === text.length - 1) {
                    forbid()
                    return;
                }
                emitWriting()
                dispatch(setText([...text.slice(0, index + 1), ...text.slice(index + 2)]))
                break
            case 'Enter':
                break
        }
    }

    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key !== 'Enter') {
            console.log(typeof e)
            emitWriting()
            changeSentence(e.key)
        }
    }

    const focus = () => {
        setIsFocused(true)
        ref.current?.focus()
    }
    
    const forbid = () => {
        setIsWriting(false)
        setIsForbiddenKeyPressed(true)
        if(forbiddenRef.current) {
            clearTimeout(forbiddenRef.current)
        }
        forbiddenRef.current = setTimeout(() => {
            setIsForbiddenKeyPressed(false)
        }, 300)
    }
    
    const emitWriting = () => {
        setIsWriting(true)
        if(writingRef.current) {
            clearTimeout(writingRef.current)
        }
        writingRef.current = setTimeout(() => {
            setIsWriting(false)
        }, 500)
    }

    const moveCursor = (index: number) => {
        return () => {
            let newText;
            if(index === 0) {
                newText = ['|', ...text.filter(s => s !== '|')]
            } else if(index === text.length) {
                newText = [...text.filter(s => s !== '|'), '|']
            } else {
                newText = [...text.slice(0, index), '|', ...text.slice(index)].filter((s, i) => s !== '|' || i === index)
            }
            dispatch(setText(newText))
        }
    }

    if(shouldShowPlaceholder && placeholder) return <CustomPlaceholder onClick={() => {setShouldShowPlaceholder(false)}} text={placeholder}/>
    
    return (
        <div onClick={focus} className={rootClassName ? rootClassName : styles.main}>
            <span className={styles.spaces} onClick={moveCursor(0)}>&#160;&#160;</span>
            <input
                ref={ref}
                type="text"
                onBlur={() => {setIsFocused(false)}}
                className={styles.fakeInput}
                value={''}
                onChange={onChange}
                onKeyDown={onKeyDown}
                onKeyPress={onKeyPress}
            />
            {isReversed ?
                wordsLikeOutput.map((arr, index) => arr[0] === ' ' ?
                    <span key={index} onClick={moveCursor(calculateIndexInWordLikeArray(wordsLikeOutput, index))} className={styles.spaces}>&#160;</span> :
                <span key={index}>
                    {arr.map((s, i) => s === '|' ?
                        <Cursor isFocused={isFocused} isForbiddenKeyPressed={isForbiddenKeyPressed} isWriting={isWriting}/> :
                        <span key={i} className={shouldShowResult ? checkAffiliation(findIndexInWordsLikeArray(wordsLikeOutput, index, i), [correctIndexes], true) ? styles.correct : styles.incorrect : undefined}>
                            {s}
                        </span>)}
                </span>)
                :
                bitLikeOutput.map((bit, index) => bit === ' ' ?
                    <span key={index} onClick={moveCursor(findIndexInBitLikeArray(bitLikeOutput, index))} className={styles.spaces}>&#160;&#160;</span> :
                    <span key={index} className={shouldShowResult ? checkAffiliation(index, [correctIndexes], true) ? styles.correct : styles.incorrect : undefined}>
                        {index !== 0 && <span onClick={moveCursor(findIndexInBitLikeArray(bitLikeOutput, index))} className={styles.spaces}>&#160;&#160;</span>}
                        {bit.split('').map((s, i) => s === '|' ?
                            <Cursor isFocused={isFocused} isForbiddenKeyPressed={isForbiddenKeyPressed} isWriting={isWriting}/> :
                            <span key={i} className={charactersClassName ? charactersClassName : styles.character}>
                                {i !== 0 && bit.split('')[i - 1] !== '|' ? ` ${s}` : s}
                            </span>
                        )}
                    </span>
                )
            }
            <span className={styles.spaces} onClick={moveCursor(text.length)}>&#160;&#160;</span>
        </div>
    );
};

export default CheckInput;