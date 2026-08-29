import { StatusBar } from 'expo-status-bar';
import {  StyleSheet, View, Pressable, Text, Image } from 'react-native';
import {Button} from 'react-native-paper';

export function Navegacion(){
    return(
        <View style={styles.container}>
            <Button>
                <Image src='https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png'
                style={styles.imagen}/>Titulo  1
            </Button>
            <Button>
                <Image src=''/>
                Titulo 2</Button>
            <Button>
                <Image src=''/>
                Titulo 3</Button>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
       
    },
    tab: {
        flex: 1,
        borderColor: 'red',
        borderWidth: 3,
        padding: 25,
        margin: 0
    },
    imagen: {
        width: 20,
        height: 20
    }
})