import { Button } from "@react-freyja/material";
import React, { useState } from "react";

export const App = () => {
    const [color, setColor] = useState<"primary" | "secondary">("primary");

    return (
        <div>
            <Button
                color={color}
                onClick={() => {
                    setColor((old) =>
                        old === "primary" ? "secondary" : "primary"
                    );
                }}
            >
                hello
            </Button>
        </div>
    );
};
