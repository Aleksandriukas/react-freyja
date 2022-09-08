import {
    materialTheme,
    Button,
    ThemeContextProvider,
} from '@react-freyja/material';
import {RNStyleEngine} from '@react-freyja/style-engine';
import React, {useState} from 'react';
import {Text, View} from 'react-native';

const engine = new RNStyleEngine();
const getComponentStyles = engine.compile(materialTheme);

const App = () => {
    const [color, setColor] = useState<'primary' | 'secondary'>('primary');

    return (
        <ThemeContextProvider value={getComponentStyles}>
            <View>
                <Button
                    color={color}
                    onClick={() => {
                        setColor(old =>
                            old === 'primary' ? 'secondary' : 'primary',
                        );
                    }}>
                    <Text>asdf</Text>
                </Button>
            </View>
        </ThemeContextProvider>
    );
};

export default App;
