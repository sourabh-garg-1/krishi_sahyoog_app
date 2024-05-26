import { View, Text, StyleSheet, Image} from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import React from 'react'
import 'react-native-gesture-handler';
const HeadSection = () => {
  return (
      <View style={styles.header}>
      <Image source={require('../assets/Nitd.png')} style={{width: 50, height: 50, marginLeft: -20, marginRight: 20}} />
      <Text style = {styles.word}>Krishi Sahyoog</Text>
      <Image source={require('../assets/cismr.png')} style={{width: 50, height: 50, marginLeft: 20}} />
      </View>
  )
}

const styles = StyleSheet.create({
  header: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    color: 'Green',
  },
  word: {
    padding: 0,
    fontSize: 25,
    color: '#0a8f06',
  }
})

export default HeadSection