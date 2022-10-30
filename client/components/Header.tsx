import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import styles from "../styles/Header.module.scss";
import LanguageIcon from "./LanguageIcon";
import ShowHeader from "./ShowHeader";
import {useDispatch, useSelector} from "react-redux";
import {selectShowHeader, toggleShowHeader} from "../store/slices/showHeader";
import {CSSTransition} from "react-transition-group";

const Header = () => {
    const {showHeader} = useSelector(selectShowHeader)
    const nodeRef = useRef(null)

    return (
        <div className={styles.main}>
            <CSSTransition
                in={showHeader}
                nodeRef={nodeRef}
                timeout={300}
                mountOnEnter
                unmountOnExit
            >
                <div
                    ref={nodeRef}
                    className={'header'}>
                    <LanguageIcon language={'EN'}/>
                </div>
            </CSSTransition>
            <ShowHeader/>
        </div>
    );
};
export default memo(Header);