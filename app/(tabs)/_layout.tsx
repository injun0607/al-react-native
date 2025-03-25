import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FFD700',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: () => (
          <View style ={{ backgroundColor: '#1a1a1a' , height: '100%'}} />
        ),
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {
            backgroundColor: '#1a1a1a',
            borderTopWidth: 1,
            borderTopColor: '#FFD700'
          },
        }),
        tabBarLabelStyle: {
          fontWeight: 'bold',
          color: '#FFD700',
        }
      }}>
      <Tabs.Screen
        name="quest"
        options={{
          title: '퀘스트',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
       <Tabs.Screen
        name="stat"
        options={{
          title: '퀘스트',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />



    </Tabs>
  );
}
