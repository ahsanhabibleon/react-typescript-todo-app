import { createPortal } from "react-dom";

const portalRoot = document.querySelector("body") as HTMLElement;

const Portal: React.FC<any> = ({ children }) => {
    return createPortal(children, portalRoot);
};

export default Portal;