import React from 'react';


if (typeof global !== 'undefined' && !global.__unitlessNumbersPatch) {
  const patch = {
    animationIterationCount: true, borderImageOutset: true, borderImageSlice: true,
    borderImageWidth: true, boxFlex: true, boxFlexGroup: true, boxOrdinalGroup: true,
    columnCount: true, flex: true, flexGrow: true, flexOrder: true, flexPositive: true,
    flexShrink: true, flexNegative: true, stopOpacity: true, strokeDashoffset: true,
    strokeOpacity: true, strokeWidth: true, fontWeight: true, gridArea: true,
    gridRow: true, gridRowEnd: true, gridRowStart: true, gridColumn: true,
    gridColumnEnd: true, gridColumnStart: true, lineClamp: true, lineHeight: true,
    opacity: true, order: true, orphans: true, tabSize: true, widows: true,
    zIndex: true, zoom: true, fillOpacity: true,
  };
  if (!window.StyleSheet) window.StyleSheet = {};
  global.__unitlessNumbersPatch = true;
}

import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import { ReportsProvider } from './src/context/ReportsContext';

export default function App() {
  return (
    <ReportsProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </ReportsProvider>
  );
}