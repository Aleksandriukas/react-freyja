import {materialTheme} from '@react-freyja/material';
import {RNStyleEngine} from '@react-freyja/style-engine';
import {ThemeContextProvider} from '@react-freyja/theme-context';
import React, {useState} from 'react';
import {View} from 'react-native';
import {Button} from './src/Button';

const engine = new RNStyleEngine();
const getComponentStyles = engine.compile(materialTheme);

const App = () => {
    const [color, setColor] = useState<'primary' | 'secondary'>('primary');

    return (
        <ThemeContextProvider value={getComponentStyles}>
            <View>
                <Button
                    color={color}
                    onPress={() => {
                        setColor(old =>
                            old === 'primary' ? 'secondary' : 'primary',
                        );
                    }}
                />
            </View>
        </ThemeContextProvider>
    );
};

export default App;
