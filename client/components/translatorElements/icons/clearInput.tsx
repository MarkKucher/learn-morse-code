import React from 'react';
import AnimatedIcon from "../../icons/animatedIcon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import {useAppDispatch} from "../../../hooks/redux";

interface ClearInputProps {
    isArrayConsistOfString: boolean;
    setText?: Function;
    setTranslation?: Function;
}

const ClearInput: React.FC<ClearInputProps> = ({setText, setTranslation, isArrayConsistOfString}) => {
    const dispatch = useAppDispatch()

    const onClick = () => {
        setText && dispatch(setText(isArrayConsistOfString ? ['|'] : [{value: '|'}]))
        setTranslation && dispatch(setTranslation([]))
    }


    return (
        <div>
            <AnimatedIcon onClick={onClick}>
                <FontAwesomeIcon icon={faXmark}/>
            </AnimatedIcon>
        </div>
    );
};

export default ClearInput;