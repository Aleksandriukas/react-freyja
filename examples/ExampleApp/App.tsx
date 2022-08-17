import {Button} from '@react-freyja/core';
// import {extendMaterialTheme} from '@react-freyja/material';
// import {ThemeContextProvider} from '@react-freyja/theme';
import React from 'react';
import {View, Text} from 'react-native';

// const materialTheme = extendMaterialTheme();

const App = () => {
    return (
        // <ThemeContextProvider theme={materialTheme}>
            <View>
                {/* <Button color="primary" variant="text" /> */}
                <Text>hello</Text>
            </View>
        // </ThemeContextProvider>
    );
};

export default App;
