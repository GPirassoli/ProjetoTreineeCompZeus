import React, { useState, useContext } from 'react'
import { View, Text, TouchableOpacity, Image, FlatList, Alert, useWindowDimensions } from 'react-native'
import estilo from '../componentes/estilo'
import { OrcamentoContext } from '../contextos/OrcamentoContext'
import BarraSuperior from '../componentes/BarraSuperior'
import MenuLateral from '../componentes/MenuLateral'

export default ({ navigation }) => {

    const [mostrarMenu, setmostrarMenu] = useState(false)
    const [menuPerfil, setmenuPerfil] = useState(false)
    const [expandirFiltro, setExpandirFiltro] = useState(false)
    const [mostrarAprovado, setMostrarAprovado] = useState(false)
    const [mostrarPendente, setMostrarPendente] = useState(false)
    const [mostrarRejeitado, setMostrarRejeitado] = useState(false)

    const { width } = useWindowDimensions()
    const isTablet = width >= 768

    const { orcamentos, excluirOrcamento } = useContext(OrcamentoContext)

    const statusAtivos = []
    if (mostrarAprovado) statusAtivos.push('Aprovado')
    if (mostrarPendente) statusAtivos.push('Pendente')
    if (mostrarRejeitado) statusAtivos.push('Rejeitado')

    const orcamentosFiltrados = statusAtivos.length > 0 
        ? orcamentos.filter(orc => statusAtivos.includes(orc.status))
        : orcamentos

    return (
        <View style={{ flex: 1, gap: 50, backgroundColor: 'white', marginTop: isTablet ? '3%' : '10%'}}>
            <BarraSuperior mostrarMenu={mostrarMenu} setmostrarMenu={setmostrarMenu} menuPerfil={menuPerfil} setmenuPerfil={setmenuPerfil} />

            <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', paddingTop: 10}}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%', alignItems: 'flex-start', marginBottom: 20 }}>
                    <TouchableOpacity style={{backgroundColor: '#001529', borderRadius: 10, padding: 10, justifyContent: 'center' }} onPress={() => navigation.navigate('AdicionarOrcamento')}>
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
                                    <TouchableOpacity onPress={() => setMostrarAprovado(!mostrarAprovado)}><Text style={[estilo.fontM, mostrarAprovado && { fontWeight: 'bold', color: '#036aca' }]}>Aprovados</Text></TouchableOpacity>
                                    <TouchableOpacity onPress={() => setMostrarPendente(!mostrarPendente)}><Text style={[estilo.fontM, mostrarPendente && { fontWeight: 'bold', color: '#036aca' }]}>Pendentes</Text></TouchableOpacity>
                                    <TouchableOpacity onPress={() => setMostrarRejeitado(!mostrarRejeitado)}><Text style={[estilo.fontM, mostrarRejeitado && { fontWeight: 'bold', color: '#036aca' }]}>Rejeitados</Text></TouchableOpacity>
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>

                <FlatList
                    data={orcamentosFiltrados}
                    keyExtractor={(item, index) => item.id || index.toString()}
                    key={isTablet ? 'tablet' : 'phone'}
                    numColumns={isTablet ? 2 : 1}
                    contentContainerStyle={{ gap: 20, paddingBottom: 20, alignItems: isTablet ? 'center' : 'center' }}
                    columnWrapperStyle={isTablet ? { justifyContent: 'space-between', width: '100%', paddingHorizontal: '5%' } : null}
                    style={{ width: '100%' }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={{ width: isTablet ? '45%' : '80%', borderCurve: 'circular', borderRadius: 10, paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#F5F7FA', gap: 10 }}>
                            <Text style={[estilo.fontM, {backgroundColor: item.status === 'Aprovado' ? '#28a745' : item.status === 'Pendente' ? '#ffc107' : '#dc3545', color: item.status === 'Pendente' ? 'black' : 'white', fontWeight: 'bold', paddingVertical: 5, textAlign: 'center', borderRadius: 10, overflow: 'hidden'}]}>
                                {item.status}
                            </Text>
                            <Text style={[estilo.fontG, {alignSelf: 'center', fontWeight: 'bold', textAlign: 'center'}]}>{item.descricao}</Text>
                            <Text style={[estilo.fontM, {alignSelf: 'center', color: '#036aca', fontWeight: 'bold'}]}>{item.valorEstimado}</Text>
                            <Text style={[estilo.fontPP, {alignSelf: 'center'}]}>Cliente: {item.clienteAssociado}</Text>
                            <Text style={[estilo.fontPP, {alignSelf: 'center', color: 'gray'}]}>Criado em: {item.dataCriacao}</Text>
                            
                            <View style={{flexDirection: 'row', gap: 10, justifyContent: 'center', marginTop: 10}}>
                                <TouchableOpacity style={{backgroundColor: '#001529', borderRadius: 5, borderCurve: 'circular', paddingHorizontal: 10, paddingVertical: 5}} onPress={() => navigation.navigate('DadosOrcamento', { orcamentoId: item.id })}>
                                    <Image source={require('../assets/menu_tres_tracos.png')} style={{width: 24, height: 24, tintColor: 'white'}} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{backgroundColor: 'red', borderRadius: 5, borderCurve: 'circular', paddingHorizontal: 15, paddingVertical: 5, justifyContent: 'center'}} onPress={() => {
                                    Alert.alert('Confirmar Exclusão', 'Deseja excluir este orçamento?', [{ text: 'Cancelar', style: 'cancel' }, { text: 'Excluir', style: 'destructive', onPress: () => excluirOrcamento(item.id) }])
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