import React, { useState, useContext } from 'react'
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, Alert, useWindowDimensions } from 'react-native'
import estilo from '../componentes/estilo'
import ButtonConf from '../componentes/ButtonConf'
import { EquipamentosContext } from '../contextos/EquipamentosContext'
import BarraSuperior from '../componentes/BarraSuperior'
import MenuLateral from '../componentes/MenuLateral'

export default ({ navigation }) => {
    const { adicionarEquipamento } = useContext(EquipamentosContext)
    
    const [mostrarMenu, setmostrarMenu] = useState(false)
    const [menuPerfil, setmenuPerfil] = useState(false)

    const { width } = useWindowDimensions()
    const isTablet = width >= 768

    const [nome, setNome] = useState('')
    const [codigo, setCodigo] = useState('')
    const [dataAquisicao, setDataAquisicao] = useState('')
    const [estadoEquipamento, setEstadoEquipamento] = useState('')
    const [responsavel, setResponsavel] = useState('')
    const [localizacao, setLocalizacao] = useState('')
    const [observacao, setObservacao] = useState('')
    const [foto, setFoto] = useState(require('../assets/equipamento.png'))

    const salvar = () => {
        if (!nome || !codigo || !estadoEquipamento) {
            Alert.alert('Campos Obrigatórios', 'Preencha pelo menos o Nome, Código e Estado do Equipamento.')
            return
        }
        adicionarEquipamento({ nome, codigo, dataAquisicao, estadoEquipamento, responsavel, localizacao, observacao, foto })
        Alert.alert('Sucesso', 'Equipamento adicionado!', [{ text: 'OK', onPress: () => navigation.goBack() }])
    }

    return (
        <View style={{ flex: 1, gap: 50, backgroundColor: 'white', marginTop: isTablet ? '3%' : '10%'}}>
            <BarraSuperior mostrarMenu={mostrarMenu} setmostrarMenu={setmostrarMenu} menuPerfil={menuPerfil} setmenuPerfil={setmenuPerfil} />

            <ScrollView contentContainerStyle={{ paddingBottom: 20, alignItems: 'center', gap: 15 }} showsVerticalScrollIndicator={false}>
                <Text style={estilo.fontGG}>Adicionar Equipamento</Text>

                <TouchableOpacity onPress={() => Alert.alert('Galeria', 'Abrir galeria para foto do equipamento!')} style={{ alignItems: 'center', marginBottom: 10 }}>
                    <Image source={foto} style={{ width: 100, height: 100, borderRadius: 10, borderWidth: 2, borderColor: '#001529' }} />
                    <Text style={[estilo.fontM, { color: '#036aca', marginTop: 5, fontWeight: 'bold' }]}>Adicionar Foto</Text>
                </TouchableOpacity>

                <View style={{ width: '80%', gap: 10 }}>
                    <Text style={estilo.fontM}>Nome do Equipamento:</Text><TextInput style={estilo.txtInput} value={nome} onChangeText={setNome} placeholder="Ex: Câmera Canon" />
                    <Text style={estilo.fontM}>Código / Patrimônio:</Text><TextInput style={estilo.txtInput} value={codigo} onChangeText={setCodigo} placeholder="Ex: EQP-003" />
                    <Text style={estilo.fontM}>Data de Aquisição:</Text><TextInput style={estilo.txtInput} value={dataAquisicao} onChangeText={setDataAquisicao} placeholder="DD/MM/AAAA" />
                    <Text style={estilo.fontM}>Estado (Disponível, Em uso, Manutenção):</Text><TextInput style={estilo.txtInput} value={estadoEquipamento} onChangeText={setEstadoEquipamento} placeholder="Digite o estado" />
                    <Text style={estilo.fontM}>Responsável Atual:</Text><TextInput style={estilo.txtInput} value={responsavel} onChangeText={setResponsavel} placeholder="Ex: Nome do membro" />
                    <Text style={estilo.fontM}>Localização (Sala/Armário):</Text><TextInput style={estilo.txtInput} value={localizacao} onChangeText={setLocalizacao} placeholder="Digite a localização" />
                    <Text style={estilo.fontM}>Observações / Defeitos:</Text><TextInput style={estilo.txtInput} value={observacao} onChangeText={setObservacao} placeholder="Digite anotações extras" />
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