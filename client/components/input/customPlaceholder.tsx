import React from 'react';
import styles from '../../styles/CustomPlaceholder.module.scss';

interface CustomPlaceholderProps {
    text: string;
    onClick?: Function
}

const CustomPlaceholder: React.FC<CustomPlaceholderProps> = ({text, onClick}) => {
    return (
        <div className={styles.main} onClick={onClick ? () => {onClick()} : undefined}>
            {text}
        </div>
    );
};

export default CustomPlaceholder;