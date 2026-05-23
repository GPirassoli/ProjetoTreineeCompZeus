import React, { useContext, useState } from 'react'
import { View, Text, Image, Alert, TouchableOpacity, useWindowDimensions } from 'react-native'
import { PenalidadesContext } from '../contextos/PenalidadesContext'
import estilo from '../componentes/estilo'
import ButtonConf from '../componentes/ButtonConf'
import BarraSuperior from '../componentes/BarraSuperior'
import MenuLateral from '../componentes/MenuLateral'

export default ({ route, navigation }) => {
    const { penalidadeId } = route.params
    const { penalidades, excluirPenalidade } = useContext(PenalidadesContext)
    const pen = penalidades.find(p => p.id === penalidadeId)

    const [mostrarMenu, setmostrarMenu] = useState(false)
    const [menuPerfil, setmenuPerfil] = useState(false)

    const { width } = useWindowDimensions()
    const isTablet = width >= 768

    return (
        <View style={{ flex: 1, gap: 50, backgroundColor: 'white', marginTop: isTablet ? '3%' : '10%'}}>
            <BarraSuperior mostrarMenu={mostrarMenu} setmostrarMenu={setmostrarMenu} menuPerfil={menuPerfil} setmenuPerfil={setmenuPerfil} />
            
            <View style={{ justifyContent: 'flex-end', backgroundColor: 'white', alignItems: 'center', gap: 10}}>
                <Image source={require('../assets/penalidades.png')} style={{ width: 80, height: 80, alignSelf: 'center', marginBottom: 10, tintColor: '#001529' }} />
                <Text style={[estilo.fontM, {backgroundColor: pen?.status === 'Ativa' ? '#dc3545' : pen?.status === 'Cumprida' ? '#28a745' : '#6c757d', color: 'white', fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 15, textAlign: 'center', borderRadius: 10, overflow: 'hidden'}]}>
                    Status: {pen?.status}
                </Text>
                <Text style={[estilo.fontM, {textAlign: 'center', marginHorizontal: 20}]}><Text style={{fontWeight: 'bold'}}>Membro:</Text> <Text style={{color: '#036aca', fontWeight: 'bold'}}>{pen?.membro}</Text></Text>
                <Text style={estilo.fontM}><Text style={{fontWeight: 'bold'}}>Tipo:</Text> {pen?.tipo}</Text>
                <Text style={estilo.fontM}><Text style={{fontWeight: 'bold'}}>Motivo:</Text> {pen?.motivo}</Text>
                <Text style={estilo.fontM}><Text style={{fontWeight: 'bold'}}>Aplicada em:</Text> {pen?.dataAplicacao}</Text>
                
                <View style={{ alignItems: 'center', marginTop: 10 }}>
                    <Text style={[estilo.fontM, { fontWeight: 'bold' }]}>Documento Anexo:</Text>
                    <TouchableOpacity onPress={() => Alert.alert('Download', 'Baixando PDF anexo...')} style={{ marginTop: 5, padding: 10, backgroundColor: '#F5F7FA', borderRadius: 8, borderWidth: 1, borderColor: '#ccc' }}>
                        <Text style={{ color: '#036aca', fontWeight: 'bold' }}>📄 {pen?.evidencia}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{gap: 15, marginTop: 20}}>
                <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center', gap: 15}}>
                    <View style={{ flex: 1 }}><ButtonConf titulo="Editar" onPress={() => navigation.navigate('EditarPenalidade', { penalidadeId: pen?.id })} /></View>
                    <View style={{ flex: 1 }}><ButtonConf titulo="Excluir" onPress={() => {
                        Alert.alert('Confirmar Exclusão', 'Deseja excluir esta penalidade do histórico?', [
                            { text: 'Cancelar', style: 'cancel' },
                            { text: 'Excluir', style: 'destructive', onPress: () => { excluirPenalidade(pen?.id); navigation.goBack() } }
                        ])
                    }} /></View>
                </View>
                <View style={{ width: '80%', alignSelf: 'center' }}>
                    <ButtonConf titulo="Voltar" onPress={() => navigation.goBack()} />
                </View>
            </View>

            <MenuLateral mostrarMenu={mostrarMenu} setmostrarMenu={setmostrarMenu} navigation={navigation} />
        </View>
    )
}