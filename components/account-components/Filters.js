import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  TextInput
} from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import ModalSelector from 'react-native-modal-selector';

export default function Filters({sortTransactions}) {
  const [showFilters, setShowFilters] = useState(false);
  const [expandAnim] = useState(new Animated.Value(100));
  const [rotateAnim] = useState(new Animated.Value(0));
  const [selectedFilter, setSelectedFilter] = useState('Name')

  const expandFilters = () => {
    if (!showFilters) {
      setShowFilters(true);
      Animated.timing(
        expandAnim,
        {
          toValue: 110,
          duration: 150,
        }
      ).start();
      Animated.timing(
        rotateAnim,
        {
          toValue: 1,
          duration: 150,
        }
      ).start();
    } else {
      Animated.timing(
        rotateAnim,
        {
          toValue: 0,
          duration: 150,
        }
      ).start();
      Animated.timing(
        expandAnim,
        {
          toValue: 100,
          duration: 150,
        }
      ).start(() => {
        setShowFilters(false);
      });
    }
  }

  const handleSortSelectorChange = (value) => {
    setSelectedFilter(value.key);
    sortTransactions(value);
  }

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  });

  const selectorData = [
    { key: 'Name', label: 'Name' },
    { key: 'Amount', label: 'Amount' },
    { key: 'Date', label: 'Date' },
  ];

  return(
    <View style={styles.containerStyle}>
      <TouchableOpacity onPress={() => expandFilters()} style={styles.headingStyle}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <FontAwesome style={styles.iconStyle} name='filter' size={28} color='orange'/>
          <Text style={{fontSize: 18}}>Filters & Sorting</Text>
        </View>
        <Animated.View style={{transform: [{rotate: spin}]}}>
          <Entypo size={22} name='chevron-small-down' />
        </Animated.View>
      </TouchableOpacity>
      <Animated.View style={{height: expandAnim, overflow: 'hidden'}}>
        <View style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
          <Text style={{fontSize: 20}}>Sort by</Text>
          <ModalSelector
            data={selectorData}
            supportedOrientations={['portrait']}
            accessible={true}
            backdropPressToClose={true}
            scrollViewAccessibilityLabel={'Scrollable options'}
            cancelButtonAccessibilityLabel={'Cancel Button'}
            optionStyle={{height: 50, alignItems: 'center', justifyContent: 'center'}}
            optionTextStyle={{color: '#333', fontSize: 24}}
            cancelTextStyle={{textTransform: 'capitalize', fontSize: 20}}
            onChange={(option) => {handleSortSelectorChange(option)}}
            cancelStyle={{height: 50, justifyContent: 'center', alignItems: 'center'}}
          >
            <TextInput
              maxFontSizeMultiplier={1}
              style={{...styles.selectorInputStyle}}
              editable={false}
              value={`${selectedFilter} ▾`}
            />
          </ModalSelector>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    width: '98%',
    marginTop: 10,
    borderColor: 'orange',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5
  },
  headingStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconStyle: {
    marginLeft: 5,
    marginRight: 5
  },
  selectorInputStyle: {
    borderWidth: 1,
    borderColor:'orange',
    fontSize: 20,
    borderRadius: 4,
    paddingLeft: 8,
    paddingRight: 8,
    marginLeft: 5,
    marginTop: -2
  },
});
