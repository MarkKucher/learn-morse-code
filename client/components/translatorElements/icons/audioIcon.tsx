import React, {useState} from 'react';
import {useAppSelector} from "../../../hooks/redux";
import {selectTranslator} from "../../../store/slices/translator";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import AnimatedIcon from "../../icons/animatedIcon";

const AudioIcon = () => {
    const {translation} = useAppSelector(selectTranslator)
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const text = translation.map(obj => obj.value).join()

    const audio = new Audio()
    audio.insertAdjacentText('afterbegin', text)

    const clickHandler = () => {
        console.log(audio)
        setIsPlaying(!isPlaying)
        isPlaying ? audio.pause() : audio.play()
    }

    if(audio.ended) {
        setIsPlaying(false)
    }

    return (
        <div>
            <AnimatedIcon onClick={clickHandler}>
                <FontAwesomeIcon icon={faPlay}/>
            </AnimatedIcon>
        </div>
    );
};

export default AudioIcon;