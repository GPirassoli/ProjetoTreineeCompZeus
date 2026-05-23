import React, { useState, useContext } from 'react'
import { View, Text, TouchableOpacity, Image, FlatList, Alert, useWindowDimensions } from 'react-native'
import estilo from '../componentes/estilo'
import { ClientesContext } from '../contextos/ClientesContext'
import BarraSuperior from '../componentes/BarraSuperior'
import MenuLateral from '../componentes/MenuLateral'

export default ({ navigation }) => {

    const [mostrarMenu, setmostrarMenu] = useState(false)
    const [menuPerfil, setmenuPerfil] = useState(false)
    const [expandirFiltro, setExpandirFiltro] = useState(false)
    const [mostrarAtivo, setMostrarAtivo] = useState(false)
    const [mostrarEmNegociacao, setMostrarEmNegociacao] = useState(false)
    const [mostrarInativo, setMostrarInativo] = useState(false)
    const [mostrarLead, setMostrarLead] = useState(false)

    const { width } = useWindowDimensions()
    const isTablet = width >= 768

    // Puxa a lista de clientes do contexto global
    const { clientes, excluirCliente } = useContext(ClientesContext)

    // Calcula quais filtros estão ativos e filtra os clientes
    const statusAtivos = []
    if (mostrarAtivo) { statusAtivos.push('Ativo'); statusAtivos.push('Ativos'); }
    if (mostrarEmNegociacao) { statusAtivos.push('Em negociação'); statusAtivos.push('Em Prospecção'); }
    if (mostrarInativo) statusAtivos.push('Inativo')
    if (mostrarLead) statusAtivos.push('Lead')

    const clientesFiltrados = statusAtivos.length > 0 
        ? clientes.filter(cliente => statusAtivos.includes(cliente.status))
        : clientes

    return (
        <View style={{ flex: 1, gap: 50, backgroundColor: 'white', paddingTop: '10%'}}>
            <BarraSuperior mostrarMenu={mostrarMenu} setmostrarMenu={setmostrarMenu} menuPerfil={menuPerfil} setmenuPerfil={setmenuPerfil} />
            
            <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', paddingTop: 10}}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%', alignItems: 'flex-start', marginBottom: 20 }}>
                    <TouchableOpacity 
                        style={{backgroundColor: '#001529', borderRadius: 10, padding: 10, justifyContent: 'center' }}
                        onPress={() => navigation.navigate('AdicionarCliente')}
                    >
                        <Text style={[estilo.fontM, { color: 'white' }]}>+ Adicionar</Text>
                    </TouchableOpacity>
                    
                    <View style={{backgroundColor: '#F5F7FA', borderColor: 'gray', borderWidth: 2, borderCurve: 'circular', borderRadius: 10, padding: 5}}>
                        <TouchableOpacity //Filtro
                            style={{ justifyContent: 'center', paddingHorizontal: 10}}
                        onPress={() => setExpandirFiltro(!expandirFiltro)}
                    >
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10}}>
                            <Text style={estilo.fontM}>Filtrar</Text>
                            <Image 
                                source={require('../assets/open.png')}
                                style={{ width: 15, height: 15, tintColor: '#001529', transform: [{ rotate: expandirFiltro ? '90deg' : '0deg' }]}}
                            />
                        </View>
                        {expandirFiltro && (
                            <View style={{ paddingLeft: 5, borderTopWidth: 1, borderTopColor: '#e0e0e0', gap: 5 }}>
                                <TouchableOpacity onPress={() => setMostrarAtivo(!mostrarAtivo)}>
                                    <Text style={[estilo.fontM, mostrarAtivo && { fontWeight: 'bold', color: '#036aca' }]}>Ativos</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setMostrarEmNegociacao(!mostrarEmNegociacao)}>
                                    <Text style={[estilo.fontM, mostrarEmNegociacao && { fontWeight: 'bold', color: '#036aca' }]}>Em Negociação</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setMostrarInativo(!mostrarInativo)}>
                                    <Text style={[estilo.fontM, mostrarInativo && { fontWeight: 'bold', color: '#036aca' }]}>Inativo</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setMostrarLead(!mostrarLead)}>
                                    <Text style={[estilo.fontM, mostrarLead && { fontWeight: 'bold', color: '#036aca' }]}>Lead</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </TouchableOpacity>
                    </View>
                </View>

                <FlatList
                    data={clientesFiltrados}
                    keyExtractor={(item, index) => item.id || index.toString()}
                    key={isTablet ? 'tablet' : 'phone'}
                    numColumns={isTablet ? 2 : 1}
                    contentContainerStyle={{ gap: 20, paddingBottom: 20, alignItems: isTablet ? 'center' : 'center' }}
                    columnWrapperStyle={isTablet ? { justifyContent: 'space-between', width: '100%', paddingHorizontal: '5%' } : null}
                    style={{ width: '100%' }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={{ width: isTablet ? '45%' : '80%', borderCurve: 'circular', borderRadius: 10, paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#F5F7FA', gap: 10 }}>
                            <Text style={[estilo.fontM, {backgroundColor: item.status === 'Ativo' ? '#28a745' : '#001529', color: 'white', fontWeight: 'bold', paddingVertical: 5, textAlign: 'center', borderRadius: 10, overflow: 'hidden'}]}>
                                {item.status}
                            </Text>
                            
                            <Text style={[estilo.fontG, {alignSelf: 'center', fontWeight: 'bold'}]}>{item.nome}</Text>
                            <Text style={[estilo.fontM, {alignSelf: 'center', color: 'gray'}]}>{item.segmento}</Text>
                            <Text style={[estilo.fontPP, {alignSelf: 'center'}]}>Resp: {item.membroResponsavel}</Text>
                            
                            <View style={{flexDirection: 'row', gap: 10, justifyContent: 'center', marginTop: 10}}>
                                <TouchableOpacity
                                    style={{backgroundColor: '#001529', borderRadius: 5, borderCurve: 'circular', paddingHorizontal: 10, paddingVertical: 5}}
                                    onPress={() => Alert.alert('E-mail', item.email || 'Não informado')}
                                >
                                    <Image source={require('../assets/email.png')} style={{width: 24, height: 24, tintColor: 'white'}} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{backgroundColor: '#001529', borderRadius: 5, borderCurve: 'circular', paddingHorizontal: 10, paddingVertical: 5}}
                                    onPress={() => Alert.alert('Telefone', item.telefone || 'Não informado')}
                                >
                                    <Image source={require('../assets/telefone.png')} style={{width: 24, height: 24, tintColor: 'white'}} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{backgroundColor: '#001529', borderRadius: 5, borderCurve: 'circular', paddingHorizontal: 10, paddingVertical: 5}}
                                    onPress={() => navigation.navigate('DadosCliente', { clienteId: item.id })}
                                >
                                    <Image source={require('../assets/menu_tres_tracos.png')} style={{width: 24, height: 24, tintColor: 'white'}} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{backgroundColor: 'red', borderRadius: 5, borderCurve: 'circular', paddingHorizontal: 15, paddingVertical: 5, justifyContent: 'center'}}
                                    onPress={() => {
                                        Alert.alert('Confirmar Exclusão', 'Tem certeza que deseja excluir este cliente?', [
                                            { text: 'Cancelar', style: 'cancel' },
                                            { text: 'Excluir', style: 'destructive', onPress: () => excluirCliente(item.id) }
                                        ])
                                    }}
                                >
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            </View>

            <MenuLateral mostrarMenu={mostrarMenu} setmostrarMenu={setmostrarMenu} navigation={navigation} />
        </View>
    )
}