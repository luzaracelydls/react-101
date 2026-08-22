import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Image, Text, View } from 'react-native';
import { Alumno } from './Alumno';
//import { Producto } from './Producto';
import * as alumnos from './alumnos.json';

export default function App() {

  const alumnosArray = alumnos.alumnos;

  return (
    <View style={styles.container}>
      {
        alumnosArray.map((alumno, index) => (
          
          <Alumno registro={index} nombre={index + " "   + alumno.nombre } matricula={alumno.matricula} foto={alumno.foto}></Alumno>
        ))
      }
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
