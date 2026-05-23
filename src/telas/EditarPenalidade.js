import React, { useState, useContext } from 'react'
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, Alert, useWindowDimensions } from 'react-native'
import estilo from '../componentes/estilo'
import ButtonConf from '../componentes/ButtonConf'
import { PenalidadesContext } from '../contextos/PenalidadesContext'
import BarraSuperior from '../componentes/BarraSuperior'
import MenuLateral from '../componentes/MenuLateral'

export default ({ route, navigation }) => {
    const { penalidadeId } = route.params
    const { penalidades, editarPenalidade } = useContext(PenalidadesContext)
    const pen = penalidades.find(p => p.id === penalidadeId)

    const [mostrarMenu, setmostrarMenu] = useState(false)
    const [menuPerfil, setmenuPerfil] = useState(false)
    
    const [membro, setMembro] = useState(pen?.membro || '')
    const [tipo, setTipo] = useState(pen?.tipo || '')
    const [motivo, setMotivo] = useState(pen?.motivo || '')
    const [dataAplicacao, setDataAplicacao] = useState(pen?.dataAplicacao || '')
    const [status, setStatus] = useState(pen?.status || '')
    const [evidencia, setEvidencia] = useState(pen?.evidencia || 'Nenhum arquivo anexado')

    const { width: windowWidth } = useWindowDimensions()
    const isTablet = windowWidth >= 768

    const salvar = () => {
        if (!membro || !tipo || !motivo || !status) {
            Alert.alert('Campos Obrigatórios', 'Preencha o Membro, Tipo, Motivo e Status.')
            return
        }
        Alert.alert('Confirmar Alteração', 'Deseja realmente salvar as alterações?', [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Confirmar', onPress: () => {
                editarPenalidade(penalidadeId, { membro, tipo, motivo, dataAplicacao, status, evidencia })
                setTimeout(() => { Alert.alert('Sucesso', 'Penalidade atualizada!', [{ text: 'OK', onPress: () => navigation.goBack() }]) }, 500)
            }}
        ])
    }

    return (
        <View style={{ flex: 1, gap: 50, backgroundColor: 'white', marginTop: isTablet ? '3%' : '10%'}}>
            <BarraSuperior mostrarMenu={mostrarMenu} setmostrarMenu={setmostrarMenu} menuPerfil={menuPerfil} setmenuPerfil={setmenuPerfil} />

            <ScrollView contentContainerStyle={{ paddingBottom: 20, alignItems: 'center', gap: 15 }} showsVerticalScrollIndicator={false}>
                <Text style={estilo.fontGG}>Editar Penalidade</Text>

                <View style={{ width: isTablet ? 600 : '80%', gap: 10 }}>
                    <Text style={estilo.fontM}>Membro Autuado:</Text>
                    <TextInput style={estilo.txtInput} value={membro} onChangeText={setMembro} placeholder="Nome do membro" />
                    
                    <Text style={estilo.fontM}>Tipo de Penalidade:</Text>
                    <TextInput style={estilo.txtInput} value={tipo} onChangeText={setTipo} placeholder="Ex: Advertência, Suspensão" />
                    
                    <Text style={estilo.fontM}>Motivo:</Text>
                    <TextInput style={estilo.txtInput} value={motivo} onChangeText={setMotivo} placeholder="Descrição breve do motivo" />
                    
                    <Text style={estilo.fontM}>Data de Aplicação:</Text>
                    <TextInput style={estilo.txtInput} value={dataAplicacao} onChangeText={setDataAplicacao} placeholder="DD/MM/AAAA" />
                    
                    <Text style={estilo.fontM}>Status:</Text>
                    <TextInput style={estilo.txtInput} value={status} onChangeText={setStatus} placeholder="Ativa, Cumprida, Cancelada" />

                    <Text style={estilo.fontM}>Evidências / Documento (PDF):</Text>
                    <TouchableOpacity 
                        style={{ backgroundColor: '#F5F7FA', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#036aca', alignItems: 'center' }}
                        onPress={() => { Alert.alert('Arquivos', 'Simulando abertura da galeria de documentos...'); setEvidencia('documento_atualizado.pdf'); }}
                    >
                        <Text style={[estilo.fontPP, { color: '#036aca', fontWeight: 'bold' }]}>Trocar Arquivo (PDF)</Text>
                    </TouchableOpacity>
                    <Text style={[estilo.fontPP, { textAlign: 'center', color: 'gray' }]}>{evidencia}</Text>
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