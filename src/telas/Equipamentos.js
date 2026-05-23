import React, { useState, useContext } from 'react'
import { View, Text, TouchableOpacity, Image, FlatList, Alert, useWindowDimensions } from 'react-native'
import estilo from '../componentes/estilo'
import { EquipamentosContext } from '../contextos/EquipamentosContext'
import BarraSuperior from '../componentes/BarraSuperior'
import MenuLateral from '../componentes/MenuLateral'

export default ({ navigation }) => {

    const [mostrarMenu, setmostrarMenu] = useState(false)
    const [menuPerfil, setmenuPerfil] = useState(false)
    const [expandirFiltro, setExpandirFiltro] = useState(false)
    const [mostrarDisponivel, setMostrarDisponivel] = useState(false)
    const [mostrarEmUso, setMostrarEmUso] = useState(false)
    const [mostrarManutencao, setMostrarManutencao] = useState(false)

    const { width } = useWindowDimensions()
    const isTablet = width >= 768

    const { equipamentos, excluirEquipamento } = useContext(EquipamentosContext)

    const statusAtivos = []
    if (mostrarDisponivel) statusAtivos.push('Disponível')
    if (mostrarEmUso) statusAtivos.push('Em uso')
    if (mostrarManutencao) statusAtivos.push('Manutenção')

    const eqpFiltrados = statusAtivos.length > 0 
        ? equipamentos.filter(eqp => statusAtivos.includes(eqp.estadoEquipamento))
        : equipamentos

    return (
        <View style={{ flex: 1, gap: 50, backgroundColor: 'white', paddingTop: '10%'}}>
            <BarraSuperior mostrarMenu={mostrarMenu} setmostrarMenu={setmostrarMenu} menuPerfil={menuPerfil} setmenuPerfil={setmenuPerfil} />

            <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', paddingTop: 10}}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%', alignItems: 'flex-start', marginBottom: 20 }}>
                    <TouchableOpacity style={{backgroundColor: '#001529', borderRadius: 10, padding: 10, justifyContent: 'center' }} onPress={() => navigation.navigate('AdicionarEquipamento')}>
                        <Text style={[estilo.fontM, { color: 'white' }]}>+ Adicionar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: '#036aca', borderRadius: 10, padding: 10, justifyContent: 'center' }} onPress={() => navigation.navigate('HistoricoEquipamentos')}>
                        <Text style={[estilo.fontM, { color: 'white' }]}>Histórico</Text>
                    </TouchableOpacity>
                    
                    <View style={{backgroundColor: '#F5F7FA', borderColor: 'gray', borderWidth: 2, borderCurve: 'circular', borderRadius: 10, padding: 5}}>
                        <TouchableOpacity style={{ justifyContent: 'center', paddingHorizontal: 10}} onPress={() => setExpandirFiltro(!expandirFiltro)}>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10}}>
                                <Text style={estilo.fontM}>Filtrar</Text>
                                <Image source={require('../assets/open.png')} style={{ width: 15, height: 15, tintColor: '#001529', transform: [{ rotate: expandirFiltro ? '90deg' : '0deg' }]}} />
                            </View>
                            {expandirFiltro && (
                                <View style={{ paddingLeft: 5, borderTopWidth: 1, borderTopColor: '#e0e0e0', gap: 5 }}>
                                    <TouchableOpacity onPress={() => setMostrarDisponivel(!mostrarDisponivel)}><Text style={[estilo.fontM, mostrarDisponivel && { fontWeight: 'bold', color: '#036aca' }]}>Disponível</Text></TouchableOpacity>
                                    <TouchableOpacity onPress={() => setMostrarEmUso(!mostrarEmUso)}><Text style={[estilo.fontM, mostrarEmUso && { fontWeight: 'bold', color: '#036aca' }]}>Em uso</Text></TouchableOpacity>
                                    <TouchableOpacity onPress={() => setMostrarManutencao(!mostrarManutencao)}><Text style={[estilo.fontM, mostrarManutencao && { fontWeight: 'bold', color: '#036aca' }]}>Manutenção</Text></TouchableOpacity>
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>

                <FlatList
                    data={eqpFiltrados}
                    keyExtractor={(item, index) => item.id || index.toString()}
                    key={isTablet ? 'tablet' : 'phone'}
                    numColumns={isTablet ? 2 : 1}
                    contentContainerStyle={{ gap: 20, paddingBottom: 20, alignItems: isTablet ? 'center' : 'center' }}
                    columnWrapperStyle={isTablet ? { justifyContent: 'space-between', width: '100%', paddingHorizontal: '5%' } : null}
                    style={{ width: '100%' }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={{ width: isTablet ? '45%' : '80%', borderCurve: 'circular', borderRadius: 10, paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#F5F7FA', gap: 10 }}>
                            <Text style={[estilo.fontM, {backgroundColor: item.estadoEquipamento === 'Disponível' ? '#28a745' : item.estadoEquipamento === 'Em uso' ? '#ffc107' : '#dc3545', color: item.estadoEquipamento === 'Em uso' ? 'black' : 'white', fontWeight: 'bold', paddingVertical: 5, textAlign: 'center', borderRadius: 10, overflow: 'hidden'}]}>
                                {item.estadoEquipamento}
                            </Text>
                            <Image source={item.foto} style={{width: 100, height: 100, alignSelf: 'center'}} />
                            <Text style={[estilo.fontG, {alignSelf: 'center', fontWeight: 'bold'}]}>{item.nome}</Text>
                            <Text style={[estilo.fontM, {alignSelf: 'center', color: 'gray'}]}>Cód: {item.codigo}</Text>
                            <Text style={[estilo.fontPP, {alignSelf: 'center'}]}>Resp: {item.responsavel || 'Nenhum'}</Text>
                            
                            <View style={{flexDirection: 'row', gap: 10, justifyContent: 'center', marginTop: 10}}>
                                <TouchableOpacity style={{backgroundColor: '#001529', borderRadius: 5, borderCurve: 'circular', paddingHorizontal: 10, paddingVertical: 5}} onPress={() => navigation.navigate('DadosEquipamento', { equipamentoId: item.id })}>
                                    <Image source={require('../assets/menu_tres_tracos.png')} style={{width: 24, height: 24, tintColor: 'white'}} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{backgroundColor: 'red', borderRadius: 5, borderCurve: 'circular', paddingHorizontal: 15, paddingVertical: 5, justifyContent: 'center'}} onPress={() => {
                                    Alert.alert('Confirmar Exclusão', 'Deseja excluir este equipamento?', [{ text: 'Cancelar', style: 'cancel' }, { text: 'Excluir', style: 'destructive', onPress: () => excluirEquipamento(item.id) }])
                                }}><Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text></TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            </View>

            <MenuLateral mostrarMenu={mostrarMenu} setmostrarMenu={setmostrarMenu} navigation={navigation} />
        </View>
    )
}