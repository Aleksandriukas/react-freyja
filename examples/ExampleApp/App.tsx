import {materialTheme} from '@react-freyja/material';
import {RNStyleEngine} from '@react-freyja/style-engine';
import React, {useState} from 'react';
import {View} from 'react-native';
import {Button} from './src/Button';

const engine = new RNStyleEngine();
export const getComponentStyles = engine.compile(materialTheme);

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
