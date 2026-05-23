import React, { useContext, useState } from 'react'
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, Alert, useWindowDimensions } from 'react-native'
import { ClientesContext } from '../contextos/ClientesContext'
import estilo from '../componentes/estilo'
import ButtonConf from '../componentes/ButtonConf'
import BarraSuperior from '../componentes/BarraSuperior'
import MenuLateral from '../componentes/MenuLateral'

export default ({ route, navigation }) => {
    const { clienteId } = route.params

    const { clientes, editarCliente } = useContext(ClientesContext)

    const cliente = clientes.find(c => c.id === clienteId)

    const [mostrarMenu, setmostrarMenu] = useState(false)
    const [menuPerfil, setmenuPerfil] = useState(false)

    const [nome, setNome] = useState(cliente?.nome || '')
    const [email, setEmail] = useState(cliente?.email || '')
    const [telefone, setTelefone] = useState(cliente?.telefone || '')
    const [membroResponsavel, setMembroResponsavel] = useState(cliente?.membroResponsavel || '')
    const [segmento, setSegmento] = useState(cliente?.segmento || '')
    const [status, setStatus] = useState(cliente?.status || '')
    const [endereco, setEndereco] = useState(cliente?.endereco || '')
    const [anotacoes, setAnotacoes] = useState(cliente?.anotacoes || cliente?.anotacao || '')
    const [reunioes, setReunioes] = useState(cliente?.reunioes || cliente?.reuniao || '')
    const [propostas, setPropostas] = useState(cliente?.propostas || cliente?.proposta || '')

    const { width: windowWidth } = useWindowDimensions()
    const isTablet = windowWidth >= 768

    const salvar = () => {
        if (!nome || !email || !telefone) {
            Alert.alert('Campos Obrigatórios', 'Preencha pelo menos o Nome, Email e Telefone.')
            return
        }
        Alert.alert(
            'Confirmar Alteração',
            'Deseja realmente salvar as alterações deste cliente?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { 
                    text: 'Confirmar', 
                    onPress: () => {
                        editarCliente(clienteId, {
                            nome, email, telefone, membroResponsavel, segmento, status, endereco, anotacoes, reunioes, propostas
                        })
                        setTimeout(() => {
                            Alert.alert('Sucesso', 'Dados do cliente atualizados!', [
                                { text: 'OK', onPress: () => navigation.goBack() }
                            ])
                        }, 500)
                    }
                }
            ]
        )
    }

    return (
        <View style={{ flex: 1, gap: 50, backgroundColor: 'white', paddingTop: '10%'}}>
            <BarraSuperior mostrarMenu={mostrarMenu} setmostrarMenu={setmostrarMenu} menuPerfil={menuPerfil} setmenuPerfil={setmenuPerfil} />
            
            <ScrollView contentContainerStyle={{ paddingBottom: 20, alignItems: 'center', gap: 15 }} style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }} showsVerticalScrollIndicator={false}>
                <Text style={estilo.fontGG}>Editar Cliente</Text>

                <View style={{ width: isTablet ? 600 : '80%', gap: 10 }}>
                    <Text style={estilo.fontM}>Nome:</Text>
                    <TextInput style={estilo.txtInput} value={nome} onChangeText={setNome} placeholder="Digite o nome" />

                    <Text style={estilo.fontM}>Email:</Text>
                    <TextInput style={estilo.txtInput} value={email} onChangeText={setEmail} placeholder="Digite o email" keyboardType="email-address" autoCapitalize="none" />

                    <Text style={estilo.fontM}>Telefone:</Text>
                    <TextInput style={estilo.txtInput} value={telefone} onChangeText={setTelefone} placeholder="Digite o telefone" keyboardType="phone-pad" />

                    <Text style={estilo.fontM}>Membro Responsável:</Text>
                    <TextInput style={estilo.txtInput} value={membroResponsavel} onChangeText={setMembroResponsavel} placeholder="Digite o responsável" />

                    <Text style={estilo.fontM}>Segmento:</Text>
                    <TextInput style={estilo.txtInput} value={segmento} onChangeText={setSegmento} placeholder="Digite o segmento" />

                    <Text style={estilo.fontM}>Status:</Text>
                    <TextInput style={estilo.txtInput} value={status} onChangeText={setStatus} placeholder="Ex: Ativo, Em Prospecção" />

                    <Text style={estilo.fontM}>Endereço:</Text>
                    <TextInput style={estilo.txtInput} value={endereco} onChangeText={setEndereco} placeholder="Digite o endereço" />

                    <Text style={estilo.fontM}>Anotações:</Text>
                    <TextInput style={estilo.txtInput} value={anotacoes} onChangeText={setAnotacoes} placeholder="Digite anotações" />

                    <Text style={estilo.fontM}>Reuniões:</Text>
                    <TextInput style={estilo.txtInput} value={reunioes} onChangeText={setReunioes} placeholder="Digite sobre reuniões" />

                    <Text style={estilo.fontM}>Propostas:</Text>
                    <TextInput style={estilo.txtInput} value={propostas} onChangeText={setPropostas} placeholder="Digite sobre propostas" />
                </View>

                <View style={{ width: isTablet ? 600 : '80%', flexDirection: 'row', justifyContent: 'space-between', gap: 15, marginTop: 10 }}>
                    <View style={{ flex: 1 }}>
                        <ButtonConf titulo="Cancelar" onPress={() => navigation.goBack()} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <ButtonConf titulo="Salvar" onPress={salvar} />
                    </View>
                </View>
            </ScrollView>

            <MenuLateral mostrarMenu={mostrarMenu} setmostrarMenu={setmostrarMenu} navigation={navigation} />
        </View>
    )
}