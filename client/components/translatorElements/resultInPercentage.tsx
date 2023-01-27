import React from 'react';
import styles from '../../styles/Translator.module.scss'
import {useAppSelector} from "../../hooks/redux";
import {selectTranslator} from "../../store/slices/translator";

const ResultInPercentage: React.FC = () => {
    const {accuracy} = useAppSelector(selectTranslator)

    return (
        <div className={accuracy < 50 ? styles.wrong : styles.accurate}>
            {accuracy}%
        </div>
    );
};

export default ResultInPercentage;