import React from "react";
import { ButtonProps } from "./ButtonProps";

export const Button = ({ color, children }: ButtonProps) => {
    return (
        <div style={{ color: color === "primary" ? "red" : "blue" }}>
            {children}
        </div>
    );
};
