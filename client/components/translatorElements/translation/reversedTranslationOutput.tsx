import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {
    selectTranslator, setShouldAutoTranslate, setTranslation
} from "../../../store/slices/translator";
import styles from "../../../styles/Translator.module.scss";
import {findIndexInWordsLikeArray} from "../../../adjuvant/searching/findIndexInWordsLikeArray";
import {findCursorIndex} from "../../../adjuvant/searching/findCursorIndex";
import {transformToWordLikeLook} from "../../../adjuvant/transform/transformToWordLikeLook";

interface ReversedTranslationOutput {
    highlight: Function;
}

const ReversedTranslationOutput: React.FC<ReversedTranslationOutput> = ({highlight}) => {
    const {translation, sentence, shouldAutoTranslate} = useAppSelector(selectTranslator);
    const [wordsLikeOutput, setWordsLikeOutput] = useState<string[][]>([]);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setWordsLikeOutput(transformToWordLikeLook(translation.map(el => el.value)))
    }, [translation])

    return (
        <div className={styles.translationOutput}>
            {wordsLikeOutput.map((arr, index) => arr[0] === ' ' ?
                <span className={styles.spaces} key={index}>&#160;</span> :
                <span key={index}>
                    {arr.map((s, i) =>
                        <span
                            key={i}
                            onClick={highlight(findIndexInWordsLikeArray(wordsLikeOutput, index, i))}
                            className={translation[findIndexInWordsLikeArray(wordsLikeOutput, index, i)]?.isHighlighted ? styles.highlighted : styles.default}
                        >
                            {s}
                        </span>
                    )}
                </span>
            )}
        </div>
    );
};

export default ReversedTranslationOutput;