import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {DataProvider} from '../Context';
import Home from './navigation/Home';

const App = () => {
  return (
    <DataProvider>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Home />
      </SafeAreaView>
    </DataProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
