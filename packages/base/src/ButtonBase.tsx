import React, { PropsWithChildren } from "react";

export type ButtonBaseProps<TProps> = PropsWithChildren<{
    Root: React.ElementType;
    props: TProps;
}>;

export const ButtonBase = <TProps,>({
    children,
    Root,
    props,
}: ButtonBaseProps<TProps>) => {
    return <Root {...props}>{children}</Root>;
};
