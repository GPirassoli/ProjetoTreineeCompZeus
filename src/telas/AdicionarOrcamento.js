import React, { useState, useContext } from 'react'
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, Alert, useWindowDimensions } from 'react-native'
import estilo from '../componentes/estilo'
import ButtonConf from '../componentes/ButtonConf'
import { OrcamentoContext } from '../contextos/OrcamentoContext'
import BarraSuperior from '../componentes/BarraSuperior'
import MenuLateral from '../componentes/MenuLateral'

export default ({ navigation }) => {
    const [mostrarMenu, setmostrarMenu] = useState(false)
    const [menuPerfil, setmenuPerfil] = useState(false)

    const { width } = useWindowDimensions()
    const isTablet = width >= 768

    const { adicionarOrcamento } = useContext(OrcamentoContext)
    
    const [descricao, setDescricao] = useState('')
    const [clienteAssociado, setClienteAssociado] = useState('')
    const [membroResponsavel, setMembroResponsavel] = useState('')
    const [valorEstimado, setValorEstimado] = useState('')
    const [dataCriacao, setDataCriacao] = useState('')
    const [status, setStatus] = useState('')

    const salvar = () => {
        if (!descricao || !clienteAssociado || !valorEstimado || !status) {
            Alert.alert('Campos Obrigatórios', 'Preencha Descrição, Cliente, Valor e Status.')
            return
        }
        adicionarOrcamento({ descricao, clienteAssociado, membroResponsavel, valorEstimado, dataCriacao, status })
        Alert.alert('Sucesso', 'Orçamento salvo!', [{ text: 'OK', onPress: () => navigation.goBack() }])
    }

    return (
        <View style={{ flex: 1, gap: 50, backgroundColor: 'white', marginTop: isTablet ? '3%' : '10%'}}>
            <BarraSuperior mostrarMenu={mostrarMenu} setmostrarMenu={setmostrarMenu} menuPerfil={menuPerfil} setmenuPerfil={setmenuPerfil} />

            <ScrollView contentContainerStyle={{ paddingBottom: 20, alignItems: 'center', gap: 15 }} showsVerticalScrollIndicator={false}>
                <Text style={estilo.fontGG}>Criar Orçamento</Text>

                <View style={{ width: '80%', gap: 10 }}>
                    <Text style={estilo.fontM}>Descrição / Projeto:</Text>
                    <TextInput style={estilo.txtInput} value={descricao} onChangeText={setDescricao} placeholder="Ex: Criação de E-commerce" />
                    
                    <Text style={estilo.fontM}>Cliente Associado:</Text>
                    <TextInput style={estilo.txtInput} value={clienteAssociado} onChangeText={setClienteAssociado} placeholder="Nome do Cliente/Empresa" />
                    
                    <Text style={estilo.fontM}>Membro Responsável:</Text>
                    <TextInput style={estilo.txtInput} value={membroResponsavel} onChangeText={setMembroResponsavel} placeholder="Ex: Lucas Almeida" />
                    
                    <Text style={estilo.fontM}>Valor Estimado:</Text>
                    <TextInput style={estilo.txtInput} value={valorEstimado} onChangeText={setValorEstimado} placeholder="Ex: R$ 5.000,00" keyboardType="numeric" />
                    
                    <Text style={estilo.fontM}>Data de Criação:</Text>
                    <TextInput style={estilo.txtInput} value={dataCriacao} onChangeText={setDataCriacao} placeholder="DD/MM/AAAA" />
                    
                    <Text style={estilo.fontM}>Status:</Text>
                    <TextInput style={estilo.txtInput} value={status} onChangeText={setStatus} placeholder="Pendente, Aprovado, Rejeitado" />
                </View>

                <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'space-between', gap: 15, marginTop: 10 }}>
                    <View style={{ flex: 1 }}><ButtonConf titulo="Cancelar" onPress={() => navigation.goBack()} /></View>
                    <View style={{ flex: 1 }}><ButtonConf titulo="Salvar" onPress={salvar} /></View>
                </View>
            </ScrollView>

            <MenuLateral mostrarMenu={mostrarMenu} setmostrarMenu={setmostrarMenu} navigation={navigation} />
        </View>
    )
}