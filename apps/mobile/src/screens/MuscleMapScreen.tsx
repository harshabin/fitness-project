import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

export const MuscleMapScreen: React.FC = () => {
  const [selectedMuscle, setSelectedMuscle] = useState('Pectorals (Chest)');
  const [currentView, setCurrentView] = useState<'front' | 'back'>('front');

  const frontMuscles = [
    { name: 'Pectorals (Chest)', recovery: 92, sets: 16, tag: 'Primary' },
    { name: 'Anterior Deltoids (Front Shoulder)', recovery: 85, sets: 14, tag: 'Secondary' },
    { name: 'Biceps Brachii (Arms)', recovery: 95, sets: 12, tag: 'Synergist' },
    { name: 'Rectus Abdominis (Abs)', recovery: 100, sets: 10, tag: 'Core' },
    { name: 'Quadriceps (Front Thighs)', recovery: 88, sets: 16, tag: 'Primary' }
  ];

  const backMuscles = [
    { name: 'Latissimus Dorsi (Lats)', recovery: 78, sets: 18, tag: 'Primary' },
    { name: 'Trapezius (Upper Back)', recovery: 85, sets: 12, tag: 'Secondary' },
    { name: 'Triceps Brachii (Arms)', recovery: 60, sets: 14, tag: 'Fatigued' },
    { name: 'Gluteus Maximus (Glutes)', recovery: 82, sets: 12, tag: 'Primary' },
    { name: 'Hamstrings (Posterior Thighs)', recovery: 90, sets: 12, tag: 'Primary' },
    { name: 'Gastrocnemius (Calves)', recovery: 95, sets: 8, tag: 'Stabilizer' }
  ];

  const activeList = currentView === 'front' ? frontMuscles : backMuscles;

  const getRecoveryColor = (rec: number) => {
    if (rec >= 90) return '#00E676';
    if (rec >= 75) return '#00F0FF';
    if (rec >= 55) return '#FFB800';
    return '#FF2A4B';
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.badge}>2D ANATOMY HEATMAP</Text>
        <Text style={styles.title}>Muscle Group Telemetry</Text>
        <Text style={styles.subtitle}>Select anterior or posterior view to inspect recovery.</Text>
      </View>

      {/* Anterior / Posterior Switcher */}
      <View style={styles.tabSwitcher}>
        <TouchableOpacity
          style={[styles.switchBtn, currentView === 'front' && styles.switchBtnActive]}
          onPress={() => setCurrentView('front')}
        >
          <Text style={[styles.switchBtnText, currentView === 'front' && styles.switchBtnTextActive]}>
            Anterior (Front)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.switchBtn, currentView === 'back' && styles.switchBtnActive]}
          onPress={() => setCurrentView('back')}
        >
          <Text style={[styles.switchBtnText, currentView === 'back' && styles.switchBtnTextActive]}>
            Posterior (Back)
          </Text>
        </TouchableOpacity>
      </View>

      {/* Selected Muscle Focus Card */}
      <View style={styles.focusCard}>
        <Text style={styles.focusLabel}>Active Muscle Focus</Text>
        <Text style={styles.focusTitle}>{selectedMuscle}</Text>
        <View style={styles.gaugeRow}>
          <View style={styles.gaugeTrack}>
            <View style={[styles.gaugeFill, { width: '88%' }]} />
          </View>
          <Text style={styles.gaugeText}>88% Ready</Text>
        </View>
      </View>

      {/* Muscle List & Recovery Status */}
      <View style={styles.list}>
        {activeList.map((m) => {
          const isSelected = selectedMuscle === m.name;
          const recColor = getRecoveryColor(m.recovery);

          return (
            <TouchableOpacity
              key={m.name}
              style={[styles.item, isSelected && styles.itemSelected]}
              onPress={() => setSelectedMuscle(m.name)}
            >
              <View>
                <Text style={styles.itemName}>{m.name}</Text>
                <Text style={styles.itemSets}>Weekly Volume: {m.sets} sets • {m.tag}</Text>
              </View>

              <View style={[styles.recBadge, { borderColor: recColor }]}>
                <Text style={[styles.recText, { color: recColor }]}>{m.recovery}%</Text>
              </View>
            </TouchableOpacity>
          );
        })}
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
  badge: { color: '#00F0FF', fontSize: 10, fontWeight: '800' },
  title: { color: '#FFF', fontSize: 20, fontWeight: '900', marginTop: 2 },
  subtitle: { color: '#94A3B8', fontSize: 12, marginTop: 4 },
  tabSwitcher: {
    flexDirection: 'row',
    backgroundColor: '#0E131C',
    borderRadius: 16,
    padding: 4,
    borderWidth: 1,
    borderColor: '#1E293B',
    gap: 6
  },
  switchBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center'
  },
  switchBtnActive: {
    backgroundColor: '#FF2A4B'
  },
  switchBtnText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '700'
  },
  switchBtnTextActive: {
    color: '#FFFFFF',
    fontWeight: '800'
  },
  focusCard: {
    backgroundColor: '#0B101A',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#00F0FF33'
  },
  focusLabel: { color: '#00F0FF', fontSize: 10, fontWeight: '800', textTransform: 'uppercase' },
  focusTitle: { color: '#FFF', fontSize: 18, fontWeight: '800', marginTop: 4 },
  gaugeRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 12 },
  gaugeTrack: {
    flex: 1,
    height: 8,
    backgroundColor: '#1E293B',
    borderRadius: 4,
    overflow: 'hidden'
  },
  gaugeFill: {
    height: '100%',
    backgroundColor: '#00E676',
    borderRadius: 4
  },
  gaugeText: { color: '#00E676', fontSize: 12, fontWeight: '800' },
  list: { gap: 10 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0E131C',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#1E293B'
  },
  itemSelected: {
    borderColor: '#FF2A4B',
    backgroundColor: '#131B27'
  },
  itemName: { color: '#FFF', fontSize: 13, fontWeight: '700' },
  itemSets: { color: '#64748B', fontSize: 11, marginTop: 2 },
  recBadge: {
    backgroundColor: 'rgba(14, 19, 28, 0.8)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1
  },
  recText: { fontSize: 11, fontWeight: '800' }
});
