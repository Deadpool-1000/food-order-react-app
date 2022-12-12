import React from "react";
import styles from './Modal.module.css';
import  ReactDOM  from "react-dom";
const BackDrop = props => {
    return <div className={styles.backdrop} onClick={props.closeHandler}/>
}

const ModalOverlay = props => {
    return <div className={styles.modal}>
        <div className={styles.content}>{props.children}</div>
    </div>
}

const portalElement = document.getElementById('overlay');
const Modal = props => {
    return <React.Fragment>
        {ReactDOM.createPortal(<BackDrop closeHandler={props.closeHandler} />,portalElement)}
        {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,portalElement)}
    </React.Fragment>
}

export default Modal;