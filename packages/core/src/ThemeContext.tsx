import { transform } from '@babel/core';
import { createContext } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { primary } from './Color';
import { createSafeContext, useSafeContext } from '@sirse-dev/safe-context';
import { ThemeOptions } from './theme';

export const ThemeContext = createSafeContext<ThemeOptions>();
