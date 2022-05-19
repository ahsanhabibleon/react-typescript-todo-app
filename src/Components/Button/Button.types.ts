import { ReactNode } from "react";

export interface ButtonPropTypes{
    text: string | ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    primary?: boolean;
    secondary?: boolean;
    danger?: boolean;
    className?: string;
    small?: boolean;
    type?: "button" | "submit" | "reset" | undefined
}