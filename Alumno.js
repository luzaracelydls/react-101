import { useState } from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';

export function Alumno({nombre, matricula, foto, registro}){
    
    return(
        <View>
        <Text>{registro}</Text>
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