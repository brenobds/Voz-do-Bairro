import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { TailwindProvider } from 'nativewind';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import { ReportsProvider } from './src/context/ReportsContext';

export default function App() {
  return (
    <TailwindProvider>
      <SafeAreaProvider>
        <ReportsProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </ReportsProvider>
      </SafeAreaProvider>
    </TailwindProvider>
  );
}
