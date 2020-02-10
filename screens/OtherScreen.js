import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';

export default function OtherScreen() {
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
  return(
    <View style={styles.container}>
      <Text>OTHER SCREEN</Text>
    </View>
  );
}

// OtherScreen.navigationOptions = {
//   headerTitle: () => <Header />,
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    backgroundColor: '#fff',
  }
})
