import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { HomeScreen } from './src/screens/HomeScreen';
import { WorkoutScreen } from './src/screens/WorkoutScreen';
import { MuscleMapScreen } from './src/screens/MuscleMapScreen';
import { DietScreen } from './src/screens/DietScreen';
import { ProgressScreen } from './src/screens/ProgressScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'workout' | 'muscle' | 'diet' | 'progress'>('home');

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen onStartWorkout={() => setActiveTab('workout')} onOpenMuscleMap={() => setActiveTab('muscle')} />;
      case 'workout':
        return <WorkoutScreen />;
      case 'muscle':
        return <MuscleMapScreen />;
      case 'diet':
        return <DietScreen />;
      case 'progress':
        return <ProgressScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#070A0E" />

      {/* Screen View */}
      <View style={styles.content}>
        {renderScreen()}
      </View>

      {/* Bottom Tab Navigation */}
      <View style={styles.bottomNav}>
        {[
          { id: 'home', label: 'Today' },
          { id: 'workout', label: 'Workout' },
          { id: 'muscle', label: 'Muscle Map' },
          { id: 'diet', label: 'Diet' },
          { id: 'progress', label: 'Progress' }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              style={[styles.navTab, isActive && styles.navTabActive]}
              onPress={() => setActiveTab(tab.id as any)}
            >
              <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070A0E'
  },
  content: {
    flex: 1
  },
  bottomNav: {
    flexDirection: 'row',
    height: 64,
    backgroundColor: '#0E131C',
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8
  },
  navTab: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12
  },
  navTabActive: {
    backgroundColor: 'rgba(255, 42, 75, 0.15)'
  },
  navLabel: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600'
  },
  navLabelActive: {
    color: '#FF2A4B',
    fontWeight: '800'
  }
});
