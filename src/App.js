import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {DataProvider} from '../Context';
import Home from './navigation/Home';

const App = () => {
  return (
    <DataProvider>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        <Home />
      </SafeAreaView>
    </DataProvider>
  );
};

export default App;
