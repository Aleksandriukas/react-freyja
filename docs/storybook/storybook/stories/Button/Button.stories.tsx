import React from 'react';
import {storiesOf} from '@storybook/react-native';

import {Button} from '.';
import {ThemeContextProvider} from '.';
import CenterView from '../CenterView';

storiesOf('Button', module)
  .addDecorator(getStory => (
    <ThemeContextProvider>
      <CenterView>{getStory()}</CenterView>
    </ThemeContextProvider>
  ))
  .add('with text', () => <Button />)
  .add('with some emoji', () => <Button />);
