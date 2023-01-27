import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from "../styles/DefaultIcon.module.scss";
import { faTable } from "@fortawesome/free-solid-svg-icons";
import MorseCodeTable from "./MorseCodeTable";

const MorseCodeIcon = () => {
    const [shouldShowModal, setShouldShowModal] = useState<boolean>(false)

    const show = () => {
        setShouldShowModal(true)
    }

    const close = () => {

        setShouldShowModal(false)
    }

    return (
        <div className={styles.icon} onClick={show}>
            <FontAwesomeIcon icon={faTable}/>
            {shouldShowModal && <MorseCodeTable close={close}/>}
        </div>
    );
};

export default MorseCodeIcon;