import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import styles from "../styles/Header.module.scss";
import SiteLanguage from "./language/SiteLanguage";
import ShowHeader from "./ShowHeader";
import {useDispatch, useSelector} from "react-redux";
import {selectShowHeader, toggleShowHeader} from "../store/slices/showHeader";
import {CSSTransition} from "react-transition-group";
import TypingTypeIcon from "./typingTypeIcon";
import InstructionIcon from "./InstructionIcon";
import MorseCodeIcon from "./MorseCodeIcon";

const Header = () => {
    const {showHeader} = useSelector(selectShowHeader)
    const nodeRef = useRef(null)

    return (
        <div className={styles.main}>
            <CSSTransition
                in={showHeader}
                nodeRef={nodeRef}
                timeout={350}
                mountOnEnter
                unmountOnExit
                classNames={'header'}
            >
                <div
                    ref={nodeRef}
                    className={'header'}>
                    <div className={styles.leftIcons}>
                        <TypingTypeIcon/>
                        <InstructionIcon/>
                        <MorseCodeIcon/>
                    </div>
                    <SiteLanguage/>
                </div>
            </CSSTransition>
            <ShowHeader/>
        </div>
    );
};
export default memo(Header);