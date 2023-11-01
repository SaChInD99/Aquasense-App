import React from 'react';
import { View, Text } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { theme } from '../core/theme';

const ProgressIndicator = ({ isLoading }) => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ActivityIndicator
        animating={isLoading}
        size={'large'}
        color={theme.colors.primary}
      />
    </View>
  );
};

export default ProgressIndicator;
