import {storiesOf} from '@storybook/react-native';
import React from 'react';
import {View, Text} from 'react-native';
// import {Button} from '@react-freyja/core';

storiesOf('Button', module).add('with text', () => (
  <View>
    <Text>button</Text>
  </View>
));
