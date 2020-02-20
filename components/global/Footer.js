import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import CustomIcon from './CustomIcons';
import { SimpleLineIcons, Entypo } from '@expo/vector-icons';
import { useFocusEffect } from 'react-navigation';

export default function Footer({navigation}) {

  const [focusedTab, setFocusedTab] = useState('Trading');

  const handleTabPress = (routeName) => {
    navigation.navigate({routeName: `${routeName}Stack`});
    setFocusedTab(routeName);
  }

  return(
    <View style={styles.containerStyle}>
      <TouchableOpacity  onPress={() => handleTabPress('Trading')} style={styles.tabStyle} >
        <CustomIcon
          size={28}
          name='trading'
          color={focusedTab === 'Trading' ? 'orange' : 'grey'}
        />
        <Text style={{...styles.textStyle, color: focusedTab === 'Trading' ? 'orange' : 'grey'}}>Trading</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleTabPress('Lending')} style={styles.tabStyle} >
        <CustomIcon
          size={28}
          name='lending'
          color={focusedTab === 'Lending' ? 'orange' : 'grey'}
        />
        <Text style={{...styles.textStyle, color: focusedTab === 'Lending' ? 'orange' : 'grey'}}>Lending</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleTabPress('Finance')} style={styles.tabStyle} >
        <CustomIcon
          size={28}
          name='finance'
          color={focusedTab === 'Finance' ? 'orange' : 'grey'}
        />
        <Text style={{...styles.textStyle, color: focusedTab === 'Finance' ? 'orange' : 'grey'}}>Finance</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleTabPress('AccountBalances')} style={styles.tabStyle} >
        <CustomIcon
          size={28}
          name='user'
          color={focusedTab === 'AccountBalances' ? 'orange' : 'grey'}
        />
        <Text style={{...styles.textStyle, color: focusedTab === 'AccountBalances' ? 'orange' : 'grey'}}>Account</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleTabPress('More')} style={styles.tabStyle} >
         <CustomIcon
          size={28}
          name='more'
          color={focusedTab === 'More' ? 'orange' : 'grey'}
        />
        <Text style={{...styles.textStyle, color: focusedTab === 'More' ? 'orange' : 'grey'}}>More</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 50,
    width: '100%',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: 'rgb(230, 230, 230)'
  },
  tabStyle: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    fontSize: 12
  }
})
