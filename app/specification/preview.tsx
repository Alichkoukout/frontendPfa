import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useColorScheme, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Download, Share2, Check, Printer } from 'lucide-react-native';

export default function SpecificationPreviewScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  // This would be fetched from your API in a real application
  const specificationData = {
    projectName: 'Application de gestion de tâches',
    projectType: 'Application mobile',
    companyName: 'TechSolutions SAS',
    companyDescription: 'Entreprise spécialisée dans le développement de solutions technologiques innovantes.',
    primaryObjective: 'Créer une application mobile permettant aux utilisateurs de gérer leurs tâches quotidiennes, professionnelles et personnelles.',
    budget: '5000€ - 10000€',
    timeline: '15/07/2025 - 15/10/2025',
    technicalRequirements: 'React Native, Spring Boot, PostgreSQL',
    sections: [
      {
        title: 'Présentation du projet',
        content: `L'application de gestion de tâches vise à offrir une solution intuitive et performante pour aider les utilisateurs à organiser leurs tâches quotidiennes. L'application permettra de créer, modifier, supprimer des tâches, de les organiser par catégories, et de suivre leur progression.`
      },
      {
        title: 'Objectifs',
        content: `- Permettre aux utilisateurs de créer et gérer des tâches\n- Offrir un système de catégorisation des tâches\n- Implémenter des rappels et notifications\n- Fournir des statistiques sur la productivité\n- Permettre la synchronisation entre différents appareils`
      },
      {
        title: 'Spécifications techniques',
        content: `- Frontend: React Native\n- Backend: Spring Boot\n- Base de données: PostgreSQL\n- Authentication: JWT\n- API REST pour la communication entre le frontend et le backend`
      },
      {
        title: 'Fonctionnalités principales',
        content: `1. Gestion des tâches (CRUD)\n2. Catégorisation des tâches\n3. Système de rappels et notifications\n4. Système de priorités pour les tâches\n5. Statistiques de productivité\n6. Synchronisation multi-appareils\n7. Mode hors-ligne avec synchronisation ultérieure`
      },
      {
        title: 'Contraintes',
        content: `- L'application doit être compatible avec iOS 13+ et Android 8+\n- L'interface utilisateur doit être intuitive et accessible\n- Les données des utilisateurs doivent être sécurisées\n- L'application doit fonctionner en mode hors-ligne`
      },
      {
        title: 'Livrables',
        content: `- Code source complet\n- Documentation technique\n- Guide d'utilisation\n- Application déployée sur les stores (App Store et Google Play)`
      },
      {
        title: 'Budget et délais',
        content: `- Budget: 5000€ - 10000€\n- Délai: 3 mois (15/07/2025 - 15/10/2025)\n- Possibilité d'extension pour des fonctionnalités additionnelles`
      }
    ]
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    // Simulate download process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsDownloading(false);
    setIsDownloaded(true);
    
    // Reset the downloaded state after a few seconds
    setTimeout(() => {
      setIsDownloaded(false);
    }, 3000);
  };

  const handleShare = () => {
    // Share functionality would be implemented here
    alert('Fonctionnalité de partage à implémenter');
  };

  const handlePrint = () => {
    // Print functionality would be implemented here
    alert('Fonctionnalité d\'impression à implémenter');
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#121827' : '#F9FAFB' }]}>
      <LinearGradient
        colors={['#1E40AF', '#3B82F6']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View>
            <Text style={styles.title}>Aperçu du cahier des charges</Text>
            <Text style={styles.subtitle}>{specificationData.projectName}</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={[
            styles.actionButton, 
            { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }
          ]}
          onPress={handleDownload}
          disabled={isDownloading}
        >
          {isDownloading ? (
            <ActivityIndicator size="small" color="#3B82F6" />
          ) : isDownloaded ? (
            <Check size={20} color="#10B981" />
          ) : (
            <Download size={20} color="#3B82F6" />
          )}
          <Text 
            style={[
              styles.actionText, 
              { 
                color: isDownloaded ? '#10B981' : '#3B82F6',
                marginLeft: 8
              }
            ]}
          >
            {isDownloading ? 'Téléchargement...' : isDownloaded ? 'Téléchargé' : 'Télécharger PDF'}
          </Text>
        </TouchableOpacity>
        
        <View style={styles.secondaryActions}>
          <TouchableOpacity 
            style={[
              styles.iconButton, 
              { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }
            ]}
            onPress={handleShare}
          >
            <Share2 size={20} color="#6B7280" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.iconButton, 
              { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }
            ]}
            onPress={handlePrint}
          >
            <Printer size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.previewContainer}
        contentContainerStyle={styles.previewContent}
      >
        <View style={[
          styles.documentContainer, 
          { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }
        ]}>
          <View style={styles.documentHeader}>
            <Text style={[styles.documentTitle, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>
              CAHIER DES CHARGES
            </Text>
            <Text style={[styles.documentSubtitle, { color: isDark ? '#D1D5DB' : '#4B5563' }]}>
              {specificationData.projectName}
            </Text>
          </View>
          
          <View style={styles.metadataContainer}>
            <View style={styles.metadataItem}>
              <Text style={[styles.metadataLabel, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
                Type de projet
              </Text>
              <Text style={[styles.metadataValue, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>
                {specificationData.projectType}
              </Text>
            </View>
            
            <View style={styles.metadataItem}>
              <Text style={[styles.metadataLabel, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
                Entreprise
              </Text>
              <Text style={[styles.metadataValue, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>
                {specificationData.companyName}
              </Text>
            </View>
            
            <View style={styles.metadataItem}>
              <Text style={[styles.metadataLabel, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
                Budget
              </Text>
              <Text style={[styles.metadataValue, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>
                {specificationData.budget}
              </Text>
            </View>
            
            <View style={styles.metadataItem}>
              <Text style={[styles.metadataLabel, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
                Délai
              </Text>
              <Text style={[styles.metadataValue, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>
                {specificationData.timeline}
              </Text>
            </View>
          </View>
          
          <View style={styles.documentBody}>
            {specificationData.sections.map((section, index) => (
              <View key={index} style={styles.section}>
                <Text style={[styles.sectionTitle, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>
                  {section.title}
                </Text>
                <Text style={[styles.sectionContent, { color: isDark ? '#D1D5DB' : '#4B5563' }]}>
                  {section.content}
                </Text>
              </View>
            ))}
          </View>
          
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
              Document généré le {new Date().toLocaleDateString()} par Spécification Generator
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#E0E7FF',
    opacity: 0.9,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  secondaryActions: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  previewContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  previewContent: {
    paddingVertical: 16,
    paddingBottom: 40,
  },
  documentContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  documentHeader: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    alignItems: 'center',
  },
  documentTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  documentSubtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  metadataContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  metadataItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  metadataLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  metadataValue: {
    fontSize: 14,
  },
  documentBody: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  sectionContent: {
    fontSize: 14,
    lineHeight: 22,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
  },
});