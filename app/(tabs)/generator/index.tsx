import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Platform, KeyboardAvoidingView, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft, ChevronRight, CheckCircle2, Info } from 'lucide-react-native';

type FormStep = 'info' | 'objectives' | 'technical' | 'constraints' | 'deadlines' | 'review';

export default function GeneratorScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const [currentStep, setCurrentStep] = useState<FormStep>('info');
  const [formData, setFormData] = useState({
    projectName: '',
    projectType: '',
    companyName: '',
    companyDescription: '',
    primaryObjective: '',
    secondaryObjectives: '',
    userProfiles: '',
    technicalRequirements: '',
    existingSystems: '',
    technicalConstraints: '',
    budgetMin: '',
    budgetMax: '',
    timeConstraints: '',
    startDate: '',
    endDate: '',
    milestones: ''
  });

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const steps: FormStep[] = ['info', 'objectives', 'technical', 'constraints', 'deadlines', 'review'];
  const currentStepIndex = steps.indexOf(currentStep);
  
  const goToNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStep(steps[currentStepIndex + 1]);
    }
  };
  
  const goToPreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1]);
    }
  };

  const generateDocument = () => {
    // Pass form data to the preview screen
    router.push({
      pathname: '/specification/preview',
      params: formData
    });
  };

  const renderStepIndicator = () => {
    return (
      <View style={styles.stepIndicatorContainer}>
        {steps.map((step, index) => (
          <View key={step} style={styles.stepItem}>
            <View 
              style={[
                styles.stepDot, 
                { 
                  backgroundColor: index <= currentStepIndex ? '#3B82F6' : isDark ? '#4B5563' : '#D1D5DB',
                }
              ]} 
            />
            {index < steps.length - 1 && (
              <View 
                style={[
                  styles.stepLine, 
                  { 
                    backgroundColor: index < currentStepIndex ? '#3B82F6' : isDark ? '#4B5563' : '#D1D5DB',
                  }
                ]} 
              />
            )}
          </View>
        ))}
      </View>
    );
  };

  const renderForm = () => {
    switch (currentStep) {
      case 'info':
        return (
          <View style={styles.formSection}>
            <View style={styles.formHeader}>
              <Text style={[styles.formTitle, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>
                Informations générales
              </Text>
              <Text style={[styles.formSubtitle, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
                Décrivez votre projet et votre entreprise
              </Text>
            </View>
            
            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: isDark ? '#FFFFFF' : '#374151' }]}>Nom du projet</Text>
              <TextInput
                style={[
                  styles.input, 
                  { 
                    backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                    borderColor: isDark ? '#374151' : '#D1D5DB',
                    color: isDark ? '#FFFFFF' : '#1F2937'
                  }
                ]}
                placeholder="ex: Application de gestion de tâches"
                placeholderTextColor={isDark ? '#9CA3AF' : '#9CA3AF'}
                value={formData.projectName}
                onChangeText={(text) => updateFormData('projectName', text)}
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: isDark ? '#FFFFFF' : '#374151' }]}>Type de projet</Text>
              <TextInput
                style={[
                  styles.input, 
                  { 
                    backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                    borderColor: isDark ? '#374151' : '#D1D5DB',
                    color: isDark ? '#FFFFFF' : '#1F2937'
                  }
                ]}
                placeholder="ex: Application mobile, Site web, Logiciel..."
                placeholderTextColor={isDark ? '#9CA3AF' : '#9CA3AF'}
                value={formData.projectType}
                onChangeText={(text) => updateFormData('projectType', text)}
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: isDark ? '#FFFFFF' : '#374151' }]}>Nom de l'entreprise</Text>
              <TextInput
                style={[
                  styles.input, 
                  { 
                    backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                    borderColor: isDark ? '#374151' : '#D1D5DB',
                    color: isDark ? '#FFFFFF' : '#1F2937'
                  }
                ]}
                placeholder="ex: TechSolutions SAS"
                placeholderTextColor={isDark ? '#9CA3AF' : '#9CA3AF'}
                value={formData.companyName}
                onChangeText={(text) => updateFormData('companyName', text)}
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: isDark ? '#FFFFFF' : '#374151' }]}>Description de l'entreprise</Text>
              <TextInput
                style={[
                  styles.textArea, 
                  { 
                    backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                    borderColor: isDark ? '#374151' : '#D1D5DB',
                    color: isDark ? '#FFFFFF' : '#1F2937'
                  }
                ]}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                placeholder="Décrivez brièvement votre entreprise, son secteur d'activité..."
                placeholderTextColor={isDark ? '#9CA3AF' : '#9CA3AF'}
                value={formData.companyDescription}
                onChangeText={(text) => updateFormData('companyDescription', text)}
              />
            </View>
          </View>
        );
        
      case 'objectives':
        return (
          <View style={styles.formSection}>
            <View style={styles.formHeader}>
              <Text style={[styles.formTitle, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>
                Objectifs du projet
              </Text>
              <Text style={[styles.formSubtitle, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
                Définissez ce que vous souhaitez accomplir
              </Text>
            </View>
            
            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: isDark ? '#FFFFFF' : '#374151' }]}>Objectif principal</Text>
              <TextInput
                style={[
                  styles.textArea, 
                  { 
                    backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                    borderColor: isDark ? '#374151' : '#D1D5DB',
                    color: isDark ? '#FFFFFF' : '#1F2937'
                  }
                ]}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                placeholder="Quel est l'objectif principal de votre projet ?"
                placeholderTextColor={isDark ? '#9CA3AF' : '#9CA3AF'}
                value={formData.primaryObjective}
                onChangeText={(text) => updateFormData('primaryObjective', text)}
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: isDark ? '#FFFFFF' : '#374151' }]}>Objectifs secondaires</Text>
              <TextInput
                style={[
                  styles.textArea, 
                  { 
                    backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                    borderColor: isDark ? '#374151' : '#D1D5DB',
                    color: isDark ? '#FFFFFF' : '#1F2937'
                  }
                ]}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                placeholder="Listez les objectifs secondaires ou fonctionnalités additionnelles"
                placeholderTextColor={isDark ? '#9CA3AF' : '#9CA3AF'}
                value={formData.secondaryObjectives}
                onChangeText={(text) => updateFormData('secondaryObjectives', text)}
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: isDark ? '#FFFFFF' : '#374151' }]}>Profils utilisateurs</Text>
              <TextInput
                style={[
                  styles.textArea, 
                  { 
                    backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                    borderColor: isDark ? '#374151' : '#D1D5DB',
                    color: isDark ? '#FFFFFF' : '#1F2937'
                  }
                ]}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                placeholder="Décrivez les différents types d'utilisateurs qui utiliseront le produit"
                placeholderTextColor={isDark ? '#9CA3AF' : '#9CA3AF'}
                value={formData.userProfiles}
                onChangeText={(text) => updateFormData('userProfiles', text)}
              />
            </View>
          </View>
        );
        
      case 'technical':
        return (
          <View style={styles.formSection}>
            <View style={styles.formHeader}>
              <Text style={[styles.formTitle, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>
                Spécifications techniques
              </Text>
              <Text style={[styles.formSubtitle, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
                Détaillez les aspects techniques du projet
              </Text>
            </View>
            
            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: isDark ? '#FFFFFF' : '#374151' }]}>Exigences techniques</Text>
              <TextInput
                style={[
                  styles.textArea, 
                  { 
                    backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                    borderColor: isDark ? '#374151' : '#D1D5DB',
                    color: isDark ? '#FFFFFF' : '#1F2937'
                  }
                ]}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                placeholder="Technologies, langages, frameworks à utiliser..."
                placeholderTextColor={isDark ? '#9CA3AF' : '#9CA3AF'}
                value={formData.technicalRequirements}
                onChangeText={(text) => updateFormData('technicalRequirements', text)}
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: isDark ? '#FFFFFF' : '#374151' }]}>Systèmes existants</Text>
              <TextInput
                style={[
                  styles.textArea, 
                  { 
                    backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                    borderColor: isDark ? '#374151' : '#D1D5DB',
                    color: isDark ? '#FFFFFF' : '#1F2937'
                  }
                ]}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                placeholder="Systèmes ou applications existants avec lesquels le projet doit s'intégrer"
                placeholderTextColor={isDark ? '#9CA3AF' : '#9CA3AF'}
                value={formData.existingSystems}
                onChangeText={(text) => updateFormData('existingSystems', text)}
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: isDark ? '#FFFFFF' : '#374151' }]}>Contraintes techniques</Text>
              <TextInput
                style={[
                  styles.textArea, 
                  { 
                    backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                    borderColor: isDark ? '#374151' : '#D1D5DB',
                    color: isDark ? '#FFFFFF' : '#1F2937'
                  }
                ]}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                placeholder="Limitations techniques, compatibilité, performances requises..."
                placeholderTextColor={isDark ? '#9CA3AF' : '#9CA3AF'}
                value={formData.technicalConstraints}
                onChangeText={(text) => updateFormData('technicalConstraints', text)}
              />
            </View>
          </View>
        );
        
      case 'constraints':
        return (
          <View style={styles.formSection}>
            <View style={styles.formHeader}>
              <Text style={[styles.formTitle, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>
                Budget et contraintes
              </Text>
              <Text style={[styles.formSubtitle, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
                Précisez les contraintes budgétaires et autres
              </Text>
            </View>
            
            <View style={styles.formRow}>
              <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                <Text style={[styles.label, { color: isDark ? '#FFFFFF' : '#374151' }]}>Budget minimum</Text>
                <TextInput
                  style={[
                    styles.input, 
                    { 
                      backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                      borderColor: isDark ? '#374151' : '#D1D5DB',
                      color: isDark ? '#FFFFFF' : '#1F2937'
                    }
                  ]}
                  placeholder="ex: 5000"
                  placeholderTextColor={isDark ? '#9CA3AF' : '#9CA3AF'}
                  keyboardType="numeric"
                  value={formData.budgetMin}
                  onChangeText={(text) => updateFormData('budgetMin', text)}
                />
              </View>
              
              <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                <Text style={[styles.label, { color: isDark ? '#FFFFFF' : '#374151' }]}>Budget maximum</Text>
                <TextInput
                  style={[
                    styles.input, 
                    { 
                      backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                      borderColor: isDark ? '#374151' : '#D1D5DB',
                      color: isDark ? '#FFFFFF' : '#1F2937'
                    }
                  ]}
                  placeholder="ex: 10000"
                  placeholderTextColor={isDark ? '#9CA3AF' : '#9CA3AF'}
                  keyboardType="numeric"
                  value={formData.budgetMax}
                  onChangeText={(text) => updateFormData('budgetMax', text)}
                />
              </View>
            </View>
            
            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: isDark ? '#FFFFFF' : '#374151' }]}>Contraintes temporelles</Text>
              <TextInput
                style={[
                  styles.textArea, 
                  { 
                    backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                    borderColor: isDark ? '#374151' : '#D1D5DB',
                    color: isDark ? '#FFFFFF' : '#1F2937'
                  }
                ]}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                placeholder="Contraintes de temps, disponibilité des ressources, etc."
                placeholderTextColor={isDark ? '#9CA3AF' : '#9CA3AF'}
                value={formData.timeConstraints}
                onChangeText={(text) => updateFormData('timeConstraints', text)}
              />
            </View>
          </View>
        );
        
      case 'deadlines':
        return (
          <View style={styles.formSection}>
            <View style={styles.formHeader}>
              <Text style={[styles.formTitle, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>
                Calendrier du projet
              </Text>
              <Text style={[styles.formSubtitle, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
                Définissez les dates clés et les jalons du projet
              </Text>
            </View>
            
            <View style={styles.formRow}>
              <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                <Text style={[styles.label, { color: isDark ? '#FFFFFF' : '#374151' }]}>Date de début</Text>
                <TextInput
                  style={[
                    styles.input, 
                    { 
                      backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                      borderColor: isDark ? '#374151' : '#D1D5DB',
                      color: isDark ? '#FFFFFF' : '#1F2937'
                    }
                  ]}
                  placeholder="JJ/MM/AAAA"
                  placeholderTextColor={isDark ? '#9CA3AF' : '#9CA3AF'}
                  value={formData.startDate}
                  onChangeText={(text) => updateFormData('startDate', text)}
                />
              </View>
              
              <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                <Text style={[styles.label, { color: isDark ? '#FFFFFF' : '#374151' }]}>Date de fin</Text>
                <TextInput
                  style={[
                    styles.input, 
                    { 
                      backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                      borderColor: isDark ? '#374151' : '#D1D5DB',
                      color: isDark ? '#FFFFFF' : '#1F2937'
                    }
                  ]}
                  placeholder="JJ/MM/AAAA"
                  placeholderTextColor={isDark ? '#9CA3AF' : '#9CA3AF'}
                  value={formData.endDate}
                  onChangeText={(text) => updateFormData('endDate', text)}
                />
              </View>
            </View>
            
            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: isDark ? '#FFFFFF' : '#374151' }]}>Jalons importants</Text>
              <TextInput
                style={[
                  styles.textArea, 
                  { 
                    backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                    borderColor: isDark ? '#374151' : '#D1D5DB',
                    color: isDark ? '#FFFFFF' : '#1F2937'
                  }
                ]}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                placeholder="Listez les jalons importants du projet avec leurs dates estimées"
                placeholderTextColor={isDark ? '#9CA3AF' : '#9CA3AF'}
                value={formData.milestones}
                onChangeText={(text) => updateFormData('milestones', text)}
              />
            </View>
          </View>
        );
        
      case 'review':
        return (
          <View style={styles.formSection}>
            <View style={styles.formHeader}>
              <Text style={[styles.formTitle, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>
                Récapitulatif
              </Text>
              <Text style={[styles.formSubtitle, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
                Vérifiez les informations avant de générer le document
              </Text>
            </View>
            
            <View style={[styles.reviewCard, { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }]}>
              <View style={styles.reviewSection}>
                <Text style={[styles.reviewSectionTitle, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>
                  Informations générales
                </Text>
                <View style={styles.reviewItem}>
                  <Text style={[styles.reviewLabel, { color: isDark ? '#D1D5DB' : '#6B7280' }]}>Nom du projet:</Text>
                  <Text style={[styles.reviewValue, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>
                    {formData.projectName || 'Non spécifié'}
                  </Text>
                </View>
                <View style={styles.reviewItem}>
                  <Text style={[styles.reviewLabel, { color: isDark ? '#D1D5DB' : '#6B7280' }]}>Type de projet:</Text>
                  <Text style={[styles.reviewValue, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>
                    {formData.projectType || 'Non spécifié'}
                  </Text>
                </View>
                <View style={styles.reviewItem}>
                  <Text style={[styles.reviewLabel, { color: isDark ? '#D1D5DB' : '#6B7280' }]}>Entreprise:</Text>
                  <Text style={[styles.reviewValue, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>
                    {formData.companyName || 'Non spécifié'}
                  </Text>
                </View>
              </View>
              
              <View style={styles.reviewSection}>
                <Text style={[styles.reviewSectionTitle, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>
                  Budget
                </Text>
                <View style={styles.reviewItem}>
                  <Text style={[styles.reviewLabel, { color: isDark ? '#D1D5DB' : '#6B7280' }]}>Fourchette:</Text>
                  <Text style={[styles.reviewValue, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>
                    {formData.budgetMin && formData.budgetMax 
                      ? `${formData.budgetMin} € - ${formData.budgetMax} €` 
                      : 'Non spécifié'}
                  </Text>
                </View>
              </View>
              
              <View style={styles.reviewSection}>
                <Text style={[styles.reviewSectionTitle, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>
                  Calendrier
                </Text>
                <View style={styles.reviewItem}>
                  <Text style={[styles.reviewLabel, { color: isDark ? '#D1D5DB' : '#6B7280' }]}>Période:</Text>
                  <Text style={[styles.reviewValue, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>
                    {formData.startDate && formData.endDate 
                      ? `${formData.startDate} - ${formData.endDate}` 
                      : 'Non spécifié'}
                  </Text>
                </View>
              </View>
            </View>
            
            <View style={styles.noteContainer}>
              <Info size={16} color={isDark ? '#60A5FA' : '#3B82F6'} style={styles.infoIcon} />
              <Text style={[styles.noteText, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
                Votre document sera généré au format PDF et disponible au téléchargement
              </Text>
            </View>
          </View>
        );
        
      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <View style={[styles.container, { backgroundColor: isDark ? '#121827' : '#F9FAFB' }]}>
        <LinearGradient
          colors={['#1E40AF', '#3B82F6']}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Générateur de cahier des charges</Text>
          <Text style={styles.headerSubtitle}>
            {currentStep === 'info' ? 'Étape 1 : Informations générales' : 
             currentStep === 'objectives' ? 'Étape 2 : Objectifs du projet' :
             currentStep === 'technical' ? 'Étape 3 : Spécifications techniques' :
             currentStep === 'constraints' ? 'Étape 4 : Contraintes budgétaires' :
             currentStep === 'deadlines' ? 'Étape 5 : Calendrier' :
             'Récapitulatif'}
          </Text>
          {renderStepIndicator()}
        </LinearGradient>
        
        <ScrollView 
          style={styles.scrollContainer}
          contentContainerStyle={styles.contentContainer}
        >
          {renderForm()}
        </ScrollView>
        
        <View style={[styles.footer, { backgroundColor: isDark ? '#1F2937' : '#FFFFFF' }]}>
          {currentStepIndex > 0 && (
            <TouchableOpacity 
              style={[styles.navButton, styles.backButton]}
              onPress={goToPreviousStep}
            >
              <ChevronLeft size={20} color={isDark ? '#E5E7EB' : '#4B5563'} />
              <Text style={[styles.backButtonText, { color: isDark ? '#E5E7EB' : '#4B5563' }]}>Précédent</Text>
            </TouchableOpacity>
          )}
          
          {currentStepIndex < steps.length - 1 ? (
            <TouchableOpacity 
              style={[styles.navButton, styles.nextButton]}
              onPress={goToNextStep}
            >
              <Text style={styles.nextButtonText}>Suivant</Text>
              <ChevronRight size={20} color="#FFFFFF" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              style={[styles.navButton, styles.generateButton]}
              onPress={generateDocument}
            >
              <Text style={styles.generateButtonText}>Générer le document</Text>
              <CheckCircle2 size={20} color="#FFFFFF" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#E0E7FF',
    marginBottom: 16,
  },
  stepIndicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  stepDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  stepLine: {
    flex: 1,
    height: 2,
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  formSection: {
    marginBottom: 16,
  },
  formHeader: {
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  formSubtitle: {
    fontSize: 14,
  },
  formGroup: {
    marginBottom: 16,
  },
  formRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
  },
  reviewCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  reviewSection: {
    marginBottom: 16,
  },
  reviewSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  reviewItem: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  reviewLabel: {
    fontSize: 14,
    fontWeight: '500',
    width: 120,
  },
  reviewValue: {
    fontSize: 14,
    flex: 1,
  },
  noteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  infoIcon: {
    marginRight: 8,
  },
  noteText: {
    fontSize: 13,
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  backButton: {
    backgroundColor: 'transparent',
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  nextButton: {
    backgroundColor: '#1E40AF',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginRight: 4,
  },
  generateButton: {
    backgroundColor: '#10B981',
  },
  generateButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginRight: 4,
  },
});