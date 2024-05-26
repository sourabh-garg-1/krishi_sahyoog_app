import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import About from './components/About';
import Homestack from './components/Homestack';
import Chatgpt from './components/Chatgpt';
import 'react-native-gesture-handler';
// import  LanguageProvider from './languageContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    // <LanguageProvider>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{headerShown: false}}>
          <Tab.Screen name="main" component={Homestack} />
          <Tab.Screen name="About" component={About} />
          <Tab.Screen name="Chatgpt" component={Chatgpt} />
        </Tab.Navigator>
      </NavigationContainer>
    //  </LanguageProvider>
  );
}
