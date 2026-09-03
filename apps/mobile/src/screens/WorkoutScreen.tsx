import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';

export const WorkoutScreen: React.FC = () => {
  const [sets, setSets] = useState([
    { set: 1, weight: '70', reps: '10', done: true },
    { set: 2, weight: '75', reps: '10', done: false },
    { set: 3, weight: '80', reps: '8', done: false },
    { set: 4, weight: '80', reps: '8', done: false }
  ]);

  const toggleDone = (index: number) => {
    const copy = [...sets];
    copy[index].done = !copy[index].done;
    setSets(copy);
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.badgeRow}>
          <Text style={styles.badge}>EXERCISE 1 OF 3</Text>
          <Text style={styles.equipmentBadge}>BARBELL</Text>
        </View>
        <Text style={styles.title}>Barbell Flat Bench Press</Text>
        <Text style={styles.subtitle}>4 sets × 8-12 reps • 90s rest</Text>
      </View>

      {/* 2D Exercise Photo Reference Card */}
      <View style={styles.photoCard}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80' }}
          style={styles.exerciseImage}
          resizeMode="cover"
        />
        <View style={styles.photoOverlay}>
          <View style={styles.muscleTagsRow}>
            <View style={styles.primaryTag}>
              <Text style={styles.primaryTagText}>Primary: Mid Chest</Text>
            </View>
            <View style={styles.secondaryTag}>
              <Text style={styles.secondaryTagText}>Secondary: Triceps</Text>
            </View>
          </View>
          <Text style={styles.formCueText}>
            Form Cue: Retract scapulae, 45° elbow tuck, press with explosive drive.
          </Text>
        </View>
      </View>

      {/* Sets Table */}
      <View style={styles.card}>
        <Text style={styles.cardHeader}>Log Sets & Reps</Text>

        {sets.map((item, idx) => (
          <View key={idx} style={[styles.setRow, item.done && styles.setRowDone]}>
            <Text style={styles.setNum}>#{item.set}</Text>
            
            <View style={styles.inputWrap}>
              <TextInput
                style={styles.input}
                value={item.weight}
                keyboardType="numeric"
                placeholderTextColor="#64748B"
              />
              <Text style={styles.inputUnit}>kg</Text>
            </View>

            <View style={styles.inputWrap}>
              <TextInput
                style={styles.input}
                value={item.reps}
                keyboardType="numeric"
                placeholderTextColor="#64748B"
              />
              <Text style={styles.inputUnit}>reps</Text>
            </View>

            <TouchableOpacity
              style={[styles.checkBtn, item.done && styles.checkBtnDone]}
              onPress={() => toggleDone(idx)}
            >
              <Text style={styles.checkBtnText}>{item.done ? '✓' : 'O'}</Text>
            </TouchableOpacity>
          </View>
        ))}
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
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4
  },
  badge: { color: '#FF2A4B', fontSize: 10, fontWeight: '800' },
  equipmentBadge: {
    color: '#00F0FF',
    fontSize: 9,
    fontWeight: '800',
    backgroundColor: 'rgba(0, 240, 255, 0.1)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6
  },
  title: { color: '#FFF', fontSize: 20, fontWeight: '900', marginTop: 2 },
  subtitle: { color: '#94A3B8', fontSize: 12, marginTop: 4 },
  photoCard: {
    height: 220,
    backgroundColor: '#0A0E17',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1E293B',
    overflow: 'hidden',
    position: 'relative'
  },
  exerciseImage: {
    width: '100%',
    height: '100%'
  },
  photoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(7, 10, 14, 0.85)',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B'
  },
  muscleTagsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 6
  },
  primaryTag: {
    backgroundColor: 'rgba(255, 42, 75, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 42, 75, 0.4)'
  },
  primaryTagText: {
    color: '#FF2A4B',
    fontSize: 10,
    fontWeight: '700'
  },
  secondaryTag: {
    backgroundColor: 'rgba(255, 184, 0, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 184, 0, 0.4)'
  },
  secondaryTagText: {
    color: '#FFB800',
    fontSize: 10,
    fontWeight: '700'
  },
  formCueText: {
    color: '#E2E8F0',
    fontSize: 11,
    lineHeight: 15
  },
  card: {
    backgroundColor: '#0E131C',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1E293B',
    gap: 10
  },
  cardHeader: { color: '#FFF', fontSize: 14, fontWeight: '700', marginBottom: 4 },
  setRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#131B27',
    borderRadius: 14,
    padding: 10
  },
  setRowDone: {
    backgroundColor: 'rgba(0, 230, 118, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 230, 118, 0.3)'
  },
  setNum: { color: '#FFF', fontWeight: '800', fontSize: 13, width: 28 },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0E131C',
    borderRadius: 10,
    paddingHorizontal: 8
  },
  input: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
    width: 36,
    paddingVertical: 6,
    textAlign: 'center'
  },
  inputUnit: { color: '#64748B', fontSize: 10 },
  checkBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkBtnDone: {
    backgroundColor: '#00E676'
  },
  checkBtnText: {
    color: '#070A0E',
    fontWeight: '900'
  }
});
