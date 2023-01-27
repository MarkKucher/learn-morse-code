import React, {useEffect, useState} from 'react';
import Portal from "./Portal";
import styles from "../../styles/Modal.module.scss";
import {useAppDispatch} from "../../hooks/redux";
import {setShouldShowInstruction} from "../../store/slices/instruction";

interface ModalProps {
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({children}) => {

    return (
        <Portal>
            <div className={styles.main}>
                {children}
            </div>
        </Portal>
    );
};

export default Modal;