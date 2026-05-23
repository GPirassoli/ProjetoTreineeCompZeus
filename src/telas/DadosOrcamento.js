import React, { useContext, useState } from 'react'
import { View, Text, Image, Alert, TouchableOpacity, useWindowDimensions } from 'react-native'
import { OrcamentoContext } from '../contextos/OrcamentoContext'
import estilo from '../componentes/estilo'
import ButtonConf from '../componentes/ButtonConf'
import BarraSuperior from '../componentes/BarraSuperior'
import MenuLateral from '../componentes/MenuLateral'

export default ({ route, navigation }) => {
    const { orcamentoId } = route.params
    const { orcamentos, excluirOrcamento } = useContext(OrcamentoContext)
    const orc = orcamentos.find(o => o.id === orcamentoId)

    const [mostrarMenu, setmostrarMenu] = useState(false)
    const [menuPerfil, setmenuPerfil] = useState(false)

    const { width } = useWindowDimensions()
    const isTablet = width >= 768

    return (
        <View style={{ flex: 1, gap: 50, backgroundColor: 'white', marginTop: isTablet ? '3%' : '10%'}}>
            <BarraSuperior mostrarMenu={mostrarMenu} setmostrarMenu={setmostrarMenu} menuPerfil={menuPerfil} setmenuPerfil={setmenuPerfil} />
            
            <View style={{ justifyContent: 'flex-end', backgroundColor: 'white', alignItems: 'center', gap: 10}}>
                <Image source={require('../assets/orcamento.png')} style={{ width: 80, height: 80, alignSelf: 'center', marginBottom: 10, tintColor: '#001529' }} />
                <Text style={[estilo.fontM, {backgroundColor: orc?.status === 'Aprovado' ? '#28a745' : orc?.status === 'Pendente' ? '#ffc107' : '#dc3545', color: orc?.status === 'Pendente' ? 'black' : 'white', fontWeight: 'bold', paddingVertical: 5, paddingHorizontal: 15, textAlign: 'center', borderRadius: 10, overflow: 'hidden'}]}>
                    Status: {orc?.status}
                </Text>
                <Text style={[estilo.fontM, {textAlign: 'center', marginHorizontal: 20}]}><Text style={{fontWeight: 'bold'}}>Descrição:</Text> {orc?.descricao}</Text>
                <Text style={estilo.fontM}><Text style={{fontWeight: 'bold'}}>Cliente:</Text> {orc?.clienteAssociado}</Text>
                <Text style={estilo.fontM}><Text style={{fontWeight: 'bold'}}>Responsável:</Text> {orc?.membroResponsavel}</Text>
                <Text style={estilo.fontM}><Text style={{fontWeight: 'bold'}}>Valor Estimado:</Text> <Text style={{color: '#036aca', fontWeight: 'bold'}}>{orc?.valorEstimado}</Text></Text>
                <Text style={estilo.fontM}><Text style={{fontWeight: 'bold'}}>Data de Criação:</Text> {orc?.dataCriacao}</Text>
            </View>

            <View style={{gap: 15}}>
                <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center', gap: 15}}>
                    <View style={{ flex: 1 }}><ButtonConf titulo="Editar" onPress={() => navigation.navigate('EditarOrcamento', { orcamentoId: orc?.id })} /></View>
                    <View style={{ flex: 1 }}><ButtonConf titulo="Excluir" onPress={() => {
                        Alert.alert('Confirmar Exclusão', 'Deseja excluir este orçamento?', [
                            { text: 'Cancelar', style: 'cancel' },
                            { text: 'Excluir', style: 'destructive', onPress: () => { excluirOrcamento(orc?.id); navigation.goBack() } }
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