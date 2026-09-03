import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

export const DietScreen: React.FC = () => {
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.badge}>NUTRITION ENGINE</Text>
        <Text style={styles.title}>Daily Target Macros</Text>
        <Text style={styles.subtitle}>2,800 kcal Target • 160g Protein</Text>
      </View>

      {/* Macros Row */}
      <View style={styles.macroRow}>
        <View style={styles.macroCard}>
          <Text style={[styles.macroVal, { color: '#FF2A4B' }]}>160g</Text>
          <Text style={styles.macroName}>Protein</Text>
        </View>
        <View style={styles.macroCard}>
          <Text style={[styles.macroVal, { color: '#00F0FF' }]}>320g</Text>
          <Text style={styles.macroName}>Carbs</Text>
        </View>
        <View style={styles.macroCard}>
          <Text style={[styles.macroVal, { color: '#FFB800' }]}>75g</Text>
          <Text style={styles.macroName}>Fats</Text>
        </View>
      </View>

      {/* Meals */}
      <View style={styles.mealsCard}>
        <Text style={styles.mealsHeader}>Today's Meal Schedule</Text>

        {[
          { slot: 'Breakfast', name: 'Rolled Oats with Whey & Berries', cals: 460 },
          { slot: 'Lunch', name: 'Grilled Chicken with Jasmine Rice', cals: 560 },
          { slot: 'Snack', name: 'Greek Yogurt & Almonds', cals: 280 },
          { slot: 'Dinner', name: 'Salmon Fillet with Quinoa', cals: 590 }
        ].map((m) => (
          <View key={m.slot} style={styles.mealRow}>
            <View>
              <Text style={styles.mealSlot}>{m.slot}</Text>
              <Text style={styles.mealName}>{m.name}</Text>
            </View>
            <Text style={styles.mealCals}>{m.cals} kcal</Text>
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
  badge: { color: '#00F0FF', fontSize: 10, fontWeight: '800' },
  title: { color: '#FFF', fontSize: 20, fontWeight: '900', marginTop: 2 },
  subtitle: { color: '#94A3B8', fontSize: 12, marginTop: 4 },
  macroRow: { flexDirection: 'row', gap: 10 },
  macroCard: {
    flex: 1,
    backgroundColor: '#0E131C',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#1E293B',
    alignItems: 'center'
  },
  macroVal: { fontSize: 18, fontWeight: '900' },
  macroName: { color: '#94A3B8', fontSize: 11, fontWeight: '600', marginTop: 2 },
  mealsCard: {
    backgroundColor: '#0E131C',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1E293B',
    gap: 12
  },
  mealsHeader: { color: '#FFF', fontSize: 14, fontWeight: '700' },
  mealRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#131B27',
    borderRadius: 14,
    padding: 12
  },
  mealSlot: { color: '#00F0FF', fontSize: 10, fontWeight: '800', textTransform: 'uppercase' },
  mealName: { color: '#FFF', fontSize: 12, fontWeight: '700', marginTop: 2 },
  mealCals: { color: '#94A3B8', fontSize: 12, fontWeight: '700' }
});
