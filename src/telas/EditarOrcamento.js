import React, { useState, useContext } from 'react'
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, Alert, useWindowDimensions } from 'react-native'
import estilo from '../componentes/estilo'
import ButtonConf from '../componentes/ButtonConf'
import { OrcamentoContext } from '../contextos/OrcamentoContext'
import BarraSuperior from '../componentes/BarraSuperior'
import MenuLateral from '../componentes/MenuLateral'

export default ({ route, navigation }) => {
    const { orcamentoId } = route.params
    const { orcamentos, editarOrcamento } = useContext(OrcamentoContext)
    const orc = orcamentos.find(o => o.id === orcamentoId)

    const [mostrarMenu, setmostrarMenu] = useState(false)
    const [menuPerfil, setmenuPerfil] = useState(false)
    
    const [descricao, setDescricao] = useState(orc?.descricao || '')
    const [clienteAssociado, setClienteAssociado] = useState(orc?.clienteAssociado || '')
    const [membroResponsavel, setMembroResponsavel] = useState(orc?.membroResponsavel || '')
    const [valorEstimado, setValorEstimado] = useState(orc?.valorEstimado || '')
    const [dataCriacao, setDataCriacao] = useState(orc?.dataCriacao || '')
    const [status, setStatus] = useState(orc?.status || '')

    const { width: windowWidth } = useWindowDimensions()
    const isTablet = windowWidth >= 768

    const salvar = () => {
        if (!descricao || !clienteAssociado || !valorEstimado || !status) {
            Alert.alert('Campos Obrigatórios', 'Preencha Descrição, Cliente, Valor e Status.')
            return
        }
        Alert.alert('Confirmar Alteração', 'Deseja realmente salvar as alterações?', [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Confirmar', onPress: () => {
                editarOrcamento(orcamentoId, { descricao, clienteAssociado, membroResponsavel, valorEstimado, dataCriacao, status })
                setTimeout(() => { Alert.alert('Sucesso', 'Orçamento atualizado!', [{ text: 'OK', onPress: () => navigation.goBack() }]) }, 500)
            }}
        ])
    }

    return (
        <View style={{ flex: 1, gap: 50, backgroundColor: 'white', marginTop: isTablet ? '3%' : '10%'}}>
            <BarraSuperior mostrarMenu={mostrarMenu} setmostrarMenu={setmostrarMenu} menuPerfil={menuPerfil} setmenuPerfil={setmenuPerfil} />

            <ScrollView contentContainerStyle={{ paddingBottom: 20, alignItems: 'center', gap: 15 }} showsVerticalScrollIndicator={false}>
                <Text style={estilo.fontGG}>Editar Orçamento</Text>

                <View style={{ width: isTablet ? 600 : '80%', gap: 10 }}>
                    <Text style={estilo.fontM}>Descrição / Projeto:</Text>
                    <TextInput style={estilo.txtInput} value={descricao} onChangeText={setDescricao} placeholder="Descrição" />
                    
                    <Text style={estilo.fontM}>Cliente Associado:</Text>
                    <TextInput style={estilo.txtInput} value={clienteAssociado} onChangeText={setClienteAssociado} placeholder="Cliente" />
                    
                    <Text style={estilo.fontM}>Membro Responsável:</Text>
                    <TextInput style={estilo.txtInput} value={membroResponsavel} onChangeText={setMembroResponsavel} placeholder="Responsável" />
                    
                    <Text style={estilo.fontM}>Valor Estimado:</Text>
                    <TextInput style={estilo.txtInput} value={valorEstimado} onChangeText={setValorEstimado} placeholder="R$ 0,00" keyboardType="numeric" />
                    
                    <Text style={estilo.fontM}>Data de Criação:</Text>
                    <TextInput style={estilo.txtInput} value={dataCriacao} onChangeText={setDataCriacao} placeholder="DD/MM/AAAA" />
                    
                    <Text style={estilo.fontM}>Status:</Text>
                    <TextInput style={estilo.txtInput} value={status} onChangeText={setStatus} placeholder="Pendente, Aprovado, Rejeitado" />
                </View>

                <View style={{ width: isTablet ? 600 : '80%', flexDirection: 'row', justifyContent: 'space-between', gap: 15, marginTop: 10 }}>
                    <View style={{ flex: 1 }}><ButtonConf titulo="Cancelar" onPress={() => navigation.goBack()} /></View>
                    <View style={{ flex: 1 }}><ButtonConf titulo="Salvar" onPress={salvar} /></View>
                </View>
            </ScrollView>

            <MenuLateral mostrarMenu={mostrarMenu} setmostrarMenu={setmostrarMenu} navigation={navigation} />
        </View>
    )
}