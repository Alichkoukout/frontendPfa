import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { LogOut, User, FileText, Settings, ChevronRight, Mail, Key, Shield, Bell } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/context/AuthContext';

export default function ProfileScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    router.replace('/auth/login');
  };

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
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImagePlaceholder}>
              <User size={32} color="#1E40AF" />
            </View>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Jean-Michel Dupont</Text>
            <Text style={styles.profileEmail}>jean.michel@example.com</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={[styles.statsContainer, { marginTop: -40 }]}>
        <View style={[styles.statCard, { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }]}>
          <Text style={[styles.statValue, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>8</Text>
          <Text style={[styles.statLabel, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>Documents</Text>
        </View>
        
        <View style={[styles.statCard, { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }]}>
          <Text style={[styles.statValue, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>3</Text>
          <Text style={[styles.statLabel, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>En cours</Text>
        </View>
        
        <View style={[styles.statCard, { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }]}>
          <Text style={[styles.statValue, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>19</Text>
          <Text style={[styles.statLabel, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>Partagés</Text>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={[styles.sectionTitle, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>Compte</Text>
        
        <TouchableOpacity 
          style={[styles.menuItem, { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }]}
          onPress={() => router.push('/profile/personal-info')}
        >
          <View style={[styles.menuIconContainer, { backgroundColor: '#EFF6FF' }]}>
            <User size={20} color="#1E40AF" />
          </View>
          <View style={styles.menuTextContainer}>
            <Text style={[styles.menuTitle, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>Informations personnelles</Text>
            <Text style={[styles.menuDescription, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
              Modifier vos informations personnelles
            </Text>
          </View>
          <ChevronRight size={20} color={isDark ? '#9CA3AF' : '#6B7280'} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.menuItem, { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }]}
          onPress={() => router.push('/profile/email')}
        >
          <View style={[styles.menuIconContainer, { backgroundColor: '#F0FDF4' }]}>
            <Mail size={20} color="#10B981" />
          </View>
          <View style={styles.menuTextContainer}>
            <Text style={[styles.menuTitle, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>Email</Text>
            <Text style={[styles.menuDescription, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
              Modifier votre adresse email
            </Text>
          </View>
          <ChevronRight size={20} color={isDark ? '#9CA3AF' : '#6B7280'} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.menuItem, { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }]}
          onPress={() => router.push('/profile/password')}
        >
          <View style={[styles.menuIconContainer, { backgroundColor: '#FEF3F2' }]}>
            <Key size={20} color="#F43F5E" />
          </View>
          <View style={styles.menuTextContainer}>
            <Text style={[styles.menuTitle, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>Mot de passe</Text>
            <Text style={[styles.menuDescription, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
              Modifier votre mot de passe
            </Text>
          </View>
          <ChevronRight size={20} color={isDark ? '#9CA3AF' : '#6B7280'} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.sectionContainer}>
        <Text style={[styles.sectionTitle, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>Préférences</Text>
        
        <TouchableOpacity 
          style={[styles.menuItem, { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }]}
          onPress={() => router.push('/profile/notifications')}
        >
          <View style={[styles.menuIconContainer, { backgroundColor: '#FEF3C7' }]}>
            <Bell size={20} color="#F59E0B" />
          </View>
          <View style={styles.menuTextContainer}>
            <Text style={[styles.menuTitle, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>Notifications</Text>
            <Text style={[styles.menuDescription, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
              Gérer vos préférences de notifications
            </Text>
          </View>
          <ChevronRight size={20} color={isDark ? '#9CA3AF' : '#6B7280'} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.menuItem, { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }]}
          onPress={() => router.push('/profile/privacy')}
        >
          <View style={[styles.menuIconContainer, { backgroundColor: '#EFF6FF' }]}>
            <Shield size={20} color="#3B82F6" />
          </View>
          <View style={styles.menuTextContainer}>
            <Text style={[styles.menuTitle, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>Confidentialité</Text>
            <Text style={[styles.menuDescription, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
              Gérer vos paramètres de confidentialité
            </Text>
          </View>
          <ChevronRight size={20} color={isDark ? '#9CA3AF' : '#6B7280'} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.menuItem, { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }]}
          onPress={() => router.push('/profile/settings')}
        >
          <View style={[styles.menuIconContainer, { backgroundColor: '#F3F4F6' }]}>
            <Settings size={20} color="#6B7280" />
          </View>
          <View style={styles.menuTextContainer}>
            <Text style={[styles.menuTitle, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>Paramètres</Text>
            <Text style={[styles.menuDescription, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
              Gérer les paramètres de l'application
            </Text>
          </View>
          <ChevronRight size={20} color={isDark ? '#9CA3AF' : '#6B7280'} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.logoutContainer}>
        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }]}
          onPress={handleLogout}
        >
          <LogOut size={20} color="#F43F5E" style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.footerContainer}>
        <Text style={[styles.versionText, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
          Version 1.0.0
        </Text>
        <TouchableOpacity onPress={() => router.push('/legal/terms')}>
          <Text style={[styles.legalText, { color: isDark ? '#60A5FA' : '#3B82F6' }]}>
            Conditions d'utilisation
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/legal/privacy')}>
          <Text style={[styles.legalText, { color: isDark ? '#60A5FA' : '#3B82F6' }]}>
            Politique de confidentialité
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  header: {
    paddingTop: 40,
    paddingBottom: 60,
    paddingHorizontal: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageContainer: {
    marginRight: 16,
  },
  profileImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: '#E0E7FF',
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 24,
  },
  statCard: {
    width: '30%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  sectionContainer: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  menuItem: {
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
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  menuDescription: {
    fontSize: 13,
  },
  logoutContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F43F5E',
  },
  footerContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  versionText: {
    fontSize: 14,
    marginBottom: 8,
  },
  legalText: {
    fontSize: 14,
    marginVertical: 4,
  },
});