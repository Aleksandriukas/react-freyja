import React from 'react';

export type ButtonProps = {
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
} & SharedButtonProps;

export type SharedButtonProps = {
    variant: 'underlined' | 'standard';
};
