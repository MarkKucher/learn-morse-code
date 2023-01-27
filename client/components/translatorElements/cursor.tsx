import React, {memo} from 'react';
import styles from "../../styles/Cursor.module.scss";
import {useAppSelector} from "../../hooks/redux";
import {selectTranslator} from "../../store/slices/translator";
import {selectTypingType} from "../../store/slices/typingType";

interface CursorProps {
    isFocused?: boolean;
    isForbiddenKeyPressed?: boolean;
    isWriting?: boolean;
}

const Cursor: React.FC<CursorProps> = (p) => {
    const {isFocused, isForbiddenKeyPressed, isWriting, sentence, reversedArray} = useAppSelector(selectTranslator);

    return (
        <span className={styles.tune}>
            {Object.hasOwn(p, 'isFocused') ? <span
                    className={p.isFocused ? p.isForbiddenKeyPressed ? styles.forbidden : p.isWriting ? styles.active : styles.passive : styles.nonFocused}
                    onClick={e => {
                    e.preventDefault()
                }}>
                    |
                </span>
                : <span
                className={isFocused ? isForbiddenKeyPressed ? styles.forbidden : isWriting ? styles.active : styles.passive : styles.nonFocused}
                onClick={e => {
                    e.preventDefault()
                }}
            >
                |
            </span>}
        </span>
    );
};

export default Cursor;