import React, { useContext, useState } from 'react'
import { View, Text, Image, Alert, TouchableOpacity, useWindowDimensions } from 'react-native'
import { EquipamentosContext } from '../contextos/EquipamentosContext'
import estilo from '../componentes/estilo'
import ButtonConf from '../componentes/ButtonConf'
import BarraSuperior from '../componentes/BarraSuperior'
import MenuLateral from '../componentes/MenuLateral'

export default ({ route, navigation }) => {
    const { equipamentoId } = route.params
    const { equipamentos, excluirEquipamento } = useContext(EquipamentosContext)
    const eqp = equipamentos.find(e => e.id === equipamentoId)

    const [mostrarMenu, setmostrarMenu] = useState(false)
    const [menuPerfil, setmenuPerfil] = useState(false)

    const { width } = useWindowDimensions()
    const isTablet = width >= 768

    return (
        <View style={{ flex: 1, gap: 50, backgroundColor: 'white', paddingTop: '10%'}}>
            <BarraSuperior mostrarMenu={mostrarMenu} setmostrarMenu={setmostrarMenu} menuPerfil={menuPerfil} setmenuPerfil={setmenuPerfil} />
            <View style={{ justifyContent: 'flex-end', backgroundColor: 'white', alignItems: 'center', gap: 5}}>
                <Image source={eqp?.foto} style={{ width: 100, height: 100, alignSelf: 'center', marginBottom: 20, borderRadius: 10 }} />
                <Text style={estilo.fontM}><Text style={{fontWeight: 'bold'}}>Nome:</Text> {eqp?.nome}</Text>
                <Text style={estilo.fontM}><Text style={{fontWeight: 'bold'}}>Código:</Text> {eqp?.codigo}</Text>
                <Text style={estilo.fontM}><Text style={{fontWeight: 'bold'}}>Aquisição:</Text> {eqp?.dataAquisicao}</Text>
                <Text style={estilo.fontM}><Text style={{fontWeight: 'bold'}}>Estado:</Text> {eqp?.estadoEquipamento}</Text>
                <Text style={estilo.fontM}><Text style={{fontWeight: 'bold'}}>Responsável:</Text> {eqp?.responsavel || 'Nenhum'}</Text>
                <Text style={estilo.fontM}><Text style={{fontWeight: 'bold'}}>Localização:</Text> {eqp?.localizacao}</Text>
                <Text style={estilo.fontM}><Text style={{fontWeight: 'bold'}}>Observação:</Text> {eqp?.observacao}</Text>
            </View>
            <View style={{gap: 15}}>
                <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center', gap: 15}}>
                    <View style={{ flex: 1 }}><ButtonConf titulo="Editar" onPress={() => navigation.navigate('EditarEquipamento', { equipamentoId: eqp?.id })} /></View>
                    <View style={{ flex: 1 }}><ButtonConf titulo="Excluir" onPress={() => {
                        Alert.alert('Confirmar Exclusão', 'Deseja excluir este equipamento?', [
                            { text: 'Cancelar', style: 'cancel' },
                            { text: 'Excluir', style: 'destructive', onPress: () => { excluirEquipamento(eqp?.id); navigation.goBack() } }
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