import React from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {selectTypingType, setIsReversed} from "../store/slices/typingType";
import styles from "../styles/TypingType.module.scss";

const TypingTypeIcon = () => {
    const {isReversed} = useAppSelector(selectTypingType);
    const dispatch = useAppDispatch();

    return (
        <div className={styles.main} onClick={() => {dispatch(setIsReversed(!isReversed))}}>
            {isReversed ? '. _ _' : 'W'}
        </div>
    );
};

export default TypingTypeIcon;