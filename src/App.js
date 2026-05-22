import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './telas/Login'
import Home from './telas/Home'
import EsqueciSenha1 from './telas/EsqueciSenha1'
import EsqueciSenha2 from './telas/EsqueciSenha2'
import EsqueciSenha3 from './telas/EsqueciSenha3'
import EsqueciSenha4 from './telas/EsqueciSenha4'
import Membros from './telas/Membros'
import Clientes from './telas/Clientes'
import Equipamentos from './telas/Equipamentos'
import Orcamento from './telas/Orcamento'
import Penalidades from './telas/Penalidades'

const Stack = createNativeStackNavigator()

export default props => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="EsqueciSenha1" component={EsqueciSenha1} />
                <Stack.Screen name="EsqueciSenha2" component={EsqueciSenha2} />
                <Stack.Screen name="EsqueciSenha3" component={EsqueciSenha3} />
                <Stack.Screen name="EsqueciSenha4" component={EsqueciSenha4} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Membros" component={Membros} />
                <Stack.Screen name="Clientes" component={Clientes} />
                <Stack.Screen name="Equipamentos" component={Equipamentos} />
                <Stack.Screen name="Orcamento" component={Orcamento} />
                <Stack.Screen name="Penalidades" component={Penalidades} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}