import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import NewReportScreen from '../screens/NewReportScreen';
import DetailsScreen from '../screens/DetailsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
  return (
  
    <View style={styles.tabWrapper}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarLabelPosition: 'below-icon',
          tabBarStyle: styles.tabBar,
          tabBarItemStyle: styles.tabItem,
          tabBarLabelStyle: styles.tabLabel,
          tabBarActiveTintColor: '#2563eb', 
          tabBarInactiveTintColor: '#6b7280', 
        }}
      >
      
        <Tab.Screen 
          name="Novo Relato" 
          component={NewReportScreen} 
          options={{
            tabBarIcon: ({ focused }) => (
              <span style={{ fontSize: 18, opacity: focused ? 1 : 0.6 }}>➕</span>
            ),
          }}
        />

        <Tab.Screen 
          name="Chamados Abertos" 
          component={HomeScreen} 
          options={{
            tabBarIcon: ({ focused }) => (
              <span style={{ fontSize: 18, opacity: focused ? 1 : 0.6 }}>📋</span>
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Main" 
        component={Tabs} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Detalhes" 
        component={DetailsScreen} 
        options={{ 
          title: 'Detalhes do Relato',
          headerTitleStyle: styles.headerTitle,
          headerStyle: styles.header,
          headerShadowVisible: false,
        }} 
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({

  tabWrapper: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
  },
  tabBar: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    height: 64,
    paddingBottom: 8,
    paddingTop: 8,
    userSelect: 'none', 
    outlineStyle: 'none', 
  },
  tabItem: {
    outlineStyle: 'none',
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  
  header: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    color: '#1f2937',
    fontWeight: '700',
    fontSize: 18,
  },
});