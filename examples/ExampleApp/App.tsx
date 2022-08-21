import {materialTheme} from '@react-freyja/material';
import {ThemeContextProvider} from '@react-freyja/theme';
import React from 'react';
import {View} from 'react-native';
import {Button} from './src/Button';

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
