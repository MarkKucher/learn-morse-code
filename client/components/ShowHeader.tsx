import React, {useRef} from 'react';
import styles from "../styles/ShowHeader.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {selectShowHeader, toggleShowHeader} from "../store/slices/showHeader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import {CSSTransition} from "react-transition-group";

const ShowHeader = () => {
    const dispatch = useDispatch()
    const {showHeader} = useSelector(selectShowHeader)
    const nodeRef = useRef(null)

    return (
        <CSSTransition
            in={showHeader}
            timeout={350}
            classNames={'showHeader'}
            nodeRef={nodeRef}
        >
            <div ref={nodeRef} className={styles.main} onClick={() => {dispatch(toggleShowHeader())}}>
                <FontAwesomeIcon
                    className={showHeader ? styles.arrowUp : styles.arrowDown}
                    icon={faChevronDown}
                />
            </div>
        </CSSTransition>
    );
};

export default ShowHeader;