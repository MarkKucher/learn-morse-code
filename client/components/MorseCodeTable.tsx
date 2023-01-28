import React from 'react';
import Modal from "./modals/Modal";
import {useAppSelector} from "../hooks/redux";
import {selectSiteLanguageState} from "../store/slices/siteLanguage";
import styles from "../styles/DefaultModal.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import {selectTranslator} from "../store/slices/translator";
import {getObjectValuesTypeFriendly} from "../adjuvant/getKeyValueTypeFriendly";

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
                        {getObjectValuesTypeFriendly(translationRelationships).map((value, index) => <div key={value}>
                            <div>{Object.keys(translationRelationships)[index]}</div>
                            <div>-</div>
                            <div>{value}</div>
                        </div>)}
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default MorseCodeTable;