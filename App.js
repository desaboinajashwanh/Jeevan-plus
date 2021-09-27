/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */

// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

import React from 'react';
import type {Node} from 'react';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DashboardComponent from './Components/DashboardComponent/DashboardComponent';
import HealthInputComponent from './Components/HealthInputComponent/HealthInputComponent';
import HealthPredection from './Components/HealthPredection/HealthPredection';
import CameraComponent from './Components/CameraComponent/CameraComponent';


const theme = {
  ...DefaultTheme,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
    text: '#3b3b3b',
  },
};

const navigationStack = [
  {
    name: 'Dashboard',
    component: DashboardComponent,
    options: {headerShown: false},
  },
  {
    name: 'HealthInput',
    component: HealthInputComponent,
    options: {headerShown: false},
  },
  {
    name: 'CameraComponent',
    component: CameraComponent,
    options: {headerShown: false},
  },
  {
    name: 'HealthPredection',
    component: HealthPredection,
    options: {headerShown: false},
  },
];

const Stack = createNativeStackNavigator();

const App: () => Node = () => {
  return (
    <PaperProvider theme={theme}>
      <StatusBar
        animated={true}
        backgroundColor="rgba(0,0,0,0)"
        translucent={true}
        hidden={false}
      />
      <NavigationContainer>
        <Stack.Navigator initialRouteName={navigationStack[1].name}>
          {navigationStack.map((screen, index) => (
            <Stack.Screen
              key={'screen_' + index}
              name={screen.name}
              component={screen.component}
              options={{...screen.options}}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
