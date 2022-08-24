import {materialTheme} from '@react-freyja/material';
import {
    RNStyleEngine,
    ExecutedThemeComponents,
    Modifiers,
} from '@react-freyja/style-engine';
import React, {useState} from 'react';
import {View} from 'react-native';
import {Button} from './src/Button';

const engine = new RNStyleEngine();
export const getComponentStyles = engine.compile(
    // TODO fix type
    materialTheme as unknown as ExecutedThemeComponents<Modifiers>,
);

const App = () => {
    const [color, setColor] = useState<'primary' | 'secondary'>('primary');

    return (
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
    );
};

export default App;
