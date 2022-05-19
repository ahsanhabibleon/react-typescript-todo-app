export interface PropTypes {
    title: string;
}

export interface TodoTypes {
    id: number;
    text: string;
    completed: boolean;
}

export interface ModalDataTypes {
    type: string;
    id: number | string | null;
    text?: string;
}