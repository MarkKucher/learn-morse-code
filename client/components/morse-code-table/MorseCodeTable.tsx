import React, {useState} from 'react';
import Modal from "../modals/Modal";
import {useAppSelector} from "../../hooks/redux";
import {selectSiteLanguageState} from "../../store/slices/siteLanguage";
import styles from "../../styles/DefaultModal.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import {selectTranslator} from "../../store/slices/translator";
import {getObjectValuesTypeFriendly} from "../../adjuvant/getKeyValueTypeFriendly";
import MorseCodeContent from "./MorseCodeContent";

interface MorseCodeTableProps {
    close: Function;
}

const MorseCodeTable: React.FC<MorseCodeTableProps> = ({close}) => {
    const {selected} = useAppSelector(selectSiteLanguageState);
    const {translationRelationships} = useAppSelector(selectTranslator)

    const title = selected === 'ua' ? 'Азбука Морзе' : selected === 'ru' ? 'Азбука Морзе' : 'Morse code'

    return (
        <Modal>
            <div className={styles.main} onClick={e => {e.stopPropagation()}}>
                <div className={styles.header}>
                    <h2>{title}</h2>
                    <div className={styles.icon} onClick={() => {close()}}>
                        <FontAwesomeIcon icon={faXmark}/>
                    </div>
                </div>
                <MorseCodeContent/>
            </div>
        </Modal>
    );
};

export default MorseCodeTable;