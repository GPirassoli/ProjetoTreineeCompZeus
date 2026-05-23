import React, { useContext, useState } from 'react'
import { View, Text, TouchableOpacity, Image, Alert, useWindowDimensions } from 'react-native'
import { ClientesContext } from '../contextos/ClientesContext'
import estilo from '../componentes/estilo'
import ButtonConf from '../componentes/ButtonConf'
import BarraSuperior from '../componentes/BarraSuperior'
import MenuLateral from '../componentes/MenuLateral'

export default ({ route, navigation }) => {
    // 1. Acessa o parâmetro de cliente passado na navegação
    const { clienteId } = route.params

    // 2. Puxa a lista de clientes do Contexto Global
    const { clientes, excluirCliente } = useContext(ClientesContext)

    // 3. Procura os dados completos do cliente através do ID
    const cliente = clientes.find(c => c.id === clienteId)

    const [mostrarMenu, setmostrarMenu] = useState(false)
    const [menuPerfil, setmenuPerfil] = useState(false)

    const { width } = useWindowDimensions()
    const isTablet = width >= 768

    return (
        <View style={{ flex: 1, gap: 50, backgroundColor: 'white', paddingTop: '10%'}}>
            <BarraSuperior mostrarMenu={mostrarMenu} setmostrarMenu={setmostrarMenu} menuPerfil={menuPerfil} setmenuPerfil={setmenuPerfil} />
            <View style={{ justifyContent: 'flex-end', backgroundColor: 'white', alignItems: 'center', gap: 5}}>
                <Text style={estilo.fontM}><Text style={{fontWeight: 'bold'}}>Nome:</Text> {cliente?.nome}</Text>
                <Text style={estilo.fontM}><Text style={{fontWeight: 'bold'}}>Email:</Text> {cliente?.email}</Text>
                <Text style={estilo.fontM}><Text style={{fontWeight: 'bold'}}>Telefone:</Text> {cliente?.telefone}</Text>
                <Text style={estilo.fontM}><Text style={{fontWeight: 'bold'}}>Membro Resp.:</Text> {cliente?.membroResponsavel}</Text>
                <Text style={estilo.fontM}><Text style={{fontWeight: 'bold'}}>Segmento:</Text> {cliente?.segmento}</Text>
                <Text style={estilo.fontM}><Text style={{fontWeight: 'bold'}}>Status:</Text> {cliente?.status}</Text>
                <Text style={estilo.fontM}><Text style={{fontWeight: 'bold', textAlign: 'center'}}>Endereço:</Text> {cliente?.endereco}</Text>
                <Text style={estilo.fontM}><Text style={{fontWeight: 'bold', textAlign: 'center'}}>Anotações:</Text> {cliente?.anotacoes || cliente?.anotacao}</Text>
                <Text style={estilo.fontM}><Text style={{fontWeight: 'bold', textAlign: 'center'}}>Reuniões:</Text> {cliente?.reunioes || cliente?.reuniao}</Text>
                <Text style={estilo.fontM}><Text style={{fontWeight: 'bold', textAlign: 'center'}}>Propostas:</Text> {cliente?.propostas || cliente?.proposta}</Text>
            </View>
            <View style={{gap: 15}}>
                <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center', gap: 15}}>
                    <View style={{ flex: 1 }}>
                        <ButtonConf titulo="Editar" onPress={() => navigation.navigate('EditarCliente', { clienteId: cliente?.id })} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <ButtonConf titulo="Excluir" onPress={() => {
                            Alert.alert(
                                'Confirmar Exclusão',
                                'Tem certeza que deseja excluir este cliente?',
                                [
                                    { text: 'Cancelar', style: 'cancel' },
                                    {
                                        text: 'Excluir',
                                        style: 'destructive',
                                        onPress: () => {
                                            excluirCliente(cliente?.id)
                                            navigation.goBack()
                                        }
                                    }
                                ]
                            )
                        }} />
                    </View>
                </View>
                <View style={{ width: '80%', alignSelf: 'center' }}>
                    <ButtonConf titulo="Voltar" onPress={() => navigation.goBack()} />
                </View>
            </View>

            <MenuLateral mostrarMenu={mostrarMenu} setmostrarMenu={setmostrarMenu} navigation={navigation} />
        </View>
    )
}