import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { FileIcon, ClipboardListIcon, UserIcon, ChevronRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';

interface Statistics {
  totalDocuments: number;
  inProgressDocuments: number;
  daysActive: number;
}

// Helper function to get token from storage
const getToken = () => {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem('token');
  }
  return null;
};

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { signOut, user } = useAuth();
  const [statistics, setStatistics] = useState<Statistics>({
    totalDocuments: 0,
    inProgressDocuments: 0,
    daysActive: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch statistics from backend
  const fetchStatistics = async () => {
    try {
      const token = getToken();
      console.log('Token:', token ? 'Present' : 'Missing'); // Log token status

      if (!token) {
        console.log('No authentication token found');
        setIsLoading(false);
        return;
      }

      console.log('Fetching statistics from:', 'http://localhost:9090/api/statistics');
      
      const response = await fetch('http://localhost:9090/api/statistics', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include'
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.text();
        console.error('Error response:', errorData);
        throw new Error(`Failed to fetch statistics: ${response.status} ${errorData}`);
      }
      
      const data = await response.json();
      console.log('Received statistics:', data);
      setStatistics(data);
    } catch (error) {
      console.error('Detailed error:', error);
      // Set default values in case of error
      setStatistics({
        totalDocuments: 0,
        inProgressDocuments: 0,
        daysActive: 0
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  const recentSpecifications = [
    {
      id: '1',
      title: 'Application de gestion de tâches',
      date: '12 juin 2025',
      progress: 100,
    },
    {
      id: '2',
      title: 'Site e-commerce dropshipping',
      date: '5 juin 2025',
      progress: 100,
    },
    {
      id: '3',
      title: 'Plateforme de cours en ligne',
      date: '28 mai 2025',
      progress: 80,
    },
  ];

  return (
    <ScrollView 
      style={[
        styles.container, 
        { backgroundColor: isDark ? '#121827' : '#F9FAFB' }
      ]}
      contentContainerStyle={styles.contentContainer}
    >
      <LinearGradient
        colors={['#1E40AF', '#3B82F6']}
        style={styles.header}
      >
        <Text style={styles.greeting}>Bonjour, {user?.name}</Text>
        <Text style={styles.welcomeText}>
          Bienvenue sur votre générateur de cahiers des charges
        </Text>
      </LinearGradient>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }]}>
          <View style={[styles.statIconContainer, { backgroundColor: '#E0F2FE' }]}>
            <FileIcon size={20} color="#0284C7" />
          </View>
          <Text style={[styles.statValue, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>
            {isLoading ? '...' : statistics.totalDocuments}
          </Text>
          <Text style={[styles.statLabel, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>Documents</Text>
        </View>
        
        <View style={[styles.statCard, { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }]}>
          <View style={[styles.statIconContainer, { backgroundColor: '#DCF3EE' }]}>
            <ClipboardListIcon size={20} color="#0D9488" />
          </View>
          <Text style={[styles.statValue, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>
            {isLoading ? '...' : statistics.inProgressDocuments}
          </Text>
          <Text style={[styles.statLabel, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>En cours</Text>
        </View>
        
        <View style={[styles.statCard, { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }]}>
          <View style={[styles.statIconContainer, { backgroundColor: '#F5E5F5' }]}>
            <UserIcon size={20} color="#BE185D" />
          </View>
          <Text style={[styles.statValue, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>
            {isLoading ? '...' : statistics.daysActive}
          </Text>
          <Text style={[styles.statLabel, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>Jours</Text>
        </View>
      </View>

      <View style={styles.actionSection}>
        <TouchableOpacity 
          style={[styles.newSpecButton, { backgroundColor: '#1E40AF' }]}
          onPress={() => router.push('/(tabs)/generator')}
        >
          <Text style={styles.newSpecButtonText}>Nouveau cahier des charges</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.recentSection}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>Récents</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/profile')}>
            <Text style={styles.viewAllText}>Voir tout</Text>
          </TouchableOpacity>
        </View>

        {recentSpecifications.map(item => (
          <TouchableOpacity 
            key={item.id}
            style={[styles.specCard, { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }]}
            onPress={() => router.push(`/specification/${item.id}`)}
          >
            <View style={styles.specIconContainer}>
              <FileIcon size={24} color="#1E40AF" />
            </View>
            <View style={styles.specInfo}>
              <Text style={[styles.specTitle, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>{item.title}</Text>
              <Text style={[styles.specDate, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>{item.date}</Text>
              <View style={styles.progressContainer}>
                <View 
                  style={[
                    styles.progressBar, 
                    { width: `${item.progress}%`, backgroundColor: item.progress === 100 ? '#10B981' : '#3B82F6' }
                  ]} 
                />
              </View>
            </View>
            <ChevronRight size={20} color={isDark ? '#9CA3AF' : '#6B7280'} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.tipsSection}>
        <Text style={[styles.sectionTitle, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>Conseils</Text>
        <View style={[styles.tipCard, { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }]}>
          <Text style={[styles.tipTitle, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>
            Comment rédiger un cahier des charges efficace
          </Text>
          <Text style={[styles.tipContent, { color: isDark ? '#D1D5DB' : '#4B5563' }]}>
            Un bon cahier des charges définit clairement les objectifs, le périmètre, les contraintes et les livrables attendus du projet.
          </Text>
          <TouchableOpacity style={styles.readMoreButton}>
            <Text style={styles.readMoreText}>Lire plus</Text>
          </TouchableOpacity>
        </View>
      </View>

      {user && (
        <TouchableOpacity
          style={{
            marginTop: 16,
            backgroundColor: '#F43F5E',
            padding: 12,
            borderRadius: 8,
            alignItems: 'center',
            marginHorizontal: 20,
          }}
          onPress={signOut}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Se déconnecter</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 24,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 16,
    color: '#E0E7FF',
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -30,
    marginHorizontal: 20,
  },
  statCard: {
    width: '30%',
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    alignItems: 'center',
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  actionSection: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  newSpecButton: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#1E40AF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  newSpecButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  recentSection: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  viewAllText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
  },
  specCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  specIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  specInfo: {
    flex: 1,
  },
  specTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  specDate: {
    fontSize: 13,
    marginBottom: 6,
  },
  progressContainer: {
    height: 4,
    width: '100%',
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
  },
  tipsSection: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  tipCard: {
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  tipContent: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  readMoreButton: {
    alignSelf: 'flex-start',
  },
  readMoreText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
  },
  errorContainer: {
    margin: 20,
    padding: 15,
    backgroundColor: '#FEE2E2',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  errorText: {
    color: '#DC2626',
    fontSize: 14,
    textAlign: 'center',
  },
});