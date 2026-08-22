import { useState } from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

export function Alumno({nombre, matricula, foto}){
    const [registro, setRegistro] = useState(0);
    
    
    function cambiarRegistro(){
        setRegistro = registro + 1 ; // revisar en el break
    }

    return(
        <View>
        <Text>{registro + 1}</Text>
        <Image style={styles.tinyLogo}
        source={{
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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tinyLogo: {
        width: 200,
        height: 200,
        borderRadius: 9999
    },
});