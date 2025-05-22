import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/context/AuthContext';
import { CheckCircle2, AlertCircle } from 'lucide-react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();
  const { signIn, user } = useAuth();

  const handleLogin = async () => {
    setError(null);
    setSuccess(null);
    
    // Validation
    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    if (!email.includes('@')) {
      setError('Adresse email invalide');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:9090/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        }),
      });

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Identifiants incorrects');
        } else {
          const errorText = await response.text();
          throw new Error(errorText || 'Identifiants incorrects');
        }
      }

      // Call signIn from AuthContext with the credentials
      const userData = await response.json();
      await signIn(userData);
      setSuccess('Connexion réussie');
      
      // Navigate to main app after successful login
      setTimeout(() => {
        router.replace('/(tabs)');
      }, 1000);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Identifiants incorrects. Veuillez réessayer.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <LinearGradient
          colors={['#1E40AF', '#3B82F6']}
          style={styles.header}
        >
          <Text style={styles.title}>Spécification Generator</Text>
          <Text style={styles.subtitle}>Générez des cahiers des charges professionnels</Text>
        </LinearGradient>

        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Connexion</Text>
          
          {error && (
            <View style={styles.messageContainer}>
              <AlertCircle size={20} color="#EF4444" />
              <Text style={styles.errorMessage}>{error}</Text>
            </View>
          )}

          {success && (
            <View style={styles.messageContainer}>
              <CheckCircle2 size={20} color="#10B981" />
              <Text style={styles.successMessage}>{success}</Text>
            </View>
          )}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Votre adresse email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mot de passe</Text>
            <TextInput
              style={styles.input}
              placeholder="Votre mot de passe"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <Link href="/auth/forgotPassword" asChild>
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Mot de passe oublié ?</Text>
            </TouchableOpacity>
          </Link>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.loginButtonText}>Se connecter</Text>
            )}
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Pas encore inscrit ? </Text>
            <Link href="/auth/register" asChild>
              <TouchableOpacity>
                <Text style={styles.registerLink}>S'inscrire</Text>
              </TouchableOpacity>
            </Link>
          </View>

          <Text> {user?.name}</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAF0',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#E0E7FF',
    opacity: 0.9,
  },
  formContainer: {
    flex: 1,
    padding: 24,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 24,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorMessage: {
    color: '#EF4444',
    marginLeft: 8,
  },
  successMessage: {
    color: '#10B981',
    marginLeft: 8,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5563',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  forgotPassword: {
    fontSize: 14,
    color: '#1E40AF',
    textAlign: 'right',
    marginVertical: 16,
  },
  loginButton: {
    backgroundColor: '#1E40AF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  registerText: {
    fontSize: 14,
    color: '#4B5563',
  },
  registerLink: {
    fontSize: 14,
    color: '#1E40AF',
    fontWeight: '600',
    marginLeft: 4,
  },
});