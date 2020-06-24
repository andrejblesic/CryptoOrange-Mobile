import React, { useState, useEffect } from 'react';
import { View, Animated, ScrollView, StyleSheet, Text, TextInput, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import Transaction from '../../components/account-components/Transaction';
import BalanceDetailsInfo from '../../components/account-components/BalanceDetailsInfo';
import Pagination from '../../components/account-components/Pagination';
import Filters from '../../components/account-components/Filters';
import { connect } from 'react-redux';

export default function BalanceDetailsScreen({navigation}) {
  const [transactions, setTransactions] = useState([]);
  const [selectedTypeFilter, setSelectedTypeFilter] = useState('All');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');
  const [selectedSorting, setSelectedSorting] = useState('Amount (Desc.)');
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [firstPageUrl, setFirstPageUrl] = useState();
  const [lastPageUrl, setLastPageUrl] = useState();
  const [currPage, setCurrPage] = useState();
  const [lastPage, setLastPage] = useState();

  useEffect(() => {
    loadPage(`http://5d6317c487b1.ngrok.io/api/v2/users/1/transactions/${navigation.state.params.currency}`);
  }, []);

  useEffect(() => {
    let newTransactionArr = transactions.slice();
    switch(selectedTypeFilter) {
      case 'Bought':
        newTransactionArr = newTransactionArr.filter(item => {
          return item.direction === 'in';
        });
        break;
      case 'Sold':
        newTransactionArr = newTransactionArr.filter(item => {
          return item.direction === 'out';
        });
        break;
      default:
        break;
    }
    switch(selectedSorting) {
      case 'Amount (Asc.)':
        newTransactionArr.sort((a, b) => {
          return parseFloat(a.amount) - parseFloat(b.amount);
        });
        break;
      case 'Amount (Desc.)':
        newTransactionArr.sort((a, b) => {
          return Number(b.amount) - Number(a.amount);
        });
        break;
      case 'Date (Asc.)':
        newTransactionArr.sort((a, b) => {
          return a.timestamp - b.timestamp;
        });
        break;
      case 'Date (Desc.)':
        newTransactionArr.sort((a, b) => {
          return b.timestamp - a.timestamp;
        });
      break;
      case 'Title (Asc.)':
        newTransactionArr.sort((a, b) => {
          if (navigation.state.params.transactionTypes[a.transaction_type] > navigation.state.params.transactionTypes[b.transaction_type]) {
            return -1;
          } else {
            return 1;
          }
        });
        break;
      case 'Title (Desc.)':
        newTransactionArr.sort((a, b) => {
          if (navigation.state.params.transactionTypes[a.transaction_type] > navigation.state.params.transactionTypes[b.transaction_type]) {
            return 1;
          } else {
            return -1;
          }
        });
      break;
      default:
        console.log('sorting error');
        break;
    }
    setTransactions(newTransactionArr);
  }, [selectedTypeFilter, selectedSorting])

  const sortTransactions = sortBy => {
    setSelectedSorting(sortBy);
  }

  const filterTransactionsByType = filterBy => {
    setSelectedTypeFilter(filterBy);
  }

  const filterTransactionsByStatus = filterBy => {
    setSelectedStatusFilter(filterBy);
  }

  const loadPage = pageUrl => {
    setLoadingTransactions(true);
    fetch(pageUrl)
    .then(res => res.json())
    .then(json => {
      setTransactions(json.data.data);
      setNextPageUrl(json.data.next_page_url);
      setPrevPageUrl(json.data.prev_page_url);
      setLastPageUrl(json.data.last_page_url);
      setFirstPageUrl(json.data.first_page_url);
      setCurrPage(json.data.current_page);
      setLastPage(json.data.last_page);
      setLoadingTransactions(false);
    });
  }

  return(
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.containerStyle}>
      <BalanceDetailsInfo navigation={navigation} />
      <Filters filterTransactionsByStatus={filterTransactionsByStatus} filterTransactionsByType={filterTransactionsByType} sortTransactions={sortTransactions} />
      <View style={styles.transactionTableStyle}>
        <View style={styles.tableHeaderStyle}>
          <Text>{navigation.state.params.fullName} Transactions</Text>
        </View>
        {loadingTransactions ?
          <ActivityIndicator style={styles.activityIndicatorStyle} size="large" color="orange"></ActivityIndicator>
          :
          (

            transactions?.length > 0 ? transactions.map((item, index) => {
              return(
                <Transaction key={index} item={item} index={index} transactionTypes={navigation.state.params.transactionTypes} />
              );
            })
            :
            <View style={{padding: 10, alignItems: 'center'}}>
              <Text>No {navigation.state.params.currency} transactions.</Text>
            </View>

          )
        }
        
      </View>
        {
          !loadingTransactions && <Pagination currPage={currPage} lastPage={lastPage} nextPageUrl={nextPageUrl} prevPageUrl={prevPageUrl} lastPageUrl={lastPageUrl} firstPageUrl={firstPageUrl} loadPage={loadPage} />
        }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: 'center',
  },
  transactionTableStyle: {
    borderWidth: 1,
    borderColor: 'orange',
    borderRadius: 5,
    marginTop: 10,
    width: '98%',
    overflow: 'hidden',
    marginBottom: 10
  },
  tableHeaderStyle: {
    height: 30,
    backgroundColor: '#EEE',
    justifyContent: 'center',
    padding: 5
  },
  activityIndicatorStyle: {
    paddingTop: 30,
    paddingBottom: 30
  }
});

{/*}<TouchableOpacity style={{...styles.tableItemStyle, backgroundColor: index%2 !== 0 ? '#EEEEEE' : 'white'}} key={index}>
  <View>
    <Text style={{fontSize: 20}}>{item.fromCurr}/{item.toCurr}</Text>
    <View style={{flexDirection: 'row'}}>
      <Text>{item.date}</Text>
      <Text style={{borderWidth: 1, marginLeft: 4, borderRadius: 4, paddingLeft: 4, paddingRight: 2, borderColor: item.status === 'Executed' ? 'green' : (item.status === 'Pending' ? 'darkorange' : 'red')}}>{item.status}</Text>
    </View>
  </View>
  <View>
    <Text style={{marginRight: 5, fontSize: 22}}>{item.amount}</Text>
  </View>
</TouchableOpacity>*/}

{/*
  <TouchableOpacity activeOpacity={0.75} onPress={() => slideAnimate()} style={styles.balanceStyle}>
    <View style={styles.headingStyle}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image style={styles.iconStyle} source={eval('navigation.state.params.currency')}/>
        <View>
          <Text style={styles.currencyInfoStyle}>{'navigation.state.params.currency'} ({navigation.state.params.fullName}) Balance:</Text>
          <Text style={styles.currencyAmountStyle}>{navigation.state.params.amount}</Text>
        </View>
      </View>
      <Entypo style={{marginRight: 5}} size={22} name={`chevron-small-${showInput ? 'up' : 'down'}`} />
    </View>
    {showInput && <Animated.View style={{flexDirection: 'row', opacity: fadeAnim, transform:[{scaleY: scaleAnim}]}}>
      <TextInput placeholder='Wallet address' style={styles.inputStyle}></TextInput>
      <TouchableOpacity style={styles.saveStyle}>
        <Text style={{color: '#EEE'}}>Save</Text>
      </TouchableOpacity>
    </Animated.View>}
  </TouchableOpacity>
*/}
