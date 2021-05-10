import React from 'react';
import { Text, Button, View } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Editor')}
        title="Go to editor"
      />
    </View>
  );
}

export default HomeScreen