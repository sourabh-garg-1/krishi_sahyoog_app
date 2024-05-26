import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
// import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react'
import HeadSection from './HeadSection';

const About = () => {
  return (
    <SafeAreaView>
      <HeadSection />
      <View style = {styles.container}>
        <Text style = {styles.word}>About us</Text>
        <Text style = {styles.word1}>Developed by CISMR Lab,NIT Delhi</Text>
        <Text style = {styles.team}>Team Members:</Text>
        <Text style = {styles.word2}>Manas Khantal CSE 4th Year</Text>
        <Text style = {styles.word2}>Sourabh Garg CSE 4th Year</Text>
      </View>
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginLeft: 20,
  },
  word: {
    marginTop: 20,
    padding: 0,
    fontSize: 25,
    color: '#0a8f06',
  },
  word1: {
    marginTop: 20,
    padding: 0,
    fontSize: 20,
  },
  team:{
    marginTop:35,
    fontWeight:'bold',
    fontSize: 15,
  },
  word2: {
    marginTop: 10,
    padding: 0,
    fontSize: 15,
  }
})

export default About