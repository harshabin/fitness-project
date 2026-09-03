import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

interface HomeScreenProps {
  onStartWorkout: () => void;
  onOpenMuscleMap: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onStartWorkout, onOpenMuscleMap }) => {
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      {/* Welcome Hero */}
      <View style={styles.heroCard}>
        <Text style={styles.badge}>GOAL: MUSCLE GAIN</Text>
        <Text style={styles.heroTitle}>Today's Protocol</Text>
        <Text style={styles.heroSubtitle}>Chest & Triceps Hypertrophy</Text>

        <TouchableOpacity style={styles.startBtn} onPress={onStartWorkout}>
          <Text style={styles.startBtnText}>Start Workout (Visual Guide)</Text>
        </TouchableOpacity>
      </View>

      {/* Biometrics Capsule */}
      <View style={styles.metricsRow}>
        <View style={styles.metricBox}>
          <Text style={styles.metricLabel}>BMR</Text>
          <Text style={styles.metricVal}>1,770</Text>
          <Text style={styles.metricUnit}>kcal</Text>
        </View>
        <View style={styles.metricBox}>
          <Text style={styles.metricLabel}>TDEE</Text>
          <Text style={[styles.metricVal, { color: '#00F0FF' }]}>2,744</Text>
          <Text style={styles.metricUnit}>kcal</Text>
        </View>
        <View style={styles.metricBox}>
          <Text style={styles.metricLabel}>Target</Text>
          <Text style={[styles.metricVal, { color: '#00E676' }]}>3,094</Text>
          <Text style={styles.metricUnit}>kcal</Text>
        </View>
      </View>

      {/* 2D Muscle Map Launch Banner */}
      <TouchableOpacity style={styles.muscleBanner} onPress={onOpenMuscleMap}>
        <Text style={styles.muscleBannerBadge}>ANATOMY HEATMAP</Text>
        <Text style={styles.muscleBannerTitle}>Interactive Muscle Map</Text>
        <Text style={styles.muscleBannerDesc}>
          Explore anterior/posterior diagram & inspect real-time recovery readiness.
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { padding: 16, gap: 16 },
  heroCard: {
    backgroundColor: '#0E131C',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#1E293B'
  },
  badge: {
    color: '#FF2A4B',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 6
  },
  heroTitle: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '600'
  },
  heroSubtitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    marginTop: 2,
    marginBottom: 16
  },
  startBtn: {
    backgroundColor: '#FF2A4B',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center'
  },
  startBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 10
  },
  metricBox: {
    flex: 1,
    backgroundColor: '#0E131C',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#1E293B',
    alignItems: 'center'
  },
  metricLabel: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '700'
  },
  metricVal: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
    marginTop: 2
  },
  metricUnit: {
    color: '#64748B',
    fontSize: 9
  },
  muscleBanner: {
    backgroundColor: '#0E1724',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#00F0FF33'
  },
  muscleBannerBadge: {
    color: '#00F0FF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 4
  },
  muscleBannerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800'
  },
  muscleBannerDesc: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 4,
    lineHeight: 18
  }
});
