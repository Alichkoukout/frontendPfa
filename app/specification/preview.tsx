import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useColorScheme, ActivityIndicator, FlatList, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Download, Share2, Check, Printer, List } from 'lucide-react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

// Define the section type
interface Section {
  title: string;
  content: string;
}

// Changed from SpecificationData to Specification
interface Specification {
  id?: number;
  projectName: string;
  projectType: string;
  companyName: string;
  companyDescription: string;
  primaryObjective: string;
  budget: string;
  timeline: string;
  technicalRequirements: string;
  sections: Section[];
}

// Add this constant for the API URL
const API_BASE_URL = Platform.OS === 'android' 
  ? 'http://10.0.2.2:9090/api/specifications' // For Android emulator
  : 'http://localhost:9090/api/specifications'; // For web/iOS

export default function SpecificationPreviewScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [showAllSpecifications, setShowAllSpecifications] = useState(false);
  const [allSpecifications, setAllSpecifications] = useState<Specification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Changed from SpecificationData to Specification
  const [specificationData, setSpecificationData] = useState<Specification>({
    projectName: '',
    projectType: '',
    companyName: '',
    companyDescription: '',
    primaryObjective: '',
    budget: '',
    timeline: '',
    technicalRequirements: '',
    sections: []
  });

  // Fetch all specifications from backend
  const fetchAllSpecifications = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch specifications');
      }
      const data = await response.json();
      setAllSpecifications(data);
    } catch (error) {
      console.error('Error fetching specifications:', error);
      // Don't show alert in production
      // alert('Failed to fetch specifications. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch all specifications when component mounts
    const fetchData = async () => {
      try {
        await fetchAllSpecifications();
      } catch (error) {
        console.error("Failed to load specifications:", error);
      }
    };
    
    fetchData();
    
    // Get form data from local storage
    const loadFormData = async () => {
      try {
        // In a real app, you might get this data from an API or context
        // For now, we'll use the data passed from the generator screen
        if (params) {
          // Create sections array based on form data
          const sections = [
            {
              title: 'Présentation du projet',
              content: params.companyDescription?.toString() || ''
            },
            {
              title: 'Objectifs',
              content: params.primaryObjective?.toString() || ''
            },
            {
              title: 'Spécifications techniques',
              content: params.technicalRequirements?.toString() || ''
            },
            {
              title: 'Contraintes techniques',
              content: params.technicalConstraints?.toString() || ''
            },
            {
              title: 'Fonctionnalités principales',
              content: params.secondaryObjectives?.toString() || ''
            },
            {
              title: 'Profils utilisateurs',
              content: params.userProfiles?.toString() || ''
            },
            {
              title: 'Budget et délais',
              content: `- Budget: ${params.budgetMin || ''} - ${params.budgetMax || ''}\n- Délai: ${params.startDate || ''} - ${params.endDate || ''}\n- Jalons: ${params.milestones || ''}`
            }
          ].filter(section => section.content && section.content.trim() !== '');

          // Set the specification data
          setSpecificationData({
            projectName: params.projectName?.toString() || 'Projet sans nom',
            projectType: params.projectType?.toString() || 'Type non spécifié',
            companyName: params.companyName?.toString() || 'Entreprise non spécifiée',
            companyDescription: params.companyDescription?.toString() || '',
            primaryObjective: params.primaryObjective?.toString() || '',
            budget: `${params.budgetMin || ''} - ${params.budgetMax || ''}`,
            timeline: `${params.startDate || ''} - ${params.endDate || ''}`,
            technicalRequirements: params.technicalRequirements?.toString() || '',
            sections: sections
          });
        }
      } catch (error) {
        console.error('Error loading form data:', error);
      }
    };

    loadFormData();
  }, [params]);

  // Generate HTML content for PDF
  const generateHtml = (specification: Specification) => {
    // Create sections HTML
    const sectionsHtml = specification.sections.map(section => `
      <div class="section">
        <h3>${section.title}</h3>
        <p>${section.content.replace(/\n/g, '<br/>')}</p>
      </div>
    `).join('');

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Cahier des Charges - ${specification.projectName}</title>
          <style>
            body {
              font-family: 'Helvetica', 'Arial', sans-serif;
              margin: 0;
              padding: 0;
              color: #333;
            }
            .container {
              padding: 40px;
              max-width: 800px;
              margin: 0 auto;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              border-bottom: 2px solid #3B82F6;
              padding-bottom: 20px;
            }
            h1 {
              color: #1E40AF;
              font-size: 28px;
              margin-bottom: 10px;
            }
            h2 {
              color: #3B82F6;
              font-size: 22px;
              margin-top: 0;
            }
            .metadata {
              display: flex;
              flex-wrap: wrap;
              margin-bottom: 30px;
              background-color: #F9FAFB;
              padding: 20px;
              border-radius: 8px;
            }
            .metadata-item {
              width: 50%;
              margin-bottom: 15px;
            }
            .metadata-label {
              font-size: 12px;
              color: #6B7280;
              margin-bottom: 5px;
            }
            .metadata-value {
              font-weight: bold;
              font-size: 14px;
            }
            .section {
              margin-bottom: 25px;
            }
            h3 {
              color: #1F2937;
              font-size: 18px;
              margin-bottom: 10px;
              border-bottom: 1px solid #E5E7EB;
              padding-bottom: 5px;
            }
            p {
              font-size: 14px;
              line-height: 1.6;
            }
            .footer {
              margin-top: 50px;
              text-align: center;
              font-size: 12px;
              color: #6B7280;
              border-top: 1px solid #E5E7EB;
              padding-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>CAHIER DES CHARGES</h1>
              <h2>${specification.projectName}</h2>
            </div>
            
            <div class="metadata">
              <div class="metadata-item">
                <div class="metadata-label">Type de projet</div>
                <div class="metadata-value">${specification.projectType}</div>
              </div>
              
              <div class="metadata-item">
                <div class="metadata-label">Entreprise</div>
                <div class="metadata-value">${specification.companyName}</div>
              </div>
              
              <div class="metadata-item">
                <div class="metadata-label">Budget</div>
                <div class="metadata-value">${specification.budget}</div>
              </div>
              
              <div class="metadata-item">
                <div class="metadata-label">Délai</div>
                <div class="metadata-value">${specification.timeline}</div>
              </div>
            </div>
            
            ${sectionsHtml}
            
            <div class="footer">
              Document généré le ${new Date().toLocaleDateString()} par Spécification Generator
            </div>
          </div>
        </body>
      </html>
    `;
  };

  // Generate and download PDF
  const generatePDF = async () => {
    try {
      const html = generateHtml(specificationData);
      
      // Generate the PDF file
      const { uri } = await Print.printToFileAsync({
        html,
        base64: false
      });
      
      // Get the file name
      const fileName = `${specificationData.projectName.replace(/\s+/g, '_')}_${Date.now()}.pdf`;
      
      // On iOS, the uri can be shared directly
      if (Platform.OS === 'ios') {
        await Sharing.shareAsync(uri);
      } else {
        // On Android, we need to copy the file to a shareable location
        const fileUri = FileSystem.documentDirectory + fileName;
        await FileSystem.copyAsync({
          from: uri,
          to: fileUri
        });
        await Sharing.shareAsync(fileUri);
      }
      
      return true;
    } catch (error) {
      console.error('Error generating PDF:', error);
      return false;
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    
    try {
      // First generate the PDF
      const pdfGenerated = await generatePDF();
      
      if (!pdfGenerated) {
        throw new Error('Failed to generate PDF');
      }
      
      // Then send the specification data to the backend
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(specificationData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save specification');
      }
      
      // Handle successful response
      const result = await response.json();
      console.log('Specification saved with ID:', result.id);
      
      setIsDownloaded(true);
      
      // Refresh the list of specifications
      fetchAllSpecifications();
      
      // Reset the downloaded state after a few seconds
      setTimeout(() => {
        setIsDownloaded(false);
      }, 3000);
    } catch (error) {
      console.error('Error saving specification:', error);
      alert('Failed to save specification. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = () => {
    // Share functionality would be implemented here
    alert('Fonctionnalité de partage à implémenter');
  };

  const handlePrint = () => {
    // Print functionality would be implemented here
    alert('Fonctionnalité d\'impression à implémenter');
  };

  const toggleSpecificationsList = () => {
    setShowAllSpecifications(!showAllSpecifications);
  };

  const renderSpecificationItem = ({ item }: { item: Specification }) => (
    <TouchableOpacity 
      style={[
        styles.specificationItem,
        { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }
      ]}
      onPress={() => {
        setSpecificationData(item);
        setShowAllSpecifications(false);
      }}
    >
      <Text style={[styles.specificationItemTitle, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>
        {item.projectName}
      </Text>
      <Text style={[styles.specificationItemSubtitle, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
        {item.projectType} - {item.companyName}
      </Text>
    </TouchableOpacity>
  );

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
            onPress={toggleSpecificationsList}
          >
            <List size={20} color={showAllSpecifications ? '#3B82F6' : '#6B7280'} />
          </TouchableOpacity>
          
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

      {showAllSpecifications ? (
        <View style={styles.allSpecificationsContainer}>
          <Text style={[styles.allSpecificationsTitle, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>
            Tous les cahiers des charges
          </Text>
          
          {isLoading ? (
            <ActivityIndicator size="large" color="#3B82F6" style={styles.loader} />
          ) : allSpecifications.length === 0 ? (
            <Text style={[styles.noSpecificationsText, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
              Aucun cahier des charges enregistré
            </Text>
          ) : (
            <FlatList
              data={allSpecifications}
              renderItem={renderSpecificationItem}
              keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
              contentContainerStyle={styles.specificationsList}
            />
          )}
        </View>
      ) : (
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
      )}
    </View>
  );
}

// Add new styles for the specifications list
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
    paddingVertical: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  actionText: {
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
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  previewContainer: {
    flex: 1,
    padding: 16,
  },
  previewContent: {
    paddingBottom: 40,
  },
  documentContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  documentHeader: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  documentTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  documentSubtitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  metadataContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  metadataItem: {
    width: '50%',
    marginBottom: 16,
  },
  metadataLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  metadataValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  documentBody: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
  },
  allSpecificationsContainer: {
    flex: 1,
    padding: 16,
  },
  allSpecificationsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  specificationsList: {
    paddingBottom: 20,
  },
  specificationItem: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  specificationItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  specificationItemSubtitle: {
    fontSize: 14,
  },
  noSpecificationsText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
  loader: {
    marginTop: 40,
  },
});