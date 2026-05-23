import React, { useState, useContext } from 'react'
import { View, Text, TouchableOpacity, Image, FlatList, Alert, useWindowDimensions } from 'react-native'
import estilo from '../componentes/estilo'
import { PenalidadesContext } from '../contextos/PenalidadesContext'
import BarraSuperior from '../componentes/BarraSuperior'
import MenuLateral from '../componentes/MenuLateral'

export default ({ navigation }) => {

    const [mostrarMenu, setmostrarMenu] = useState(false)
    const [menuPerfil, setmenuPerfil] = useState(false)
    const [expandirFiltro, setExpandirFiltro] = useState(false)
    const [mostrarAtiva, setMostrarAtiva] = useState(false)
    const [mostrarCumprida, setMostrarCumprida] = useState(false)
    const [mostrarCancelada, setMostrarCancelada] = useState(false)

    const { width } = useWindowDimensions()
    const isTablet = width >= 768

    const { penalidades, excluirPenalidade } = useContext(PenalidadesContext)

    const statusAtivos = []
    if (mostrarAtiva) statusAtivos.push('Ativa')
    if (mostrarCumprida) statusAtivos.push('Cumprida')
    if (mostrarCancelada) statusAtivos.push('Cancelada')

    const penalidadesFiltradas = statusAtivos.length > 0 
        ? penalidades.filter(p => statusAtivos.includes(p.status))
        : penalidades

    return (
        <View style={{ flex: 1, gap: 50, backgroundColor: 'white', marginTop: isTablet ? '3%' : '10%'}}>
            <BarraSuperior mostrarMenu={mostrarMenu} setmostrarMenu={setmostrarMenu} menuPerfil={menuPerfil} setmenuPerfil={setmenuPerfil} />

            <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', paddingTop: 10}}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%', alignItems: 'flex-start', marginBottom: 20 }}>
                    <TouchableOpacity style={{backgroundColor: '#001529', borderRadius: 10, padding: 10, justifyContent: 'center' }} onPress={() => navigation.navigate('AdicionarPenalidade')}>
                        <Text style={[estilo.fontM, { color: 'white' }]}>+ Adicionar</Text>
                    </TouchableOpacity>
                    
                    <View style={{backgroundColor: '#F5F7FA', borderColor: 'gray', borderWidth: 2, borderCurve: 'circular', borderRadius: 10, padding: 5}}>
                        <TouchableOpacity style={{ justifyContent: 'center', paddingHorizontal: 10}} onPress={() => setExpandirFiltro(!expandirFiltro)}>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10}}>
                                <Text style={estilo.fontM}>Filtrar</Text>
                                <Image source={require('../assets/open.png')} style={{ width: 15, height: 15, tintColor: '#001529', transform: [{ rotate: expandirFiltro ? '90deg' : '0deg' }]}} />
                            </View>
                            {expandirFiltro && (
                                <View style={{ paddingLeft: 5, borderTopWidth: 1, borderTopColor: '#e0e0e0', gap: 5 }}>
                                    <TouchableOpacity onPress={() => setMostrarAtiva(!mostrarAtiva)}><Text style={[estilo.fontM, mostrarAtiva && { fontWeight: 'bold', color: '#036aca' }]}>Ativas</Text></TouchableOpacity>
                                    <TouchableOpacity onPress={() => setMostrarCumprida(!mostrarCumprida)}><Text style={[estilo.fontM, mostrarCumprida && { fontWeight: 'bold', color: '#036aca' }]}>Cumpridas</Text></TouchableOpacity>
                                    <TouchableOpacity onPress={() => setMostrarCancelada(!mostrarCancelada)}><Text style={[estilo.fontM, mostrarCancelada && { fontWeight: 'bold', color: '#036aca' }]}>Canceladas</Text></TouchableOpacity>
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>

                <FlatList
                    data={penalidadesFiltradas}
                    keyExtractor={(item, index) => item.id || index.toString()}
                    key={isTablet ? 'tablet' : 'phone'}
                    numColumns={isTablet ? 2 : 1}
                    contentContainerStyle={{ gap: 20, paddingBottom: 20, alignItems: isTablet ? 'center' : 'center' }}
                    columnWrapperStyle={isTablet ? { justifyContent: 'space-between', width: '100%', paddingHorizontal: '5%' } : null}
                    style={{ width: '100%' }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={{ width: isTablet ? '45%' : '80%', borderCurve: 'circular', borderRadius: 10, paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#F5F7FA', gap: 10 }}>
                            <Text style={[estilo.fontM, {backgroundColor: item.status === 'Ativa' ? '#dc3545' : item.status === 'Cumprida' ? '#28a745' : '#6c757d', color: 'white', fontWeight: 'bold', paddingVertical: 5, textAlign: 'center', borderRadius: 10, overflow: 'hidden'}]}>
                                {item.status}
                            </Text>
                            <Text style={[estilo.fontG, {alignSelf: 'center', fontWeight: 'bold', textAlign: 'center'}]}>{item.tipo}</Text>
                            <Text style={[estilo.fontM, {alignSelf: 'center', color: '#036aca', fontWeight: 'bold'}]}>{item.membro}</Text>
                            <Text style={[estilo.fontPP, {alignSelf: 'center'}]}>Motivo: {item.motivo}</Text>
                            <Text style={[estilo.fontPP, {alignSelf: 'center', color: 'gray'}]}>Aplicada em: {item.dataAplicacao}</Text>
                            
                            <View style={{flexDirection: 'row', gap: 10, justifyContent: 'center', marginTop: 10}}>
                                <TouchableOpacity style={{backgroundColor: '#001529', borderRadius: 5, borderCurve: 'circular', paddingHorizontal: 10, paddingVertical: 5}} onPress={() => navigation.navigate('DadosPenalidade', { penalidadeId: item.id })}>
                                    <Image source={require('../assets/menu_tres_tracos.png')} style={{width: 24, height: 24, tintColor: 'white'}} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{backgroundColor: 'red', borderRadius: 5, borderCurve: 'circular', paddingHorizontal: 15, paddingVertical: 5, justifyContent: 'center'}} onPress={() => {
                                    Alert.alert('Confirmar Exclusão', 'Deseja excluir esta penalidade?', [{ text: 'Cancelar', style: 'cancel' }, { text: 'Excluir', style: 'destructive', onPress: () => excluirPenalidade(item.id) }])
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