import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Image, Text, View, ScrollView } from 'react-native';
import { Alumno } from './Alumno';
//import { Producto } from './Producto';
import * as alumnos from './alumnos.json';
import { Navegacion } from './Navegacion';

export default function App() {
  
  const alumnosArray = alumnos.alumnos;
  
  return (
    <ScrollView>
    <View style={styles.wrapper}>
      <StatusBar style="auto" />
    <View>
      <Text>Texto de Encabezado</Text>
    </View>
    <View style={styles.container}>
    
    {
      alumnosArray.map((alumno, index) => (
        
        <Alumno registro={index} nombre={index + " "   + alumno.nombre } matricula={alumno.matricula} foto={alumno.foto}></Alumno>
      ))
    }
    
    </View>
    <Navegacion></Navegacion>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {

    flexWrap: 'nowrap',
    backgroundColor: '#fff'
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    overflow: 'scroll'
  },
  cajaAlumno: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
