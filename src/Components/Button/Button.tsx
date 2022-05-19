import { ButtonPropTypes } from "./Button.types"
import './Button.scss'

const Button = ({ text, onClick, disabled, type, className = '', primary, secondary, danger, small = false }: ButtonPropTypes) => {
    return (
        <button
            className={`btn ${primary ? ` btn-primary` : ''}${secondary ? ` btn-secondary` : ''} ${danger ? ` btn-danger` : ''}${small ? `btn-small` : ''} ${className}`}
            onClick={onClick}
            disabled={disabled}
            type={type}>{text}
        </button>
    )
}

export default Button