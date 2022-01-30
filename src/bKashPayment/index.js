import {View, Text, StyleSheet, StatusBar, SafeAreaView} from 'react-native';
import React from 'react';
import UserCard from './userCard';
import TapToPay from './tapToPay';

const BkashPayment = () => {
  return (
    <>
      <StatusBar backgroundColor="#e2136e" />
      <SafeAreaView style={style.container}>
        <View style={style.innerContent}>
          <View style={{flex: 1, paddingHorizontal: 20}}>
            <Text style={style.heading}>
              Confirm to <Text style={style.bold}>Mobile Recharge</Text>
            </Text>
            <UserCard
              title="Redwanul Islam"
              subTitle="01631838820"
              avatarText="R"
              avatarColor="#e2136e"
            />
            <View style={style.boxArea}>
              <View style={style.Row}>
                <View style={style.col}>
                  <Text>Total</Text>
                  <Text>$10.00</Text>
                </View>
                <View style={style.col}>
                  <Text>New Balance</Text>
                  <Text>$2710.00</Text>
                </View>
                <View style={style.col}>
                  <Text>Type</Text>
                  <Text>Prepaid</Text>
                </View>
                <View style={style.col}>
                  <Text>Mobile Operator</Text>
                  <Text>Airtel</Text>
                </View>
              </View>
            </View>
          </View>
          <TapToPay />
        </View>
      </SafeAreaView>
    </>
  );
};

export default BkashPayment;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 20,
  },
  innerContent: {
    backgroundColor: 'white',
    flex: 1,
  },
  heading: {
    color: '#e2136e',
    fontSize: 20,
    // textAlign: 'center',
    marginTop: '20%',
    marginBottom: '10%',
  },
  bold: {
    fontWeight: 'bold',
  },
  Row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  col: {
    width: '50%',
    paddingVertical: 15,
  },
});
