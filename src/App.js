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
import AdicionarMembro from './telas/AdicionarMembro'
import DadosMembro from './telas/DadosMembro'
import EditarMembro from './telas/EditarMembro'
import Clientes from './telas/Clientes'
import AdicionarCliente from './telas/AdicionarCliente'
import DadosCliente from './telas/DadosCliente'
import EditarCliente from './telas/EditarCliente'
import Equipamentos from './telas/Equipamentos'
import Orcamento from './telas/Orcamento'
import Penalidades from './telas/Penalidades'
import { MembrosProvider } from './contextos/MembrosContext'
import { ClientesProvider } from './contextos/ClientesContext'
import { EquipamentosProvider } from './contextos/EquipamentosContext'
import AdicionarEquipamento from './telas/AdicionarEquipamento'
import DadosEquipamento from './telas/DadosEquipamento'
import EditarEquipamento from './telas/EditarEquipamento'
import HistoricoEquipamentos from './telas/HistoricoEquipamentos'
import { OrcamentoProvider } from './contextos/OrcamentoContext'
import AdicionarOrcamento from './telas/AdicionarOrcamento'
import DadosOrcamento from './telas/DadosOrcamento'
import EditarOrcamento from './telas/EditarOrcamento'
import { PenalidadesProvider } from './contextos/PenalidadesContext'
import AdicionarPenalidade from './telas/AdicionarPenalidade'
import DadosPenalidade from './telas/DadosPenalidade'
import EditarPenalidade from './telas/EditarPenalidade'

const Stack = createNativeStackNavigator()

export default props => {
    return (
        <MembrosProvider>
            <ClientesProvider>
                <EquipamentosProvider>
                    <OrcamentoProvider>
                        <PenalidadesProvider>
                            <NavigationContainer>
                                <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                                    <Stack.Screen name="Login" component={Login} />
                                    <Stack.Screen name="EsqueciSenha1" component={EsqueciSenha1} />
                                    <Stack.Screen name="EsqueciSenha2" component={EsqueciSenha2} />
                                    <Stack.Screen name="EsqueciSenha3" component={EsqueciSenha3} />
                                    <Stack.Screen name="EsqueciSenha4" component={EsqueciSenha4} />
                                    <Stack.Screen name="Home" component={Home} />
                                    <Stack.Screen name="Membros" component={Membros} />
                                    <Stack.Screen name="AdicionarMembro" component={AdicionarMembro} />
                                    <Stack.Screen name="DadosMembro" component={DadosMembro} />
                                    <Stack.Screen name="EditarMembro" component={EditarMembro} />
                                    <Stack.Screen name="Clientes" component={Clientes} />
                                    <Stack.Screen name="AdicionarCliente" component={AdicionarCliente} />
                                    <Stack.Screen name="DadosCliente" component={DadosCliente} />
                                    <Stack.Screen name="EditarCliente" component={EditarCliente} />
                                    <Stack.Screen name="Equipamentos" component={Equipamentos} />
                                    <Stack.Screen name="AdicionarEquipamento" component={AdicionarEquipamento} />
                                    <Stack.Screen name="DadosEquipamento" component={DadosEquipamento} />
                                    <Stack.Screen name="EditarEquipamento" component={EditarEquipamento} />
                                    <Stack.Screen name="HistoricoEquipamentos" component={HistoricoEquipamentos} />
                                    <Stack.Screen name="Orcamento" component={Orcamento} />
                                    <Stack.Screen name="AdicionarOrcamento" component={AdicionarOrcamento} />
                                    <Stack.Screen name="DadosOrcamento" component={DadosOrcamento} />
                                    <Stack.Screen name="EditarOrcamento" component={EditarOrcamento} />
                                    <Stack.Screen name="Penalidades" component={Penalidades} />
                                    <Stack.Screen name="AdicionarPenalidade" component={AdicionarPenalidade} />
                                    <Stack.Screen name="DadosPenalidade" component={DadosPenalidade} />
                                    <Stack.Screen name="EditarPenalidade" component={EditarPenalidade} />
                                </Stack.Navigator>
                            </NavigationContainer>
                        </PenalidadesProvider>
                    </OrcamentoProvider>
                </EquipamentosProvider>
            </ClientesProvider>
        </MembrosProvider>
    )
}