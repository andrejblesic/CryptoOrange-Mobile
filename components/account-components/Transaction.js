import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated
} from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default function Transaction({item, index}) {
  const [showMore, setShowMore] = useState(false);
  const [expandAnim] = useState(new Animated.Value(60));
  const [rotateAnim] = useState(new Animated.Value(0));

  const slideAnimate = () => {
    if (!showMore) {
      setShowMore(true);
      Animated.timing(
        rotateAnim,
        {
          toValue: 1,
          duration: 150,
          useNativeDriver: true
        }
      ).start();
      Animated.timing(
        expandAnim,
        {
          toValue: 130,
          duration: 150,
        }
      ).start();
    } else {
      Animated.timing(
        rotateAnim,
        {
          toValue: 0,
          duration: 150,
          useNativeDriver: true
        }
      ).start();
      Animated.timing(
        expandAnim,
        {
          toValue: 60,
          duration: 150,
        }
      ).start(() => {
        setShowMore(false);
      });
    }
  }

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  });

  return(
    <Animated.View style={{...styles.tableItemStyle, height: expandAnim, backgroundColor: index%2 !== 0 ? '#EEEEEE' : 'white'}}>
      <TouchableOpacity onPress={() => slideAnimate()} activeOpacity={0.6} style={{padding: 5, flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Entypo style={{marginRight: 5, color: item.direction === 'in' ? 'green' : 'red'}} size={20} name={`arrow-long-${item.direction === 'in' ? 'right' : 'left'}`} />
          <View>
            <Text style={{fontSize: 20}}>{item.type.title}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text>{item.created_at}</Text>
              {/* <Text style={{borderWidth: 1, marginLeft: 4, borderRadius: 4, paddingLeft: 4, paddingRight: 2, color: item.status === 'Executed' ? 'green' : (item.status === 'Pending' ? 'darkorange' : 'red'), borderColor: item.status === 'Executed' ? 'green' : (item.status === 'Pending' ? 'darkorange' : 'red')}}>{item.status}</Text>*/ }
            </View>
          </View>
        </View>
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          <Text style={{marginRight: 5, fontSize: 22}}>{item.amount}</Text>
          <Animated.View style={{transform: [{rotate: spin}]}}>
            <Entypo size={22} name='chevron-small-down' />
          </Animated.View>
        </View>
      </TouchableOpacity>
      <View style={{...styles.moreStyle, borderTopColor: index%2 === 0 ? '#EDEDED' : '#DDD'}}>
        <Text>Transaction ID: {item.id}</Text>
        <Text>From Account: {item.from_account_model ? item.from_account_model.description : 'Crypto Orange Platform'}</Text>
        <Text>To Account: {item.to_account_model ? item.to_account_model.description : 'Crypto Orange Platform'}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  tableItemStyle: {
    height: 'auto',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moreStyle: {
    width: '100%',
    marginTop: 5,
    padding: 5,
    borderTopWidth: 1,
    borderStyle: 'dotted',
  }
})
