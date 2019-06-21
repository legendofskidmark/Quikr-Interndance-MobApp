import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Home from './components/Home';


export default class HelloWorldApp extends Component {


  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Home/>
      </View>
    );
  }
}
