import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet,
  ActivityIndicator, SafeAreaView, Animated, Dimensions,
  ScrollView, Platform
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

const GATEWAY_URL = 'http://localhost:8090/api';
const { width } = Dimensions.get('window');

// Thème moderne sombre
const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#0f172a',
    primary: '#8b5cf6',
    card: '#1e293b',
    text: '#06121eff',
    border: '#334155',
  },
};

// --- Composant Carte de Produit avec Animation ---
const ProductCard = ({ item, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.95, useNativeDriver: true }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={styles.glassCard}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={['rgba(139, 92, 246, 0.1)', 'rgba(16, 185, 129, 0.05)']}
          style={styles.cardGradient}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.productName}>{item.nom}</Text>
            <View style={styles.priceBadge}>
              <Text style={styles.priceText}>{item.prix} €</Text>
            </View>
          </View>
          <Text style={styles.productStock}>
            <Text style={{ color: item.stock > 10 ? '#10b981' : '#f59e0b' }}>
              ● {item.stock} en stock
            </Text>
          </Text>
          <View style={styles.cardFooter}>
            <Text style={styles.detailsBtn}>Voir les détails →</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

// --- Écran Principal ---
function HomeScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${GATEWAY_URL}/categories`)
      .then(res => res.json())
      .then(data => {
        // Déduplication des catégories côté client par sécurité
        const uniqueCategories = data.reduce((acc, current) => {
          const x = acc.find(item => item.nom === current.nom);
          if (!x) return acc.concat([current]);
          else return acc;
        }, []);
        setCategories(uniqueCategories);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur catégories:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedCategoryId) {
      setLoading(true);
      fetch(`${GATEWAY_URL}/produits?categorieId=${selectedCategoryId}`)
        .then(res => res.json())
        .then(data => {
          setProducts(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Erreur produits:', err);
          setLoading(false);
        });
    } else {
      setProducts([]);
    }
  }, [selectedCategoryId]);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#0f172a', '#1e1b4b']} style={StyleSheet.absoluteFill} />

      <View style={styles.headerSection}>
        <Text style={styles.heroTitle}>Boutique Moderne</Text>
        <Text style={styles.heroSubtitle}>Découvrez nos collections exclusives</Text>
      </View>

      <View style={styles.pickerSection}>
        <Text style={styles.label}>Catégorie</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedCategoryId}
            onValueChange={(itemValue) => setSelectedCategoryId(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Choisir une catégorie..." value={null} color="#64748b" />
            {categories.map(cat => (
              <Picker.Item key={cat.id} label={cat.nom} value={cat.id} color="#000000" />
            ))}
          </Picker>
        </View>

      </View>



      {loading ? (
        <View style={styles.center}><ActivityIndicator size="large" color="#8b5cf6" /></View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <ProductCard
              item={item}
              onPress={() => navigation.navigate('Details', { product: item })}
            />
          )}
          ListEmptyComponent={
            selectedCategoryId && (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>Aucun produit dans cette catégorie pour le moment.</Text>
              </View>
            )
          }
        />
      )}
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

// --- Écran Détails ---
function DetailsScreen({ route }) {
  const { product } = route.params;
  const [avis, setAvis] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${GATEWAY_URL}/avis/${product.id}`)
      .then(res => res.json())
      .then(data => {
        setAvis(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur avis:', err);
        setLoading(false);
      });
  }, [product.id]);

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={['#1e1b4b', '#0f172a']} style={StyleSheet.absoluteFill} />

      <View style={styles.detailHeader}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{product.categorie?.nom || 'Produit'}</Text>
        </View>
        <Text style={styles.detailTitle}>{product.nom}</Text>
        <Text style={styles.detailPrice}>{product.prix} €</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Avis des clients</Text>
        {loading ? (
          <ActivityIndicator color="#8b5cf6" />
        ) : (
          <View>
            {avis.length === 0 ? (
              <Text style={styles.emptyText}>Soyez le premier à donner votre avis !</Text>
            ) : (
              avis.map(item => (
                <View key={item.id} style={styles.avisCard}>
                  <View style={styles.avisTop}>
                    <Text style={styles.avisAuteur}>{item.auteur}</Text>
                    <View style={styles.ratingBadge}>
                      <Text style={styles.ratingText}>⭐ {item.note}/5</Text>
                    </View>
                  </View>
                  <Text style={styles.avisCommentaire}>{item.commentaire}</Text>
                </View>
              ))
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer theme={AppTheme}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#1e293b' },
          headerTintColor: '#f8fafc',
          headerTitleStyle: { fontWeight: '600' },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ title: 'Détails du Produit' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerSection: { padding: 30, paddingTop: 60 },
  heroTitle: { fontSize: 36, fontWeight: '800', color: '#f8fafc', letterSpacing: -1 },
  heroSubtitle: { fontSize: 16, color: '#94a3b8', marginTop: 5 },
  pickerSection: { paddingHorizontal: 30, marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#8b5cf6', marginBottom: 10, textTransform: 'uppercase' },
  pickerWrapper: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#8b5cf6',
    overflow: 'hidden',
    marginVertical: 10,
  },
  picker: {
    color: '#000000',
    height: 50,
    backgroundColor: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },




  listContent: { padding: 20 },
  glassCard: {
    marginBottom: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 20 },
      android: { elevation: 10 }
    })
  },
  cardGradient: { padding: 20 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  productName: { fontSize: 20, fontWeight: '700', color: '#f8fafc' },
  priceBadge: { backgroundColor: '#8b5cf6', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  priceText: { color: '#fff', fontWeight: '700' },
  productStock: { fontSize: 14, fontWeight: '500' },
  cardFooter: { marginTop: 15, borderTopWidth: 1, borderTopColor: 'rgba(255, 255, 255, 0.05)', paddingTop: 15 },
  detailsBtn: { color: '#8b5cf6', fontWeight: '600', fontSize: 15 },
  detailHeader: { padding: 30, alignItems: 'center' },
  badge: { backgroundColor: 'rgba(139, 92, 246, 0.2)', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 20, marginBottom: 15 },
  badgeText: { color: '#a78bfa', fontWeight: '700', fontSize: 12, textTransform: 'uppercase' },
  detailTitle: { fontSize: 32, fontWeight: '800', color: '#f8fafc', textAlign: 'center' },
  detailPrice: { fontSize: 28, fontWeight: '700', color: '#10b981', marginTop: 10 },
  section: { padding: 30 },
  sectionTitle: { fontSize: 22, fontWeight: '700', color: '#f8fafc', marginBottom: 20 },
  avisCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    padding: 20,
    borderRadius: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)'
  },
  avisTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  avisAuteur: { fontWeight: '700', color: '#f8fafc', fontSize: 16 },
  ratingBadge: { backgroundColor: 'rgba(245, 158, 11, 0.1)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  ratingText: { color: '#f59e0b', fontWeight: '700', fontSize: 13 },
  avisCommentaire: { color: '#94a3b8', lineHeight: 22, fontStyle: 'italic' },
  emptyState: { alignItems: 'center', marginTop: 50 },
  emptyText: { color: '#64748b', fontSize: 16, textAlign: 'center' }
});

