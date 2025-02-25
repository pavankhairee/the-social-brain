import { ReactElement } from "react";

export interface ButtonProps {
    variant: "primary" | "secondary";
    size: "sm" | "md" | "lg";
    text: string;
    startIcon: ReactElement;
    endIcon: ReactElement;
    onClick?: () => void;
    fullWidth?: boolean;
}

const variantStyle = {
    "primary": "bg-sky-400 text-white",
    "secondary": "bg-blue-600 text-white"
}

const sizeStyle = {
    "sm": "py-1 px-2",
    "md": "py-2 px-4",
    "lg": "py-4 px-6"
}
const defaultStyle = "rounded-md flex font-thin items-center cursor-pointer"

export const Button = (props: ButtonProps) => {
    return <button onClick={props.onClick} className={` ${variantStyle[props.variant]} ${props.fullWidth ? 'w-full flex justify-center items-center' : ''}  ${defaultStyle} ${sizeStyle[props.size]}`}>
        <div className="pr-2">{props.startIcon} </div>{props.text}</button>
}

//<Button variant="primary" size="lg" text="asbd" startIcon="+" endIcon="-" onClick={() => { }} ></Button>