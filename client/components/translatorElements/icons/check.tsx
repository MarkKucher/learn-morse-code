import React from 'react';
import AnimatedIcon from "../../icons/animatedIcon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import {
    selectTranslator,
    setAccuracy,
    setCorrectIndexes,
    setShouldShowResult,
    setTextToCheck
} from "../../../store/slices/translator";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {selectTypingType} from "../../../store/slices/typingType";
import {transformToReversedArray} from "../../../adjuvant/transform/transformToReversedArray";
import {transformToBitLikeLook} from "../../../adjuvant/transform/transformToBitLikeLook";

const Check = () => {
    const {translation, textToCheck} = useAppSelector(selectTranslator);
    const {isReversed} = useAppSelector(selectTypingType);
    const dispatch = useAppDispatch()

    const onClick = () => {
        dispatch(setTextToCheck([...textToCheck.filter(s => s !== '|'), '|']))
        const properTranslation = translation.map(obj => obj.value);
        let properTextToCheck = textToCheck.filter(s => s !== '|')
        let allSymbols = properTranslation.length;
        let numberOfCorrectSymbols = 0;
        let correctSymbolsIndexes: number[] = [];
        if(!isReversed) properTextToCheck = transformToBitLikeLook(properTextToCheck)
        let diff = properTextToCheck.length - properTranslation.length;
        if(diff > 0) allSymbols += diff;
        properTranslation.forEach((s, i) => {
            if(properTextToCheck[i] === s) {
                correctSymbolsIndexes.push(i)
                numberOfCorrectSymbols++
            }
        })
        const result = Math.floor(numberOfCorrectSymbols / allSymbols * 100)
        dispatch(setAccuracy(result))
        dispatch(setCorrectIndexes(correctSymbolsIndexes))
        setTimeout(() => {dispatch(setShouldShowResult(true))}, 0)
    }

    return (
        <div>
            <AnimatedIcon onClick={onClick}>
                <FontAwesomeIcon icon={faCheck}/>
            </AnimatedIcon>
        </div>
    );
};

export default Check;