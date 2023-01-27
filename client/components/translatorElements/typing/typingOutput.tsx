import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {selectTranslator, setHighlightedCouple, setSentence, singleChar} from "../../../store/slices/translator";
import Cursor from "../cursor";
import styles from "../../../styles/Translator.module.scss";
import {findCursorIndex} from "../../../adjuvant/searching/findCursorIndex";
import {transformToWordLikeLook} from "../../../adjuvant/transform/transformToWordLikeLook";
import {calculateIndexInWordLikeArray} from "../../../adjuvant/calculateIndexInWordLikeArray";
import {findIndexInWordsLikeArray} from "../../../adjuvant/searching/findIndexInWordsLikeArray";

interface TypingOutput {
    highlight: Function;
}

const TypingOutput: React.FC<TypingOutput> = ({highlight}) => {
    const {sentence, translation, reversedArray} = useAppSelector(selectTranslator);
    const [wordsLikeOutput, setWordsLikeOutput] = useState<string[][]>([]);
    const dispatch = useAppDispatch()

    useEffect(() => {
        translation.length && dispatch(setSentence([...translation, {value: '|'}]))
    }, [])

    useEffect(() => {
        setWordsLikeOutput(transformToWordLikeLook(sentence.map(el => el.value)))
    }, [sentence])

    const moveCursor = (index: number) => {
        return () => {
            let newSentence;
            if(index === 0) {
                newSentence = [{value: '|'}, ...sentence.filter(obj => obj.value !== '|')]
            } else if(index === sentence.length) {
                newSentence = [...sentence.filter(obj => obj.value !== '|'), {value: '|'}]
            } else {
                newSentence = [...sentence.slice(0, index), {value: '|'}, ...sentence.slice(index)].filter((obj, i) => obj.value !== '|' || i === index)
            }
            dispatch(setSentence(newSentence))
        }
    }


    return (
        <div className={styles.typingOutput}>
            <span className={styles.moveCursor} onClick={moveCursor(0)}>&#160;&#160;</span>
            {wordsLikeOutput.map((arr, index) => arr[0] === ' ' ?
                <span onClick={moveCursor(calculateIndexInWordLikeArray(wordsLikeOutput, index))} className={styles.spaces} key={index}>&#160;</span> :
                <span key={index}>
                    {arr.map((s, i) => s === '|' ? <Cursor key={i}/> :
                        <span
                            key={i}
                            onClick={highlight(findIndexInWordsLikeArray(wordsLikeOutput, index, i), null, findCursorIndex(sentence, false) < findIndexInWordsLikeArray(wordsLikeOutput, index, i) ? findIndexInWordsLikeArray(wordsLikeOutput, index, i) - 1 : findIndexInWordsLikeArray(wordsLikeOutput, index, i))}
                            className={sentence[findIndexInWordsLikeArray(wordsLikeOutput, index, i)]?.isHighlighted ? styles.highlighted : styles.default}
                        >
                            {s}
                        </span>
                    )}
                </span>
            )}
            <span className={styles.moveCursor} onClick={moveCursor(sentence.length)}>&#160;&#160;</span>
        </div>
    );
};

export default TypingOutput;