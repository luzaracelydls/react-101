import { useState } from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';

export default function Alumnos({nombre, matricula, foto, registro}){
    
    return(
        <View style={styles.container}>
        
        <Image style={styles.tinyLogo}
        source={{
            uri: foto,
        }}/>
        <Text>{nombre} - {matricula}</Text>
        
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        backgroundColor: '#fff',
        borderRadius: 20,
        borderColor: 'pink',
        borderWidth: 2,
        marginTop: 10,
        marginBottom: 10,
        marginRight: 15,
        marginLeft: 15
    },
    tinyLogo: {
        width: 200,
        height: 200,
        borderRadius: 9999
    },
});