import {action} from '@storybook/addon-actions';
import {text} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react-native';
import React from 'react';
import {Text} from 'react-native';
import Button from '.';
import CenterView from '../CenterView';

storiesOf('Button', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('with text', () => (
    <Button onPress={action('clicked-text')} title={text('Button text', 'Hello Button')} />
  ))
  .add('with some emoji', () => (
    <Button onPress={action('clicked-emoji')} title="😀 😎 👍 💯" />
  ));
