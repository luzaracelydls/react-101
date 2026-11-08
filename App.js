import { useMemo, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const cafeterias = [
  {
    id: "brujula",
    nombre: "Café Brújula",
    zona: "Roma Norte · CDMX",
    calificacion: 4.9,
    precio: "$65",
    categoria: "Especialidad",
    descripcion:
      "Café de origen preparado con calma, pan recién hecho y un patio para quedarse un rato.",
    imagen:
      "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "lento",
    nombre: "Lento Café",
    zona: "Condesa · CDMX",
    calificacion: 4.8,
    precio: "$58",
    categoria: "Panadería",
    descripcion:
      "Un rincón luminoso con espresso mexicano, mesas compartidas y croissants de mantequilla.",
    imagen:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "tostador",
    nombre: "El Tostador",
    zona: "Juárez · CDMX",
    calificacion: 4.7,
    precio: "$72",
    categoria: "Especialidad",
    descripcion:
      "Tostado local, métodos de filtrado y baristas que siempre tienen una recomendación.",
    imagen:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=85",
  },
];

const categorias = ["Todos", "Especialidad", "Panadería"];
const pantallas = ["Inicio", "Mapa", "Configuración"];

export default function App() {
  return (
    <SafeAreaProvider>
      <Aplicacion />
    </SafeAreaProvider>
  );
}

function Aplicacion() {
  const [pantallaActiva, setPantallaActiva] = useState("Inicio");
  const [busqueda, setBusqueda] = useState("");
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [favoritos, setFavoritos] = useState([]);
  const [notificacionesActivas, setNotificacionesActivas] = useState(true);

  const cafeteriasVisibles = useMemo(() => {
    const texto = busqueda.trim().toLocaleLowerCase("es");
    return cafeterias.filter((cafeteria) => {
      const coincideBusqueda = `${cafeteria.nombre} ${cafeteria.zona} ${cafeteria.descripcion}`
        .toLocaleLowerCase("es")
        .includes(texto);
      const coincideCategoria =
        categoriaActiva === "Todos" || cafeteria.categoria === categoriaActiva;
      return coincideBusqueda && coincideCategoria;
    });
  }, [busqueda, categoriaActiva]);

  function alternarFavorito(id) {
    setFavoritos((actuales) =>
      actuales.includes(id)
        ? actuales.filter((favorito) => favorito !== id)
        : [...actuales, id],
    );
  }

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <View style={styles.content}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {pantallaActiva === "Inicio" && (
            <View>
              <View style={styles.topBar}>
                <View>
                  <Text style={styles.eyebrow}>TU GUÍA LOCAL</Text>
                  <Text style={styles.brand}>cafecito<Text style={styles.brandDot}>.</Text></Text>
                </View>
                <View style={styles.locationPill}>
                  <Text style={styles.locationIcon}>⌖</Text>
                  <Text style={styles.locationText}>CDMX</Text>
                </View>
              </View>

              <View style={styles.welcome}>
                <Text style={styles.title}>Encuentra tu{"\n"}próximo café favorito.</Text>
                <Text style={styles.subtitle}>
                  Lugares con buen café y mejores historias.
                </Text>
              </View>

              <View style={styles.searchBox}>
                <Text style={styles.searchIcon}>⌕</Text>
                <TextInput
                  accessibilityLabel="Buscar cafeterías"
                  placeholder="Busca un café o una zona"
                  placeholderTextColor="#8C8A80"
                  value={busqueda}
                  onChangeText={setBusqueda}
                  style={styles.searchInput}
                  returnKeyType="search"
                />
                {busqueda.length > 0 && (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Limpiar búsqueda"
                    onPress={() => setBusqueda("")}
                  >
                    <Text style={styles.clearSearch}>×</Text>
                  </Pressable>
                )}
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryList}
              >
                {categorias.map((categoria) => {
                  const activa = categoriaActiva === categoria;
                  return (
                    <Pressable
                      key={categoria}
                      accessibilityRole="button"
                      accessibilityState={{ selected: activa }}
                      onPress={() => setCategoriaActiva(categoria)}
                      style={[styles.categoryChip, activa && styles.activeCategoryChip]}
                    >
                      <Text
                        style={[
                          styles.categoryText,
                          activa && styles.activeCategoryText,
                        ]}
                      >
                        {categoria}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>

              <View style={styles.sectionHeading}>
                <View>
                  <Text style={styles.sectionTitle}>Para disfrutar hoy</Text>
                  <Text style={styles.sectionSubtitle}>
                    {cafeteriasVisibles.length} lugares para descubrir
                  </Text>
                </View>
                <Text style={styles.sectionMark}>✳</Text>
              </View>

              {cafeteriasVisibles.length > 0 ? (
                cafeteriasVisibles.map((cafeteria) => (
                  <CafeCard
                    key={cafeteria.id}
                    cafeteria={cafeteria}
                    esFavorito={favoritos.includes(cafeteria.id)}
                    onAlternarFavorito={() => alternarFavorito(cafeteria.id)}
                  />
                ))
              ) : (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyIcon}>☕</Text>
                  <Text style={styles.emptyTitle}>No encontramos ese café</Text>
                  <Text style={styles.emptyText}>
                    Prueba con otro nombre, zona o categoría.
                  </Text>
                </View>
              )}
            </View>
          )}

          {pantallaActiva === "Mapa" && (
            <View>
              <Text style={styles.eyebrow}>CERCA DE TI</Text>
              <Text style={styles.pageTitle}>Mapa cafetero</Text>
              <Text style={styles.pageSubtitle}>
                Explora los cafés favoritos de la ciudad.
              </Text>
              <View style={styles.mapCard}>
                <View style={styles.mapBlockOne} />
                <View style={styles.mapBlockTwo} />
                <View style={styles.mapRoadHorizontal} />
                <View style={styles.mapRoadVertical} />
                <View style={styles.mapPark}>
                  <Text style={styles.mapParkText}>PARQUE MÉXICO</Text>
                </View>
                <MapPin top="24%" left="23%" label="B" />
                <MapPin top="48%" left="65%" label="L" />
                <MapPin top="70%" left="40%" label="T" />
                <View style={styles.mapLabel}>
                  <Text style={styles.mapLabelText}>Roma · Condesa</Text>
                </View>
              </View>
              <Text style={styles.sectionTitle}>Cafés en esta zona</Text>
              {cafeterias.slice(0, 3).map((cafeteria) => (
                <Pressable
                  key={cafeteria.id}
                  onPress={() => setPantallaActiva("Inicio")}
                  style={styles.mapCafeRow}
                >
                  <View style={styles.mapCafeIcon}>
                    <Text style={styles.mapCafeIconText}>☕</Text>
                  </View>
                  <View style={styles.mapCafeDetails}>
                    <Text style={styles.mapCafeName}>{cafeteria.nombre}</Text>
                    <Text style={styles.mapCafeZone}>{cafeteria.zona}</Text>
                  </View>
                  <Text style={styles.mapCafeRating}>★ {cafeteria.calificacion}</Text>
                </Pressable>
              ))}
            </View>
          )}

          {pantallaActiva === "Configuración" && (
            <View>
              <Text style={styles.eyebrow}>TU EXPERIENCIA</Text>
              <Text style={styles.pageTitle}>Configuración</Text>
              <Text style={styles.pageSubtitle}>
                Ajusta tu experiencia en cafecito.
              </Text>
              <View style={styles.profileCard}>
                <View style={styles.profileAvatar}>
                  <Text style={styles.profileAvatarText}>C</Text>
                </View>
                <View>
                  <Text style={styles.profileName}>Amante del café</Text>
                  <Text style={styles.profileCaption}>Tu próxima taza te espera</Text>
                </View>
              </View>
              <Text style={styles.settingsHeading}>PREFERENCIAS</Text>
              <View style={styles.settingRow}>
                <View style={styles.settingIcon}>
                  <Text style={styles.settingIconText}>♡</Text>
                </View>
                <View style={styles.settingCopy}>
                  <Text style={styles.settingTitle}>Mis favoritos</Text>
                  <Text style={styles.settingDescription}>
                    {favoritos.length} cafeterías guardadas
                  </Text>
                </View>
                <Text style={styles.settingArrow}>›</Text>
              </View>
              <View style={styles.settingRow}>
                <View style={styles.settingIcon}>
                  <Text style={styles.settingIconText}>◉</Text>
                </View>
                <View style={styles.settingCopy}>
                  <Text style={styles.settingTitle}>Novedades</Text>
                  <Text style={styles.settingDescription}>
                    Recibe recomendaciones de café
                  </Text>
                </View>
                <Switch
                  accessibilityLabel="Activar novedades"
                  value={notificacionesActivas}
                  onValueChange={setNotificacionesActivas}
                  trackColor={{ false: "#D8D5CC", true: "#AAC29F" }}
                  thumbColor={notificacionesActivas ? "#4A684C" : "#F7F5EF"}
                />
              </View>
              <View style={styles.aboutCard}>
                <Text style={styles.aboutTitle}>Hecho para los que aman el café.</Text>
                <Text style={styles.aboutText}>
                  Descubre nuevos rincones, comparte tus favoritos y disfruta
                  cada taza.
                </Text>
              </View>
            </View>
          )}
        </ScrollView>

        <View style={styles.tabBar}>
          {pantallas.map((pantalla) => {
            const activa = pantallaActiva === pantalla;
            const icono =
              pantalla === "Inicio" ? "⌂" : pantalla === "Mapa" ? "⌖" : "⚙";
            return (
              <Pressable
                key={pantalla}
                accessibilityRole="tab"
                accessibilityState={{ selected: activa }}
                onPress={() => setPantallaActiva(pantalla)}
                style={styles.tab}
              >
                <Text style={[styles.tabIcon, activa && styles.activeTabText]}>
                  {icono}
                </Text>
                <Text style={[styles.tabText, activa && styles.activeTabText]}>
                  {pantalla}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

function CafeCard({ cafeteria, esFavorito, onAlternarFavorito }) {
  return (
    <View style={styles.cafeCard}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: cafeteria.imagen }}
          style={styles.cafeImage}
          alt={`Interior de ${cafeteria.nombre}`}
          accessibilityLabel={`Interior de ${cafeteria.nombre}`}
        />
        <View style={styles.imageBadge}>
          <Text style={styles.imageBadgeText}>{cafeteria.categoria}</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={
            esFavorito
              ? `Quitar ${cafeteria.nombre} de favoritos`
              : `Guardar ${cafeteria.nombre} en favoritos`
          }
          accessibilityState={{ selected: esFavorito }}
          onPress={onAlternarFavorito}
          style={styles.favoriteButton}
        >
          <Text
            style={[
              styles.favoriteIcon,
              esFavorito && styles.favoriteIconActive,
            ]}
          >
            {esFavorito ? "♥" : "♡"}
          </Text>
        </Pressable>
      </View>
      <View style={styles.cafeInfo}>
        <View style={styles.cafeHeading}>
          <View style={styles.cafeNameGroup}>
            <Text style={styles.cafeName}>{cafeteria.nombre}</Text>
            <Text style={styles.cafeLocation}>{cafeteria.zona}</Text>
          </View>
          <View style={styles.ratingPill}>
            <Text style={styles.ratingStar}>★</Text>
            <Text style={styles.ratingText}>{cafeteria.calificacion}</Text>
          </View>
        </View>
        <Text style={styles.cafeDescription}>{cafeteria.descripcion}</Text>
        <View style={styles.cardFooter}>
          <Text style={styles.priceLabel}>GASTO PROMEDIO POR CAFÉ</Text>
          <Text style={styles.priceValue}>{cafeteria.precio}</Text>
        </View>
      </View>
    </View>
  );
}

function MapPin({ top, left, label }) {
  return (
    <View style={[styles.mapPin, { top, left }]}>
      <Text style={styles.mapPinText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F7F5EF",
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 28,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 26,
  },
  eyebrow: {
    color: "#7A846F",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2,
  },
  brand: {
    color: "#29372B",
    fontSize: 25,
    fontWeight: "800",
    letterSpacing: -1,
  },
  brandDot: {
    color: "#C8784A",
  },
  locationPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#E9EDE4",
  },
  locationIcon: {
    marginRight: 5,
    color: "#4A684C",
    fontSize: 16,
  },
  locationText: {
    color: "#4A684C",
    fontSize: 12,
    fontWeight: "700",
  },
  welcome: {
    marginBottom: 20,
  },
  title: {
    color: "#29372B",
    fontSize: 29,
    fontWeight: "800",
    letterSpacing: -0.8,
    lineHeight: 34,
  },
  subtitle: {
    marginTop: 8,
    color: "#77786E",
    fontSize: 14,
    lineHeight: 20,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#EAE7DE",
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
  },
  searchIcon: {
    marginRight: 10,
    color: "#687260",
    fontSize: 25,
    lineHeight: 29,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 0,
    color: "#29372B",
    fontSize: 14,
  },
  clearSearch: {
    paddingHorizontal: 5,
    color: "#77786E",
    fontSize: 22,
  },
  categoryList: {
    gap: 8,
    paddingVertical: 16,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: "#ECEAE2",
  },
  activeCategoryChip: {
    backgroundColor: "#344C37",
  },
  categoryText: {
    color: "#686A60",
    fontSize: 12,
    fontWeight: "600",
  },
  activeCategoryText: {
    color: "#FFFFFF",
  },
  sectionHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
    marginBottom: 14,
  },
  sectionTitle: {
    color: "#29372B",
    fontSize: 19,
    fontWeight: "750",
    letterSpacing: -0.3,
  },
  sectionSubtitle: {
    marginTop: 3,
    color: "#8A897F",
    fontSize: 12,
  },
  sectionMark: {
    color: "#C8784A",
    fontSize: 21,
  },
  cafeCard: {
    overflow: "hidden",
    marginBottom: 17,
    borderWidth: 1,
    borderColor: "#EDEAE2",
    borderRadius: 19,
    backgroundColor: "#FFFFFF",
  },
  imageContainer: {
    position: "relative",
    height: 178,
    backgroundColor: "#E3E0D5",
  },
  cafeImage: {
    width: "100%",
    height: "100%",
  },
  imageBadge: {
    position: "absolute",
    top: 13,
    left: 13,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.94)",
  },
  imageBadgeText: {
    color: "#4A684C",
    fontSize: 10,
    fontWeight: "700",
  },
  favoriteButton: {
    position: "absolute",
    top: 11,
    right: 12,
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.94)",
  },
  favoriteIcon: {
    color: "#52564D",
    fontSize: 22,
    lineHeight: 25,
  },
  favoriteIconActive: {
    color: "#BF654B",
  },
  cafeInfo: {
    padding: 15,
  },
  cafeHeading: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  cafeNameGroup: {
    flex: 1,
    paddingRight: 8,
  },
  cafeName: {
    color: "#29372B",
    fontSize: 17,
    fontWeight: "750",
  },
  cafeLocation: {
    marginTop: 3,
    color: "#85857B",
    fontSize: 11,
  },
  ratingPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: "#F5F0E3",
  },
  ratingStar: {
    marginRight: 4,
    color: "#C78A3F",
    fontSize: 12,
  },
  ratingText: {
    color: "#443D2E",
    fontSize: 12,
    fontWeight: "700",
  },
  cafeDescription: {
    marginTop: 11,
    color: "#72736A",
    fontSize: 12,
    lineHeight: 18,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 13,
    paddingTop: 11,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#EAE7DE",
  },
  priceLabel: {
    color: "#8A897F",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.8,
  },
  priceValue: {
    color: "#344C37",
    fontSize: 15,
    fontWeight: "800",
  },
  emptyState: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
  },
  emptyIcon: {
    marginBottom: 12,
    color: "#C8784A",
    fontSize: 30,
  },
  emptyTitle: {
    color: "#29372B",
    fontSize: 16,
    fontWeight: "700",
  },
  emptyText: {
    marginTop: 6,
    color: "#77786E",
    fontSize: 12,
    textAlign: "center",
  },
  tabBar: {
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 5,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E5E2D9",
    backgroundColor: "#FFFFFF",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    paddingVertical: 5,
  },
  tabIcon: {
    color: "#85857B",
    fontSize: 20,
    lineHeight: 23,
  },
  tabText: {
    color: "#85857B",
    fontSize: 10,
    fontWeight: "600",
  },
  activeTabText: {
    color: "#344C37",
    fontWeight: "800",
  },
  pageTitle: {
    marginTop: 7,
    color: "#29372B",
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  pageSubtitle: {
    marginTop: 7,
    marginBottom: 22,
    color: "#77786E",
    fontSize: 13,
    lineHeight: 19,
  },
  mapCard: {
    position: "relative",
    overflow: "hidden",
    height: 315,
    marginBottom: 23,
    borderRadius: 20,
    backgroundColor: "#E8E9DB",
  },
  mapBlockOne: {
    position: "absolute",
    top: "7%",
    left: "-5%",
    width: "48%",
    height: "35%",
    borderRadius: 22,
    backgroundColor: "#DDE3D1",
  },
  mapBlockTwo: {
    position: "absolute",
    right: "-6%",
    bottom: "-2%",
    width: "46%",
    height: "48%",
    borderRadius: 28,
    backgroundColor: "#DFE4D6",
  },
  mapRoadHorizontal: {
    position: "absolute",
    top: "49%",
    left: "-10%",
    width: "125%",
    height: 26,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: "#FFFFFF",
    backgroundColor: "#F3F0E7",
    transform: [{ rotate: "-9deg" }],
  },
  mapRoadVertical: {
    position: "absolute",
    top: "-15%",
    left: "50%",
    width: 25,
    height: "135%",
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: "#FFFFFF",
    backgroundColor: "#F3F0E7",
    transform: [{ rotate: "17deg" }],
  },
  mapPark: {
    position: "absolute",
    top: "24%",
    left: "32%",
    width: "34%",
    height: "28%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 28,
    backgroundColor: "#C4D5B6",
    transform: [{ rotate: "-12deg" }],
  },
  mapParkText: {
    color: "#6E8662",
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 0.7,
  },
  mapPin: {
    position: "absolute",
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#FFFFFF",
    borderRadius: 18,
    backgroundColor: "#344C37",
    elevation: 3,
    shadowColor: "#29372B",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  mapPinText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
  },
  mapLabel: {
    position: "absolute",
    bottom: 13,
    left: 13,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
  },
  mapLabelText: {
    color: "#344C37",
    fontSize: 11,
    fontWeight: "700",
  },
  mapCafeRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E5E2D9",
  },
  mapCafeIcon: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 13,
    backgroundColor: "#E9EDE4",
  },
  mapCafeIconText: {
    fontSize: 17,
  },
  mapCafeDetails: {
    flex: 1,
    marginLeft: 12,
  },
  mapCafeName: {
    color: "#29372B",
    fontSize: 13,
    fontWeight: "700",
  },
  mapCafeZone: {
    marginTop: 3,
    color: "#85857B",
    fontSize: 11,
  },
  mapCafeRating: {
    color: "#9A7538",
    fontSize: 12,
    fontWeight: "700",
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
    marginBottom: 28,
    padding: 17,
    borderRadius: 17,
    backgroundColor: "#E9EDE4",
  },
  profileAvatar: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
    borderRadius: 24,
    backgroundColor: "#D3DDC8",
  },
  profileAvatarText: {
    color: "#344C37",
    fontSize: 20,
    fontWeight: "800",
  },
  profileName: {
    color: "#29372B",
    fontSize: 14,
    fontWeight: "700",
  },
  profileCaption: {
    marginTop: 4,
    color: "#77786E",
    fontSize: 11,
  },
  settingsHeading: {
    marginBottom: 9,
    color: "#85857B",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E5E2D9",
  },
  settingIcon: {
    width: 37,
    height: 37,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#ECEAE2",
  },
  settingIconText: {
    color: "#4A684C",
    fontSize: 18,
  },
  settingCopy: {
    flex: 1,
    marginLeft: 12,
  },
  settingTitle: {
    color: "#29372B",
    fontSize: 13,
    fontWeight: "700",
  },
  settingDescription: {
    marginTop: 4,
    color: "#85857B",
    fontSize: 11,
  },
  settingArrow: {
    paddingHorizontal: 8,
    color: "#85857B",
    fontSize: 24,
  },
  aboutCard: {
    marginTop: 26,
    padding: 18,
    borderRadius: 17,
    backgroundColor: "#344C37",
  },
  aboutTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  aboutText: {
    marginTop: 7,
    color: "#D9E1D2",
    fontSize: 12,
    lineHeight: 18,
  },
});
