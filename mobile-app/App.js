import 'react-native-gesture-handler';
import React from 'react';
import Main from './src/components/Main';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      <Main/>
    </NavigationContainer>
  );
};

export default App;