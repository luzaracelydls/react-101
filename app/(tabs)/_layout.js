import {Tabs} from 'expo-router';

export default function TabsLayout(){
    
    return(
        <Tabs screenOptions={
            {headerShown: true}
        }>
        
            <Tabs.Screen name="index"/>
            <Tabs.Screen name="alumnos"/>
        </Tabs>
    )
}