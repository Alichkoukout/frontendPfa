import { Tabs } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';
import { HomeIcon, FileTextIcon, UserIcon } from 'lucide-react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colorScheme === 'dark' ? '#60A5FA' : '#1E40AF',
        tabBarInactiveTintColor: colorScheme === 'dark' ? '#6B7280' : '#9CA3AF',
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#1F2937' : '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: colorScheme === 'dark' ? '#374151' : '#E5E7EB',
          elevation: 0,
          shadowOpacity: 0,
          height: 60,
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerStyle: {
          backgroundColor: colorScheme === 'dark' ? '#1F2937' : '#FFFFFF',
          shadowColor: 'transparent',
          elevation: 0,
        },
        headerTintColor: colorScheme === 'dark' ? '#F9FAFB' : '#111827',
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color, size }) => (
            <HomeIcon size={size} color={color} />
          ),
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="generator"
        options={{
          title: 'Générateur',
          tabBarIcon: ({ color, size }) => (
            <FileTextIcon size={size} color={color} />
          ),
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <UserIcon size={size} color={color} />
          ),
          headerShown: true,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});