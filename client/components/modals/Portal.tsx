import React, {useEffect, useState} from 'react';
import ReactDOM from "react-dom";

interface PortalProps {
    children: React.ReactNode
}

const Portal: React.FC<PortalProps> = ({children}) => {
    const [container] = useState(() => document.createElement('div'));
    const body = document.querySelector('body');
    useEffect(() => {
        body && body.appendChild(container)
        return () => {
            body && body.removeChild(container)
        }
    }, [])
    return ReactDOM.createPortal(children, container)
};

export default Portal;