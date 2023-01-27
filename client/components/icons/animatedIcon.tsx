import React from "react";
import styles from "../../styles/AnimatedIcon.module.scss";

interface AnimatedIcon {
    children: React.ReactNode;
    onClick?: Function;
    bigger?: boolean;
}

const AnimatedIcon: React.FC<AnimatedIcon> = ({ children, onClick,bigger }) => {
    const createRipple = (event) => {
        event.stopPropagation()
        onClick && onClick()
        const button = event.currentTarget;

        const circle = document.createElement("span");
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add("ripple");

        const ripple = button.getElementsByClassName("ripple")[0];

        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);
    }

    return <div className={bigger ? styles.bigger : styles.main} onClick={createRipple}>{children}</div>;
};

export default AnimatedIcon;