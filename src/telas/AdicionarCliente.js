import React, { useState, useContext } from 'react'
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, Alert, useWindowDimensions } from 'react-native'
import estilo from '../componentes/estilo'
import ButtonConf from '../componentes/ButtonConf'
import { ClientesContext } from '../contextos/ClientesContext'
import BarraSuperior from '../componentes/BarraSuperior'
import MenuLateral from '../componentes/MenuLateral'

export default ({ navigation }) => {

    const [mostrarMenu, setmostrarMenu] = useState(false)
    const [menuPerfil, setmenuPerfil] = useState(false)

    const { width } = useWindowDimensions()
    const isTablet = width >= 768

    const { adicionarCliente } = useContext(ClientesContext)
    
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')
    const [membroResponsavel, setMembroResponsavel] = useState('')
    const [segmento, setSegmento] = useState('')
    const [status, setStatus] = useState('')
    const [endereco, setEndereco] = useState('')
    const [anotacoes, setAnotacoes] = useState('')
    const [reunioes, setReunioes] = useState('')
    const [propostas, setPropostas] = useState('')

    const salvar = () => {
        if (!nome || !email || !telefone) {
            Alert.alert('Campos Obrigatórios', 'Preencha pelo menos o Nome, Email e Telefone.')
            return
        }
        adicionarCliente({
            nome, email, telefone, membroResponsavel, segmento, status, endereco, anotacoes, reunioes, propostas
        })
        Alert.alert('Sucesso', 'Cliente adicionado com sucesso!', [
            { text: 'OK', onPress: () => navigation.goBack() }
        ])
    }

    return (
        <View style={{ flex: 1, gap: 50, backgroundColor: 'white', marginTop: isTablet ? '3%' : '10%'}}>
            <BarraSuperior mostrarMenu={mostrarMenu} setmostrarMenu={setmostrarMenu} menuPerfil={menuPerfil} setmenuPerfil={setmenuPerfil} />

            <ScrollView contentContainerStyle={{ paddingBottom: 20, alignItems: 'center', gap: 15 }} style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }} showsVerticalScrollIndicator={false}>
                <Text style={estilo.fontGG}>Adicionar Cliente</Text>

                <View style={{ width: '80%', gap: 10 }}>
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

                <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'space-between', gap: 15, marginTop: 10 }}>
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