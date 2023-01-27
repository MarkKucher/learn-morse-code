import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {selectTranslator, setTranslation, singleChar} from "../../../store/slices/translator";
import styles from "../../../styles/Translator.module.scss";
import {findCursorIndex} from "../../../adjuvant/searching/findCursorIndex";
import {returnArrayWithoutCursor} from "../../../adjuvant/filter/returnArrayWithoutCursor";

interface TranslationOutputProps {
    highlight: Function;
}

const TranslationOutput: React.FC<TranslationOutputProps> = ({highlight}) => {
    const {translation, sentence, reversedArray} = useAppSelector(selectTranslator)
    const dispatch = useAppDispatch();

    return (
        <div className={styles.translationOutput}>
            {translation.map((obj, index) => obj.value === ' ' ? <span className={styles.spaces} key={index}>&#160;&#160;&#160;&#160;</span>
                : <span key={index}>
                    {index !== 0 && translation[index - 1].value !== ' ' && <span className={styles.spaces}>&#160;&#160;</span>}
                    <span
                        className={obj.isHighlighted ? styles.highlighted : styles.default}
                        onClick={highlight(index, findCursorIndex(sentence, false) <= index ? index + 1 : index)}
                    >
                        {obj.value.split('').join(' ')}
                    </span>
                </span>
            )}
        </div>
    );
};

export default TranslationOutput;