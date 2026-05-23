import React, { useState, useContext } from 'react'
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, Alert, useWindowDimensions } from 'react-native'
import estilo from '../componentes/estilo'
import ButtonConf from '../componentes/ButtonConf'
import { EquipamentosContext } from '../contextos/EquipamentosContext'
import BarraSuperior from '../componentes/BarraSuperior'
import MenuLateral from '../componentes/MenuLateral'

export default ({ route, navigation }) => {
    const { equipamentoId } = route.params
    const { equipamentos, editarEquipamento } = useContext(EquipamentosContext)
    const eqp = equipamentos.find(e => e.id === equipamentoId)
    
    const [mostrarMenu, setmostrarMenu] = useState(false)
    const [menuPerfil, setmenuPerfil] = useState(false)

    const [nome, setNome] = useState(eqp?.nome || '')
    const [codigo, setCodigo] = useState(eqp?.codigo || '')
    const [dataAquisicao, setDataAquisicao] = useState(eqp?.dataAquisicao || '')
    const [estadoEquipamento, setEstadoEquipamento] = useState(eqp?.estadoEquipamento || '')
    const [responsavel, setResponsavel] = useState(eqp?.responsavel || '')
    const [localizacao, setLocalizacao] = useState(eqp?.localizacao || '')
    const [observacao, setObservacao] = useState(eqp?.observacao || '')
    const [foto, setFoto] = useState(eqp?.foto || require('../assets/equipamento.png'))

    const { width: windowWidth } = useWindowDimensions()
    const isTablet = windowWidth >= 768

    const salvar = () => {
        if (!nome || !codigo || !estadoEquipamento) {
            Alert.alert('Campos Obrigatórios', 'Preencha pelo menos o Nome, Código e Estado.')
            return
        }
        Alert.alert('Confirmar Alteração', 'Deseja realmente salvar as alterações?', [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Confirmar', onPress: () => {
                editarEquipamento(equipamentoId, { nome, codigo, dataAquisicao, estadoEquipamento, responsavel, localizacao, observacao, foto })
                setTimeout(() => { Alert.alert('Sucesso', 'Dados atualizados!', [{ text: 'OK', onPress: () => navigation.goBack() }]) }, 500)
            }}
        ])
    }

    return (
        <View style={{ flex: 1, gap: 50, backgroundColor: 'white', marginTop: isTablet ? '3%' : '10%'}}>
            <BarraSuperior mostrarMenu={mostrarMenu} setmostrarMenu={setmostrarMenu} menuPerfil={menuPerfil} setmenuPerfil={setmenuPerfil} />

            <ScrollView contentContainerStyle={{ paddingBottom: 20, alignItems: 'center', gap: 15 }} showsVerticalScrollIndicator={false}>
                <Text style={estilo.fontGG}>Editar Equipamento</Text>
                <TouchableOpacity onPress={() => Alert.alert('Galeria', 'Abrir galeria para trocar foto!')} style={{ alignItems: 'center', marginBottom: 10 }}>
                    <Image source={foto} style={{ width: 100, height: 100, borderRadius: 10, borderWidth: 2, borderColor: '#001529' }} />
                    <Text style={[estilo.fontM, { color: '#036aca', marginTop: 5, fontWeight: 'bold' }]}>Alterar Foto</Text>
                </TouchableOpacity>
                <View style={{ width: isTablet ? 600 : '80%', gap: 10 }}>
                    <Text style={estilo.fontM}>Nome:</Text><TextInput style={estilo.txtInput} value={nome} onChangeText={setNome} placeholder="Nome" />
                    <Text style={estilo.fontM}>Código:</Text><TextInput style={estilo.txtInput} value={codigo} onChangeText={setCodigo} placeholder="Código" />
                    <Text style={estilo.fontM}>Data Aquisição:</Text><TextInput style={estilo.txtInput} value={dataAquisicao} onChangeText={setDataAquisicao} placeholder="Data" />
                    <Text style={estilo.fontM}>Estado:</Text><TextInput style={estilo.txtInput} value={estadoEquipamento} onChangeText={setEstadoEquipamento} placeholder="Estado" />
                    <Text style={estilo.fontM}>Responsável:</Text><TextInput style={estilo.txtInput} value={responsavel} onChangeText={setResponsavel} placeholder="Responsável" />
                    <Text style={estilo.fontM}>Localização:</Text><TextInput style={estilo.txtInput} value={localizacao} onChangeText={setLocalizacao} placeholder="Localização" />
                    <Text style={estilo.fontM}>Observações:</Text><TextInput style={estilo.txtInput} value={observacao} onChangeText={setObservacao} placeholder="Anotações" />
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