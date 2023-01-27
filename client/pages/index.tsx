import React, {useEffect, useRef, useState} from 'react';
import styles from "../styles/Home.module.scss";
import MainLayout from "../components/MainLayout";
import {specialSymbolsMorse} from "../utils/morse-code-special-symbols";
import {specialCharactersMorse} from "../utils/morse-code-special-characters";
import {noMorse} from "../utils/morse-code-no";
import {useCheckAffiliation} from "../adjuvant/checkAffiliation";
import {getValueByKey} from "../adjuvant/getValueByKey";
import {useSelector} from "react-redux";
import {selectSiteLanguageState} from "../store/slices/siteLanguage";
import {uaMorse} from "../utils/morse-code-ua";
import {MorseCodeLanguage} from "../utils/morse-code-language";
import Translator from "../components/translatorElements/translator";

const Index: React.FC = () => {

    return (
        <MainLayout>
            <Translator/>
        </MainLayout>
    );
};

export default Index;