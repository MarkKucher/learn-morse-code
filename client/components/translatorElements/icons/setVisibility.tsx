import React from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {selectTranslator, setIsTranslationVisible} from "../../../store/slices/translator";
import AnimatedIcon from "../../icons/animatedIcon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

const SetVisibility: React.FC = () => {
    const {isTranslationVisible} = useAppSelector(selectTranslator)
    const dispatch = useAppDispatch()

    const onClick = () => {
        dispatch(setIsTranslationVisible(!isTranslationVisible))
    }

    return (
        <div>
            <AnimatedIcon onClick={onClick}>
                <FontAwesomeIcon icon={isTranslationVisible ? faEyeSlash : faEye}/>
            </AnimatedIcon>
        </div>
    );
};

export default SetVisibility;