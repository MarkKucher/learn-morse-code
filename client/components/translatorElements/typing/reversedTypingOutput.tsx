import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {
    selectTranslator,
    setReversedArray, setSentence, singleChar,
} from "../../../store/slices/translator";
import Cursor from "../cursor";
import styles from "../../../styles/Translator.module.scss";
import {transformToReversedArray} from "../../../adjuvant/transform/transformToReversedArray";
import {transformTranslationToSentence} from "../../../adjuvant/transform/transformTranslationToSentence";
import {switchIsHighlighted} from "../../../adjuvant/switchIsHighlighted";
import {findSentenceIndexInReversedArray} from "../../../adjuvant/searching/findSentenceIndexInReversedArray";

interface ReversedTypingOutput {
    highlight: Function;
}

const ReversedTypingOutput: React.FC<ReversedTypingOutput> = ({highlight}) => {
    const {reversedArray, sentence, highlightedCouple, prevReversedArray, translation, translationRelationships} = useAppSelector(selectTranslator);
    const [isSentenceCompiled, setIsSentenceCompiled] = useState<boolean>(false)
    const [isReversedArrayCompiled, setIsReversedArrayCompiled] = useState<boolean>(false)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setSentence(transformTranslationToSentence(translation)))
        setIsSentenceCompiled(true)
    }, [])

    useEffect(() => {
        if(isSentenceCompiled) {
            dispatch(setReversedArray(transformToReversedArray(sentence, translationRelationships)))
            setIsReversedArrayCompiled(true)
        }
    }, [sentence, isSentenceCompiled])

    const moveCursor = (index: number) => {
        if(sentence.length === 1) return;
        return () => {
            let newSentence;
            if(index === -1) {
                newSentence = [{value: '|'}, ...sentence.filter(obj => obj.value !== '|')]
            } else if(index === reversedArray.length) {
                newSentence = [...sentence.filter(obj => obj.value !== '|'), {value: '|'}]
            } else {
                let indexInSentence = findSentenceIndexInReversedArray(reversedArray, index) + reversedArray[index].value.length - 1;
                newSentence = [...sentence.slice(
                    0, indexInSentence + 1), {value: '|'}, ...sentence.slice(indexInSentence + 1)].filter((obj, i) => obj.value !== '|' || i === indexInSentence + 1
                )
            }
            dispatch(setSentence(newSentence))
        }
    }

    return (
        <div className={styles.typingOutput}>
            <span onClick={moveCursor(-1)} className={styles.moveCursor}>&#160;&#160;</span>
            {reversedArray.map((obj, index) => obj.value === '|' ?
                <span key={index}>
                    {index !== 0 && <span className={styles.spaces}>&#160;&#160;</span>}
                   <Cursor/>
                </span>
                 :
                obj.value === ' ' ? <span key={index} className={styles.spaces} onClick={moveCursor(index - 1)}>
                &#160;&#160;
            </span> : <span
                key={index}
            >
                {index !== 0 && <span onClick={moveCursor(index - 1)} className={styles.spaces}>&#160;&#160;</span>}
                {obj.value.includes('|') ? <span>
                    {obj.value.indexOf('|') !== 0 && <span
                        onClick={highlight(index)}
                        className={obj.isTranslated ? obj.isHighlighted ? styles.highlighted : styles.default : styles.incorrect}
                    >
                        {obj.value.substring(0, obj.value.indexOf('|')).split('').join(' ')}
                    </span>}
                    <Cursor/>
                    {obj.value.at(-1) !== '|' && <span
                        onClick={highlight(index)}
                        className={obj.isTranslated ? obj.isHighlighted ? styles.highlighted : styles.default : styles.incorrect}
                    >
                        {obj.value.substring(obj.value.indexOf('|') + 1).split('').join(' ')}
                    </span>}
                </span> : <span
                    onClick={highlight(index)}
                    className={obj.isTranslated ? obj.isHighlighted ? styles.highlighted : styles.default : styles.incorrect}
                >{obj.value.split('').join(' ')}</span>}
            </span>)}
            <span onClick={moveCursor(reversedArray.length)} className={styles.moveCursor}>&#160;&#160;</span>
        </div>
    );
};

export default ReversedTypingOutput;