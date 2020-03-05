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

export default function Filters({sortTransactions, filterTransactionsByType, filterTransactionsByStatus}) {
  const [showFilters, setShowFilters] = useState(false);
  const [expandAnim] = useState(new Animated.Value(0));
  const [rotateAnim] = useState(new Animated.Value(0));
  const [selectedTypeFilter, setSelectedTypeFilter] = useState('All');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');
  const [selectedSorting, setSelectedSorting] = useState('Amount (Desc.)');

  const expandFilters = () => {
    if (!showFilters) {
      setShowFilters(true);
      Animated.timing(
        expandAnim,
        {
          toValue: 180,
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
          toValue: 0,
          duration: 150,
        }
      ).start(() => {
        setShowFilters(false);
      });
    }
  }

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  });

  // const selectorData = [
  //   { key: 'Amount (Desc.)', label: 'Amount (Desc.)' },
  //   { key: 'Amount (Asc.)', label: 'Amount (Asc.)' },
  //   { key: 'Name (Desc.)', label: 'Name (Desc.)' },
  //   { key: 'Name (Asc.)', label: 'Name (Asc.)' },
  //   { key: 'Date', label: 'Date' },
  // ];

  const handleSortSelectorChange = (value) => {
    if (value === 'amount') {
      if (selectedSorting === 'Amount (Desc.)') {
        setSelectedSorting('Amount (Asc.)');
        sortTransactions('Amount (Asc.)');
      } else {
        setSelectedSorting('Amount (Desc.)');
        sortTransactions('Amount (Desc.)');
      }
    }
    if (value === 'title') {
      if (selectedSorting === 'Title (Desc.)') {
        setSelectedSorting('Title (Asc.)');
        sortTransactions('Title (Asc.)');
      } else {
        setSelectedSorting('Title (Desc.)');
        sortTransactions('Title (Desc.)');
      }
    }
    if (value === 'date') {
      if (selectedSorting === 'Date (Desc.)') {
        setSelectedSorting('Date (Asc.)');
        sortTransactions('Date (Asc.)');
      } else {
        setSelectedSorting('Date (Desc.)');
        sortTransactions('Date (Desc.)');
      }
    }
    // setSelectedSorting(value.key);
    // sortTransactions(value.key);
  }

  const handleTypeFilterPress = (selection) => {
    setSelectedTypeFilter(selection);
    filterTransactionsByType(selection);
  }

  const handleStatusFilterPress = (selection) => {
    setSelectedStatusFilter(selection);
    filterTransactionsByStatus(selection);
  }

  return(
    <View style={styles.containerStyle}>
      <TouchableOpacity onPress={() => expandFilters()} style={styles.headingStyle}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <FontAwesome style={styles.iconStyle} name='filter' size={28} color='orange'/>
          <Text style={{fontSize: 18}}>Sorting & Filters</Text>
        </View>
        <Animated.View style={{justifyContent: 'center', alignItems: 'center', transform: [{rotate: spin}]}}>
          <Entypo size={22} name='chevron-small-down' />
        </Animated.View>
      </TouchableOpacity>
      <Animated.View style={{height: expandAnim, overflow: 'hidden'}}>
        <View style={{marginTop: 25, alignItems: 'center'}}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.filterTitleStyle}>Sort By</Text>
            <View style={{overflow: 'hidden', flexDirection: 'row', width: '100%', borderWidth: 1, borderColor: 'orange', borderRadius: 5, height: 30}}>
              <TouchableOpacity onPress={() => handleSortSelectorChange('amount')} style={{...styles.sortOptionStyle, borderRightWidth: 1, backgroundColor: selectedSorting.match('Amount') ? 'orange' : 'white'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{color: selectedSorting.match('Amount') ? 'white' : 'black'}}>Amount</Text>
                  {selectedSorting.match('Amount') && <Entypo size={16} color='white' name={selectedSorting.match('Desc.') ? 'chevron-small-down' : 'chevron-small-up'} />}
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSortSelectorChange('date')} style={{...styles.sortOptionStyle, borderColor: 'orange', borderRightWidth: 1, backgroundColor: selectedSorting.match('Date') ? 'orange' : 'white'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{color: selectedSorting.match('Date') ? 'white' : 'black'}}>Date</Text>
                  {selectedSorting.match('Date') && <Entypo size={16} color='white' name={selectedSorting.match('Desc.') ? 'chevron-small-down' : 'chevron-small-up'} />}
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSortSelectorChange('title')} style={{...styles.sortOptionStyle, backgroundColor: selectedSorting.match('Title') ? 'orange' : 'white'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{color: selectedSorting.match('Title') ? 'white' : 'black'}}>Title</Text>
                  {selectedSorting.match('Title') && <Entypo size={16} color='white' name={selectedSorting.match('Desc.') ? 'chevron-small-down' : 'chevron-small-up'} />}
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {/*<View style={{flexDirection: 'row'}}>
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
                value={`${selectedSorting} ▾`}
              />
            </ModalSelector>
          </View>*/}
          <View style={{marginTop: 10, alignItems: 'center'}}>
            <Text style={styles.filterTitleStyle}>Show</Text>
            <View style={{flexDirection: 'row', width: '100%', borderRadius: 5, borderColor: 'orange', borderWidth: 1, overflow: 'hidden'}}>
              <TouchableOpacity onPress={() => handleTypeFilterPress('All')} style={{...styles.filterOptionStyle, backgroundColor: selectedTypeFilter === 'All' ? 'orange' : 'white', borderRightWidth: 1, borderColor: 'orange'}}>
                <Text style={{color: selectedTypeFilter === 'All' ? 'white' : 'black'}}>All</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleTypeFilterPress('Bought')} style={{...styles.filterOptionStyle, borderRightWidth: 1, borderColor: 'orange', backgroundColor: selectedTypeFilter === 'Bought' ? 'orange' : 'white'}}>
                <Text style={{color: selectedTypeFilter === 'Bought' ? 'white' : 'black'}}>In</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleTypeFilterPress('Sold')} style={{...styles.filterOptionStyle, backgroundColor: selectedTypeFilter === 'Sold' ? 'orange' : 'white'}}>
                <Text style={{color: selectedTypeFilter === 'Sold' ? 'white' : 'black'}}>Out</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/*<View style={{marginTop: 10, alignItems: 'center'}}>
            <Text style={styles.filterTitleStyle}>Transaction status</Text>
            <View style={{flexDirection: 'row', width: '100%', borderRadius: 5, borderColor: 'orange', borderWidth: 1, overflow: 'hidden'}}>
              <TouchableOpacity onPress={() => handleStatusFilterPress('All')} style={{...styles.filterOptionStyle, borderRightWidth: 1, backgroundColor: selectedStatusFilter === 'All' ? 'orange' : 'white'}}>
                <Text style={{color: selectedStatusFilter === 'All' ? 'white' : 'black'}}>All</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleStatusFilterPress('Executed')} style={{...styles.filterOptionStyle, borderRightWidth: 1, backgroundColor: selectedStatusFilter === 'Executed' ? 'orange' : 'white'}}>
                <Text style={{color: selectedStatusFilter === 'Executed' ? 'white' : 'black'}}>Executed</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleStatusFilterPress('Pending')} style={{...styles.filterOptionStyle, borderRightWidth: 1, borderLeftWidth: selectedStatusFilter === 'Pending' ? 1 : 0, backgroundColor: selectedStatusFilter === 'Pending' ? 'orange' : 'white'}}>
                <Text style={{color: selectedStatusFilter === 'Pending' ? 'white' : 'black'}}>Pending</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleStatusFilterPress('Failed')} style={{...styles.filterOptionStyle, backgroundColor: selectedStatusFilter === 'Failed' ? 'orange' : 'white'}}>
                <Text style={{color: selectedStatusFilter === 'Failed' ? 'white' : 'black'}}>Failed</Text>
              </TouchableOpacity>
            </View>
          </View>*/}
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
  sortOptionStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'orange'
  },
  filterTitleStyle: {
    fontSize: 18,
    marginBottom: 5
  },
  filterOptionStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    borderColor: 'orange'
  }
});
