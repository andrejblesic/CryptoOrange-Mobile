import React, { useState, useEffect } from 'react';
import { View, Animated, ScrollView, StyleSheet, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import Transaction from '../../components/account-components/Transaction';
import BalanceDetailsInfo from '../../components/account-components/BalanceDetailsInfo';
import Filters from '../../components/account-components/Filters';

export default function BalanceDetailsScreen({navigation}) {
  const [transactions, setTransactions] = useState(
    [
      {
        fromCurr: navigation.state.params.currency,
        toCurr: 'ETH',
        date: '20.02.2020',
        amount: 2.2,
        status: 'Executed',
        type: 'buy',
        orderId: 1234567890,
        fromAccount: 'From Account',
        toAccount: 'To Account'
      },
      {
        fromCurr: navigation.state.params.currency,
        toCurr: 'LTC',
        date: '18.02.2020',
        amount: 4.5,
        status: 'Executed',
        type: 'buy',
        orderId: 1234567890,
        fromAccount: 'From Account',
        toAccount: 'To Account'
      },
      {
        fromCurr: navigation.state.params.currency,
        toCurr: 'XRP',
        date: '21.02.2020',
        amount: 335.2,
        status: 'Executed',
        type: 'buy',
        orderId: 1234567890,
        fromAccount: 'From Account',
        toAccount: 'To Account'
      },
      {
        fromCurr: navigation.state.params.currency,
        toCurr: 'XRP',
        date: '21.02.2020',
        amount: 6.2,
        status: 'Executed',
        type: 'buy',
        orderId: 1234567890,
        fromAccount: 'From Account',
        toAccount: 'To Account'
      },
      {
        fromCurr: navigation.state.params.currency,
        toCurr: 'DASH',
        date: '21.02.2020',
        amount: 22.5,
        status: 'Executed',
        type: 'sell',
        orderId: 1234567890,
        fromAccount: 'From Account',
        toAccount: 'To Account'
      },
      {
        fromCurr: navigation.state.params.currency,
        toCurr: 'XRP',
        date: '21.02.2020',
        amount: 650.5,
        status: 'Executed',
        type: 'buy',
        orderId: 1234567890,
        fromAccount: 'From Account',
        toAccount: 'To Account'
      },
      {
        fromCurr: navigation.state.params.currency,
        toCurr: 'LTC',
        date: '21.02.2020',
        amount: 22.75,
        status: 'Executed',
        type: 'sell',
        orderId: 1234567890,
        fromAccount: 'From Account',
        toAccount: 'To Account'
      },
      {
        fromCurr: navigation.state.params.currency,
        toCurr: 'XRP',
        date: '21.02.2020',
        amount: 3.8,
        status: 'Pending',
        type: 'buy',
        orderId: 1234567890,
        fromAccount: 'From Account',
        toAccount: 'To Account'
      },
      {
        fromCurr: navigation.state.params.currency,
        toCurr: 'XRP',
        date: '21.02.2020',
        amount: 7.5,
        status: 'Pending',
        type: 'buy',
        orderId: 1234567890,
        fromAccount: 'From Account',
        toAccount: 'To Account'
      },
      {
        fromCurr: navigation.state.params.currency,
        toCurr: 'XRP',
        date: '21.02.2020',
        amount: 3.3,
        status: 'Pending',
        type: 'sell',
        orderId: 1234567890,
        fromAccount: 'From Account',
        toAccount: 'To Account'
      },
      {
        fromCurr: navigation.state.params.currency,
        toCurr: 'XRP',
        date: '21.02.2020',
        amount: 5.5,
        status: 'Pending',
        type: 'sell',
        orderId: 1234567890,
        fromAccount: 'From Account',
        toAccount: 'To Account'
      },
      {
        fromCurr: navigation.state.params.currency,
        toCurr: 'ETH',
        date: '21.02.2020',
        amount: 1.5,
        status: 'Failed',
        type: 'buy',
        orderId: 1234567890,
        fromAccount: 'From Account',
        toAccount: 'To Account'
      },
      {
        fromCurr: navigation.state.params.currency,
        toCurr: 'DASH',
        date: '21.02.2020',
        amount: 25.3,
        status: 'Failed',
        type: 'buy',
        orderId: 1234567890,
        fromAccount: 'From Account',
        toAccount: 'To Account'
      }
    ]
  );

  // useEffect(() => {
  //   console.log(transactions);
  // }, [transactions]);

  const sortTransactions = (sortBy) => {
    if (sortBy.key === 'Amount') {
      setTransactions(transactions.slice(0).sort((a, b) => {
        return a.amount - b.amount;
      })
    );
    } else if (sortBy.key === 'Name') {
      setTransactions(transactions.slice(0).sort((a, b) => {
        if (a.toCurr < b.toCurr) {
          return -1;
        }
        if (a.toCurr > b.toCurr) {
          return 1;
        }
        return 0;
      }));
    }
  }

  return(
    <ScrollView contentContainerStyle={styles.containerStyle}>
      <BalanceDetailsInfo navigation={navigation} />
      <Filters sortTransactions={sortTransactions} />
      <View style={styles.transactionTableStyle}>
        <View style={styles.tableHeaderStyle}>
          <Text>Transactions</Text>
        </View>
        {transactions.map((item, index) => {
          return(
            <Transaction key={index} item={item} index={index} />
          );
        })}
      </View>
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
        <Image style={styles.iconStyle} source={eval(navigation.state.params.currency)}/>
        <View>
          <Text style={styles.currencyInfoStyle}>{navigation.state.params.currency} ({navigation.state.params.fullName}) Balance:</Text>
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
