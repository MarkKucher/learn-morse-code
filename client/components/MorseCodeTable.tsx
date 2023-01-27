import React from 'react';
import Modal from "./modals/Modal";
import {useAppSelector} from "../hooks/redux";
import {selectSiteLanguageState} from "../store/slices/siteLanguage";
import styles from "../styles/DefaultModal.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import {selectTranslator} from "../store/slices/translator";

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
                <div className={styles.contentCentered}>
                    <div className={styles.table}>
                        {Object.keys(translationRelationships).map((key, index) => <div>
                            <div key={key}>{key}</div>
                            <div key={key + 'hyphen'}>-</div>
                            <div key={key + 'translation'}>{translationRelationships[key]}</div>
                        </div>)}
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default MorseCodeTable;