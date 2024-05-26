// LanguageContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { I18n } from 'i18n-js';

import en from './locales/en.json';
import hi from './locales/hi.json';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');

    useEffect(() => {
        AsyncStorage.getItem('language').then(savedLanguage => {
            if (savedLanguage) {
                setLanguage(savedLanguage);
            }
        });
    }, []);

    const changeLanguage = async (lang) => {
        setLanguage(lang);
        AsyncStorage.setItem('language', lang);
    };

    useEffect(() => {
        I18n.translations = { en, hi };
        I18n.locale = hi;
        I18n.defaultLocale = 'hi';
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext); // Export useLanguage hook
export default LanguageContext; // Export LanguageContext for other components to use if needed
