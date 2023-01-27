import React, {MouseEventHandler, Ref, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {selectTypingType} from "../../../store/slices/typingType";
import styles from "../../../styles/TypingContainer.module.scss";
import ReversedTypingOutput from "./reversedTypingOutput";
import TypingOutput from "./typingOutput";
import {selectTranslator, setIsFocused} from "../../../store/slices/translator";
import IconList, {typeStates} from "../icons/iconList";
import {Reference} from "@typescript-eslint/scope-manager";

interface TypingContainerProps {
    highlight: Function;
    inputRef: input;
}

interface input {
    current: HTMLInputElement | null;
}

const TypingContainer: React.FC<TypingContainerProps> = ({highlight, inputRef}) => {
    const {isReversed} = useAppSelector(selectTypingType)
    const {sentence} = useAppSelector(selectTranslator)
    const dispatch = useAppDispatch()

    const focus = () => {
        dispatch(setIsFocused(true))
        inputRef.current?.focus()
    }

    return (
        <div className={styles.main} onClick={focus}>
            {sentence.length > 1 && <IconList type={typeStates.typing}/>}
            {isReversed ? <ReversedTypingOutput highlight={highlight}/> : <TypingOutput highlight={highlight}/>}
        </div>
    );
};

export default TypingContainer;