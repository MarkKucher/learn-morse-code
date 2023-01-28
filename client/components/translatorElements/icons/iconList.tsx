import React, {useEffect, useState} from 'react';
import styles from '../../../styles/IconList.module.scss'
import ClearInput from "./clearInput";
import Copy from "./copy";
import SetVisibility from "./setVisibility";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {
    selectTranslator,
    setSentence,
    setShouldShowResult,
    setTextToCheck,
    setTranslation
} from "../../../store/slices/translator";
import Check from "./check";
import {switchCase} from "@babel/types";
import ResultInPercentage from "../resultInPercentage";
import AudioIcon from "./audioIcon";

export enum typeStates {
    typing = 'typing',
    translation = 'translation',
    checking = 'checking'
}

interface IconListProps {
    type: typeStates.typing | typeStates.translation | typeStates.checking;
}

const IconList: React.FC<IconListProps> = ({type}) => {
    const {isTranslationVisible, textToCheck, sentence, shouldShowResult} = useAppSelector(selectTranslator)
    const dispatch = useAppDispatch()

    switch (type) {
        case typeStates.typing:
            return (
                <div className={styles.iconList} onClick={(e) => {e.stopPropagation()}}>
                    <Copy isTypingOutput={true} arrayOfSingleChars={sentence}/>
                    <ClearInput isArrayConsistOfString={false} setText={setSentence} setTranslation={setTranslation}/>
                </div>
            )
        case typeStates.translation:
            return (
                <div className={styles.iconList} onClick={(e) => {e.stopPropagation()}}>
                    <Copy isTypingOutput={false}/>
                    {/*<AudioIcon/>*/}
                    <SetVisibility/>
                </div>
            )
        case typeStates.checking:
            return (
                <div className={styles.iconList} onClick={(e) => {e.stopPropagation()}}>
                    {textToCheck.length > 1 && shouldShowResult && <ResultInPercentage/>}
                    {textToCheck.length > 1 && <Check/>}
                    {textToCheck.length > 1 && <Copy isTypingOutput={true} text={textToCheck}/>}
                    {textToCheck.length > 1 && <ClearInput isArrayConsistOfString={true} setText={setTextToCheck}/>}
                    <SetVisibility/>
                </div>
            )
    }
};

export default IconList;