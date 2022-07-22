import {Button} from '@react-freyja/core';
import {materialTheme} from '@react-freyja/material';
import {ThemeContextProvider} from '@react-freyja/theme';
import {storiesOf} from '@storybook/react-native';
import React from 'react';

storiesOf('Button', module)
    .addDecorator(story => (
        <ThemeContextProvider theme={materialTheme}>
            {story()}
        </ThemeContextProvider>
    ))
    .add('with text', () => <Button />);
