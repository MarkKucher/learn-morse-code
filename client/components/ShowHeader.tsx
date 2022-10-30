import React from 'react';
import styles from "../styles/ShowHeader.module.scss"
import Image from "next/image";
import bottomArrow from "../assets/bottom-arrow.png";
import {useDispatch} from "react-redux";
import {toggleShowHeader} from "../store/slices/showHeader";

const ShowHeader = () => {
    const dispatch = useDispatch()

    return (
        <div className={styles.main} onClick={() => {dispatch(toggleShowHeader())}}>
            <Image width={32} height={20} src={bottomArrow}/>
        </div>
    );
};

export default ShowHeader;