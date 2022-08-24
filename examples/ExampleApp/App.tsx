import {materialTheme} from '@react-freyja/material';
import {
    RNStyleEngine,
    ExecutedThemeComponents,
    Modifiers,
} from '@react-freyja/style-engine';
import {ThemeContextProvider} from '@react-freyja/theme';
import React from 'react';
import {View} from 'react-native';
import {Button} from './src/Button';

const engine = new RNStyleEngine();
export const getComponentStyles = engine.compile(
    // TODO fix type
    materialTheme as unknown as ExecutedThemeComponents<Modifiers>,
);

const App = () => {
    return (
        <ThemeContextProvider theme={materialTheme}>
            <View>
                <Button color="primary" variant="text" />
            </View>
        </ThemeContextProvider>
    );
};

export default App;
