import React from 'react';
import Modal from "./modals/Modal";
import styles from "../styles/DefaultModal.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import {useAppSelector} from "../hooks/redux";
import {selectSiteLanguageState} from "../store/slices/siteLanguage";
import {enText, ruText, uaText} from "../utils/instructionInfo";

interface InstructionProps {
    close: Function;
}

const Instruction: React.FC<InstructionProps> = ({close}) => {
    const {selected} = useAppSelector(selectSiteLanguageState);

    enum title {
        ua = 'Інструкція',
        ru = 'Инструкция',
        en = 'Instruction'
    }

    const actualTitle = selected === 'ua' ? title.ua : selected === 'ru' ? title.ru : title.en;

    const text = selected === 'ua' ? uaText : selected === 'ru' ? ruText : enText

    return (
        <Modal>
            <div onClick={e => {e.stopPropagation()}} className={styles.main}>
                <div className={styles.header}>
                    <h2>{actualTitle}</h2>
                    <div className={styles.icon}>
                        <FontAwesomeIcon icon={faXmark} onClick={() => {close()}}/>
                    </div>
                </div>
                <div className={styles.content}>
                    {text.map(({text, ul}, index) => <div key={index}>
                        <h4 key={index + 'h3'}>{text}</h4>
                        <ul key={index + 'ul'}>
                            {ul.map((str, i) => <li key={i}>
                                {str}
                            </li>)}
                        </ul>
                    </div>)}
                </div>
            </div>
        </Modal>
    );
};

export default Instruction;