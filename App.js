import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import Conversor from './src/Conversor'

export default class App extends Component {
 render(){
  return (
    <View style={ styles.container }>
      <Conversor moedaA='USD' moedaB='BRL'/>
    </View>
   );
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
