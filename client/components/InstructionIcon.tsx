import React, {useState} from 'react';
import styles from '../styles/DefaultIcon.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faBookBookmark } from "@fortawesome/free-solid-svg-icons";
import Instruction from "./Instruction";

const InstructionIcon = () => {
    const [shouldShowModal, setShouldShowModal] = useState(false)

    const onClick = () => {
        setShouldShowModal(true)
    }

    const close = () => {
        setShouldShowModal(false)
    }

    return (
        <div className={styles.icon} onClick={onClick}>
            <FontAwesomeIcon icon={faBookBookmark}/>
            {shouldShowModal && <Instruction close={close}/>}
        </div>
    );
};

export default InstructionIcon;