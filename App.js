import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Image, Text, View } from 'react-native';
import { Alumno } from './Alumno';
//import { Producto } from './Producto';

export default function App() {
  return (
    <View style={styles.container}>
      
      <Alumno nombre= "Carlos Adrian Barragan Soriano" matricula="2177525" foto="https://media.istockphoto.com/id/2094337676/es/foto/equipo-diverso-que-trabaja-en-conjunto-en-un-moderno-espacio-de-coworking.jpg?s=612x612&w=0&k=20&c=-lR_zWwquQHxmVyDuBwFnQr6JZr_in9qSvUjAYljnSU="></Alumno>
      <Alumno nombre="Victor Manuel Colin Sanchez" matricula="2177628" foto="https://cdn-icons-png.flaticon.com/512/8093/8093497.png"></Alumno>  
      <Alumno nombre="Rebeca Sanchez Rodriguez" matricula="2043917" foto="https://thumbs.dreamstime.com/b/estudiante-universitaria-femenina-con-smartphone-de-escuela-linda-mujer-joven-sola-aislada-vector-plana-escolar-ilustraci%C3%B3n-en-262489756.jpg"></Alumno>  
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});
