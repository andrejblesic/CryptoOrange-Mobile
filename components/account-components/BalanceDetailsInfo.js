import React, { useState } from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  Text,
  Animated,
  StyleSheet,
  TextInput
} from 'react-native';
import { Entypo } from '@expo/vector-icons';

const BTC = require('../../assets/images/BTC.png');
const ETH = require('../../assets/images/ETH.png');
const LTC = require('../../assets/images/LTC.png');
const DASH = require('../../assets/images/DASH.png');
const XRP = require('../../assets/images/XRP.png');
const ZEC = require('../../assets/images/ZEC.png');
const XMR = require('../../assets/images/XMR.png');
const BCH = require('../../assets/images/BCH.png');
const USD = require('../../assets/images/USD.png');
const EUR = require('../../assets/images/EUR.png');

export default function BalanceDetailsInfo({navigation}) {
  const [showInput, setShowInput] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(0));
  const [fadeAnim] = useState(new Animated.Value(0));

  const slideAnimate = () => {
    if (!showInput) {
      setShowInput(true);
      Animated.timing(
        scaleAnim,
        {
          toValue: 1,
          duration: 200,
          useNativeDriver: true
        }
      ).start();
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 200,
          useNativeDriver: true
        }
      ).start();
    } else {
      Animated.timing(
        scaleAnim,
        {
          toValue: 0,
          duration: 100,
          useNativeDriver: true
        }
      ).start();
      Animated.timing(
        fadeAnim,
        {
          toValue: 0,
          duration: 100,
          useNativeDriver: true
        }
      ).start(() => {
        setShowInput(false);
      });
    }
  }

  return(
    <TouchableOpacity activeOpacity={0.6} onPress={() => slideAnimate()} style={styles.balanceStyle}>
      <View style={styles.headingStyle}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image style={styles.iconStyle} source={eval(navigation.state.params.currency)}/>
          <View>
            <Text style={styles.currencyInfoStyle}>{navigation.state.params.currency} ({navigation.state.params.fullName}) Balance:</Text>
            <Text style={styles.currencyAmountStyle}>{navigation.state.params.amount}</Text>
          </View>
        </View>
        <Entypo size={22} name={`chevron-small-${showInput ? 'up' : 'down'}`} />
      </View>
      {showInput && <Animated.View style={{flexDirection: 'row', opacity: fadeAnim, transform:[{scaleY: scaleAnim}]}}>
        <TextInput placeholder='Wallet address' style={styles.inputStyle}></TextInput>
        <TouchableOpacity style={styles.saveStyle}>
          <Text style={{color: '#EEEEEE'}}>Save</Text>
        </TouchableOpacity>
      </Animated.View>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  balanceStyle: {
    marginTop: 5,
    padding: 5,
    borderRadius: 5,
    width: '98%',
    borderWidth: 1,
    borderColor: 'orange'
  },
  currencyInfoStyle: {
    fontSize: 20,
  },
  currencyAmountStyle: {
    fontSize: 24,
  },
  headingStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconStyle: {
    height: 50,
    width: 50,
    marginRight: 5,
  },
  inputStyle: {
    marginTop: 12,
    height: 40,
    flex: 1,
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 4,
    paddingLeft: 8
  },
  saveStyle: {
    marginTop: 12,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
    height: 40,
    marginLeft: 5,
    borderRadius: 4
  },
})
