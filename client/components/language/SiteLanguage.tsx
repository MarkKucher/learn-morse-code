import React, {useRef, useState} from 'react';
import styles from "../../styles/SiteLanguage.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {selectedLanguageType, selectSiteLanguage, selectSiteLanguageState} from "../../store/slices/siteLanguage";
import {CSSTransition} from "react-transition-group";

const SiteLanguage = () => {
    const {selected, languages} = useSelector(selectSiteLanguageState);
    const dispatch = useDispatch();
    const [showList, setShowList] = useState<boolean>(false);
    const nodeRef = useRef(null);
    const siteLanguageRef = useRef(null);

    const selectedIconClickHandler = () => {
        if(window.innerWidth > 500) {
            setShowList(!showList)
        } else {
            dispatch(selectSiteLanguage(selected === 'ua' ? 'ru' : selected === 'ru' ? 'en' : 'ua'))
        }
    }

    const selectIcon = (l: selectedLanguageType) => {
        return () => {
            dispatch(selectSiteLanguage(l))
            setTimeout(() => {
                selectedIconClickHandler()
            }, 100)
        }
    }

    return (
        <div className={styles.main}>
            <CSSTransition
                in={showList}
                timeout={395}
                classNames={'siteLanguage'}
                nodeRef={siteLanguageRef}
            >
                <div className={styles.icon} ref={siteLanguageRef} onClick={selectedIconClickHandler}>
                    {selected.toUpperCase()}
                </div>
            </CSSTransition>
            <CSSTransition
                in={showList}
                mountOnEnter
                unmountOnExit
                timeout={350}
                nodeRef={nodeRef}
                classNames={'offeredLanguages'}
            >
                <div ref={nodeRef} className={'offeredLanguages'}>
                    {languages.filter(l => l != selected).map((l) => <div key={l} onClick={selectIcon(l)} className={styles.icon}>{l.toUpperCase()}</div>)}
                </div>
            </CSSTransition>
        </div>
    );
};

export default SiteLanguage;