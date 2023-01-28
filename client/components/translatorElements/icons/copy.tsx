import React from 'react';
import AnimatedIcon from "../../icons/animatedIcon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import {useAppSelector} from "../../../hooks/redux";
import {selectTranslator, singleChar} from "../../../store/slices/translator";
import {selectTypingType} from "../../../store/slices/typingType";
import {object} from "prop-types";

interface CopyProps {
    isTypingOutput: boolean;
    text?: string[];
    arrayOfSingleChars?: singleChar[];
}

const Copy: React.FC<CopyProps> = ({isTypingOutput, text, arrayOfSingleChars}) => {
    const {translation} = useAppSelector(selectTranslator);
    const {isReversed} = useAppSelector(selectTypingType);

    const onClick = async () => {
        let output = ''
        if(isTypingOutput) {
            if(text) {
                text.filter((s: string) => s !== '|').forEach((s: string) => {
                    output += s
                })
            } else if (arrayOfSingleChars) {
                arrayOfSingleChars.filter((obj: singleChar) => obj.value !== '|').forEach((obj: singleChar) => {
                    output += obj.value
                })
            }
        } else {
            if(!isReversed) {
                translation.forEach((obj, index) => {
                    if(index !== 0 && obj.value !== ' ') output += ' '
                    output += obj.value;
                })
            } else {
                translation.forEach(obj => {output += obj.value})
            }
        }
        await navigator.clipboard.writeText(output)
    }

    return (
        <div>
            <AnimatedIcon onClick={onClick}>
                <FontAwesomeIcon icon={faCopy}/>
            </AnimatedIcon>
        </div>
    );
};

export default Copy;