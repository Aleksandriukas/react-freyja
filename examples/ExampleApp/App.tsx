import {Button} from '@react-freyja/core';
import {materialTheme} from '@react-freyja/material';
import {ThemeContextProvider} from '@react-freyja/theme';
import React from 'react';
import {Text, View} from 'react-native';

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
