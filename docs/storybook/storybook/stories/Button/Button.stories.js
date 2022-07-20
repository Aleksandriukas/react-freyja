import {storiesOf} from '@storybook/react-native';
import React from 'react';
import {Button} from '@react-freyja/core';
import {ThemeContextProvider} from '@react-freyja/theme';
import {materialTheme} from '@react-freyja/material';

storiesOf('Button', module)
  .addDecorator(story => (
    <ThemeContextProvider theme={materialTheme}>{story()}</ThemeContextProvider>
  ))
  .add('with text', () => <Button />);
