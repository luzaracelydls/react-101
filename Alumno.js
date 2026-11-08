import { Image, StyleSheet, Text, View } from "react-native";

export default function Alumno({nombre, matricula, foto, Semestre}) {
  return(
    <View>
      <Image style = {styles.tinyLogo}
          source = {{
            uri: foto,
          }}/>

      <Text>{nombre}</Text>
      <Text>{matricula}</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center'
  },

  tinyLogo:{
    width:50, 
    height: 50,
  }

});
