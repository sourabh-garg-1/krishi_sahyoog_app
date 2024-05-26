// LanguageSelector.js

import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useLanguage } from './LanguageContext'; // Import the useLanguage hook from your language context

const LanguageSelector = () => {
  const { language, changeLanguage } = useLanguage();

  const setLanguage = (lang) => {
    changeLanguage(lang);
  };

  return (
    <View style={styles.container}>
      <Button
        title="English"
        onPress={() => setLanguage('en')}
        disabled={language === 'en'}
      />
      <Button
        title="Hindi"
        onPress={() => setLanguage('hi')}
        disabled={language === 'hi'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default LanguageSelector;
