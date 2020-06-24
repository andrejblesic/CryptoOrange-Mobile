import * as WebBrowser from 'expo-web-browser';
import React, { useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import CustomIcon from '../../components/global/CustomIcons';

function ProfileScreen(props) {

  const AccountInfoPushAction = StackActions.push({
    routeName: 'AccountInfoScreen',
    props: {

    }
  });

  const NotificationsPushAction = StackActions.push({
    routeName: 'NotificationsScreen',
    props: {

    }
  });

  const VerificationPushAction = StackActions.push({
    routeName: 'VerificationScreen',
    props: {

    }
  });

  const SettingsPushAction = StackActions.push({
    routeName: 'SettingsScreen',
    props: {

    }
  });

  const goToAccountDetails = () => {
    props.navigation.dispatch(AccountInfoPushAction);
  }

  const goToNotifications = () => {
    props.navigation.dispatch(NotificationsPushAction);
  }

  const goToSettings = () => {
    props.navigation.dispatch(SettingsPushAction);
  }

  const goToVerification = () => {
    props.navigation.dispatch(VerificationPushAction);
  }

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center', padding: 20}}>
        <CustomIcon 
          name='account'
          size={120}
          color="orange"
        />
        <Text style={{color: 'orange'}}>{props.userInfo.name}</Text>
      </View>
      <View style={styles.listWrapperStyle}>
        <TouchableOpacity onPress={goToAccountDetails} style={styles.listItemStyle}>
          <Text style={styles.listItemText}>Account Info</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToVerification} style={styles.listItemStyle}>
          <Text style={{...styles.listItemText, backgroundColor: '#DDD'}}>Verification</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToSettings} style={styles.listItemStyle}>
          <Text style={styles.listItemText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToNotifications} style={styles.listItemStyle}>
          <Text style={{...styles.listItemText, backgroundColor: '#DDD'}}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.listItemStyle}>
          <Text style={styles.listItemText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  listItemStyle: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'orange'
  },
  listItemText: {
    padding: 5,
    fontSize: 22,
    color: '#333'
  },
  listWrapperStyle: {
    width: '98%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'orange',
    overflow: 'hidden'
  }
});


//REDUX
const mapStateToProps = state => {
  return {userInfo: state.userInfo};
};

export default connect(
  mapStateToProps,
  null
)(ProfileScreen);