import { Stack } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { Text } from 'react-native';

export default function AuthLayout() {
  const { user } = useAuth();

  return (
    <Stack screenOptions={{ 
      headerShown: false,
      animation: 'fade',
    }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="forgotPassword" />
    </Stack>
  );
}