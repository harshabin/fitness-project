import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

export const ProgressScreen: React.FC = () => {
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.badge}>BIOMETRIC LOGS</Text>
        <Text style={styles.title}>Progress & Health</Text>
        <Text style={styles.subtitle}>76.0 kg • 14.5% Body Fat</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Compliance</Text>
          <Text style={[styles.statVal, { color: '#00E676' }]}>88%</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Streak</Text>
          <Text style={[styles.statVal, { color: '#FFB800' }]}>5 Days</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Volume</Text>
          <Text style={[styles.statVal, { color: '#00F0FF' }]}>18.4k</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Circumference Measurements</Text>
        
        <View style={styles.metricRow}>
          <Text style={styles.metricName}>Chest</Text>
          <Text style={styles.metricValue}>104 cm</Text>
        </View>
        <View style={styles.metricRow}>
          <Text style={styles.metricName}>Waist</Text>
          <Text style={styles.metricValue}>81 cm</Text>
        </View>
        <View style={styles.metricRow}>
          <Text style={styles.metricName}>Biceps</Text>
          <Text style={styles.metricValue}>38 cm</Text>
        </View>
        <View style={styles.metricRow}>
          <Text style={styles.metricName}>Thighs</Text>
          <Text style={styles.metricValue}>59 cm</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { padding: 16, gap: 16 },
  header: {
    backgroundColor: '#0E131C',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1E293B'
  },
  badge: { color: '#00E676', fontSize: 10, fontWeight: '800' },
  title: { color: '#FFF', fontSize: 20, fontWeight: '900', marginTop: 2 },
  subtitle: { color: '#94A3B8', fontSize: 12, marginTop: 4 },
  statsRow: { flexDirection: 'row', gap: 10 },
  statBox: {
    flex: 1,
    backgroundColor: '#0E131C',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#1E293B',
    alignItems: 'center'
  },
  statLabel: { color: '#94A3B8', fontSize: 10, fontWeight: '700' },
  statVal: { fontSize: 20, fontWeight: '900', marginTop: 2 },
  card: {
    backgroundColor: '#0E131C',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1E293B',
    gap: 12
  },
  cardTitle: { color: '#FFF', fontSize: 14, fontWeight: '700' },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#131B27'
  },
  metricName: { color: '#94A3B8', fontSize: 13 },
  metricValue: { color: '#FFF', fontSize: 13, fontWeight: '700' }
});
