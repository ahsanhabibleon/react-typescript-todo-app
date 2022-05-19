import Portal from "../Portal"
import { PropTypes } from "./Modal.types"
import './Modal.scss'

const Modal = ({ children, className = '', onClose = () => { } }: PropTypes) => {

    const onCloseHandler = (event: any) => {
        if (event.currentTarget === event.target) {
            onClose();
        }
    }

    return <Portal>
        <div className={`modal ${className}`} onClick={onCloseHandler}>
            <div className="modal-body">
                <span className="close" onClick={onClose}><i className="fa-solid fa-xmark"></i></span>
                {children}
            </div>
        </div>
    </Portal>
}

export default Modal