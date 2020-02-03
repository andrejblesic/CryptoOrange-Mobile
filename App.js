import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Button, Platform, StatusBar, StyleSheet, View, SafeAreaView, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppStatusBar from './components/AppStatusBar';

import AppNavigator from './navigation/AppNavigator';

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else if (loggedIn) {
    return (
      <View style={styles.container}>
        <AppNavigator />
      </View>
    );
  } else if (!loggedIn) {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', height: '100%'}}>
        <Button style={{paddingTop: 200}} title="Log in" onPress={() => setLoggedIn(true)}/>
      </View>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      'fontello-icons': require('./assets/fonts/tabicon.ttf'),
      'icomoon': require('./assets/fonts/icomoon.ttf'),
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
