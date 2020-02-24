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
  const [scaleAnim] = useState(new Animated.Value(0));
  const [fadeAnim] = useState(new Animated.Value(0));
  const [showMore, setShowMore] = useState(false);

  const slideAnimate = () => {
    if (!showMore) {
      setShowMore(true);
      Animated.timing(
        scaleAnim,
        {
          toValue: 1,
          duration: 300,
          useNativeDriver: true
        }
      ).start();
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 300,
          useNativeDriver: true
        }
      ).start();
    } else {
      Animated.timing(
        scaleAnim,
        {
          toValue: 0,
          duration: 80,
          useNativeDriver: true
        }
      ).start();
      Animated.timing(
        fadeAnim,
        {
          toValue: 0,
          duration: 80,
          useNativeDriver: true
        }
      ).start(() => {
        setShowMore(false);
      });
    }
  }

  return(
    <View style={{...styles.tableItemStyle, backgroundColor: index%2 !== 0 ? '#EEEEEE' : 'white'}}>
      <TouchableOpacity onPress={() => slideAnimate()} activeOpacity={0.6} style={{padding: 5, flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Entypo style={{marginRight: 5, color: item.type === 'buy' ? 'green' : 'red'}} size={20} name={`arrow-long-${item.type === 'buy' ? 'right' : 'left'}`} />
          <View>
            <Text style={{fontSize: 20}}>{item.fromCurr}/{item.toCurr}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text>{item.date}</Text>
              <Text style={{borderWidth: 1, marginLeft: 4, borderRadius: 4, paddingLeft: 4, paddingRight: 2, color: item.status === 'Executed' ? 'green' : (item.status === 'Pending' ? 'darkorange' : 'red'), borderColor: item.status === 'Executed' ? 'green' : (item.status === 'Pending' ? 'darkorange' : 'red')}}>{item.status}</Text>
            </View>
          </View>
        </View>
        <View style={{alignItems: 'center', flexDirection: 'row', marginRight: 5}}>
          <Text style={{marginRight: 5, fontSize: 22}}>{item.amount}</Text>
          <Entypo size={22} name={`chevron-small-${showMore ? 'up' : 'down'}`} />
        </View>
      </TouchableOpacity>
      {showMore && <Animated.View style={{...styles.moreStyle, borderTopColor: index%2 === 0 ? '#EDEDED' : '#DDD', opacity: fadeAnim, transform: [{scaleY: scaleAnim}]}}>
        <Text>Transaction ID: {item.orderId}</Text>
        <Text>From Account: {item.fromAccount}</Text>
        <Text>To Account: {item.toAccount}</Text>
      </Animated.View>}
    </View>
  );
}

const styles = StyleSheet.create({
  tableItemStyle: {
    height: 'auto',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: 'orange',
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
