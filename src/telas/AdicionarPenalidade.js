import React, { useState, useContext } from 'react'
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, Alert, useWindowDimensions } from 'react-native'
import estilo from '../componentes/estilo'
import ButtonConf from '../componentes/ButtonConf'
import { PenalidadesContext } from '../contextos/PenalidadesContext'
import BarraSuperior from '../componentes/BarraSuperior'
import MenuLateral from '../componentes/MenuLateral'

export default ({ navigation }) => {
    const [mostrarMenu, setmostrarMenu] = useState(false)
    const [menuPerfil, setmenuPerfil] = useState(false)

    const { adicionarPenalidade } = useContext(PenalidadesContext)
    
    const [membro, setMembro] = useState('')
    const [tipo, setTipo] = useState('')
    const [motivo, setMotivo] = useState('')
    const [dataAplicacao, setDataAplicacao] = useState('')
    const [status, setStatus] = useState('')
    const [evidencia, setEvidencia] = useState('Nenhum arquivo anexado')

    const { width: windowWidth } = useWindowDimensions()
    const isTablet = windowWidth >= 768

    const salvar = () => {
        if (!membro || !tipo || !motivo || !status) {
            Alert.alert('Campos Obrigatórios', 'Preencha o Membro, Tipo, Motivo e Status.')
            return
        }
        adicionarPenalidade({ membro, tipo, motivo, dataAplicacao, status, evidencia })
        Alert.alert('Sucesso', 'Penalidade registrada!', [{ text: 'OK', onPress: () => navigation.goBack() }])
    }

    return (
        <View style={{ flex: 1, gap: 50, backgroundColor: 'white', marginTop: isTablet ? '3%' : '10%'}}>
            <BarraSuperior mostrarMenu={mostrarMenu} setmostrarMenu={setmostrarMenu} menuPerfil={menuPerfil} setmenuPerfil={setmenuPerfil} />

            <ScrollView contentContainerStyle={{ paddingBottom: 20, alignItems: 'center', gap: 15 }} showsVerticalScrollIndicator={false}>
                <Text style={estilo.fontGG}>Aplicar Penalidade</Text>

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
                        onPress={() => { Alert.alert('Arquivos', 'Simulando abertura da galeria de documentos...'); setEvidencia('documento_comprobatorio.pdf'); }}
                    >
                        <Text style={[estilo.fontPP, { color: '#036aca', fontWeight: 'bold' }]}>Anexar Arquivo (PDF)</Text>
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