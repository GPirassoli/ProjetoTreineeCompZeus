import React, { useState, useContext } from 'react'
import { View, Text, TouchableOpacity, Image, FlatList, Alert, useWindowDimensions } from 'react-native'
import estilo from '../componentes/estilo'
import ButtonConf from '../componentes/ButtonConf'
import { MembrosContext } from '../contextos/MembrosContext'
import BarraSuperior from '../componentes/BarraSuperior'
import MenuLateral from '../componentes/MenuLateral'

export default ({ navigation }) => {

    const [mostrarMenu, setmostrarMenu] = useState(false)
    const [menuPerfil, setmenuPerfil] = useState(false)
    const [expandirFiltro, setExpandirFiltro] = useState(false)
    const [mostrarGP, setMostrarGP] = useState(false)
    const [mostrarMarketing, setMostrarMarketing] = useState(false)
    const [mostrarVendas, setMostrarVendas] = useState(false)
    const [mostrarProjetos, setMostrarProjetos] = useState(false)
    const [mostrarPresidencia, setMostrarPresidencia] = useState(false)
    const [mostrarDiretoria, setMostrarDiretoria] = useState(false)
    const [mostrarGerencia, setMostrarGerencia] = useState(false)

    // Identifica se é tablet baseado na largura da tela (padrão 768px)
    const { width } = useWindowDimensions()
    const isTablet = width >= 768

    // Puxa as variáveis e funções diretamente do Contexto global
    const { membros, adicionarMembro, excluirMembro } = useContext(MembrosContext)

    // Calcula quais filtros estão ativos e filtra os membros
    const areasAtivas = []
    if (mostrarGP) areasAtivas.push('GP')
    if (mostrarMarketing) areasAtivas.push('Marketing')
    if (mostrarVendas) areasAtivas.push('Vendas')
    if (mostrarProjetos) areasAtivas.push('Projetos')
    if (mostrarPresidencia) areasAtivas.push('Presidencia')
    if (mostrarDiretoria) areasAtivas.push('Diretoria')
    if (mostrarGerencia) areasAtivas.push('Gerência')

    const membrosFiltrados = areasAtivas.length > 0 
        ? membros.filter(membro => areasAtivas.includes(membro.area))
        : membros

    return (
        <View style={{ flex: 1, gap: 50, backgroundColor: 'white', marginTop: isTablet? '3%' : '10%'}}>
            <BarraSuperior mostrarMenu={mostrarMenu} setmostrarMenu={setmostrarMenu} menuPerfil={menuPerfil} setmenuPerfil={setmenuPerfil} />
            <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', paddingTop: 10}}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%', alignItems: 'flex-start', marginBottom: 20 }}>
                    <TouchableOpacity 
                        style={{backgroundColor: '#001529', borderRadius: 10, padding: 10, justifyContent: 'center' }}
                        onPress={() => navigation.navigate('AdicionarMembro')}
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
                                <TouchableOpacity
                                    onPress={() => setMostrarGP(!mostrarGP)}
                                >
                                    <Text style={[estilo.fontM, mostrarGP && { fontWeight: 'bold', color: '#036aca' }]}>GP</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setMostrarMarketing(!mostrarMarketing)}
                                >
                                    <Text style={[estilo.fontM, mostrarMarketing && { fontWeight: 'bold', color: '#036aca' }]}>Marketing</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setMostrarVendas(!mostrarVendas)}
                                >
                                    <Text style={[estilo.fontM, mostrarVendas && { fontWeight: 'bold', color: '#036aca' }]}>Vendas</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setMostrarProjetos(!mostrarProjetos)}
                                >
                                    <Text style={[estilo.fontM, mostrarProjetos && { fontWeight: 'bold', color: '#036aca' }]}>Projetos</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setMostrarPresidencia(!mostrarPresidencia)}
                                >
                                    <Text style={[estilo.fontM, mostrarPresidencia && { fontWeight: 'bold', color: '#036aca' }]}>Presidência</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setMostrarDiretoria(!mostrarDiretoria)}
                                >
                                    <Text style={[estilo.fontM, mostrarDiretoria && { fontWeight: 'bold', color: '#036aca' }]}>Diretoria</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setMostrarGerencia(!mostrarGerencia)}
                                >
                                    <Text style={[estilo.fontM, mostrarGerencia && { fontWeight: 'bold', color: '#036aca' }]}>Gerência</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </TouchableOpacity>
                    </View>
                </View>

                <FlatList
                    data={membrosFiltrados}
                    keyExtractor={(item, index) => item.id || index.toString()}
                    key={isTablet ? 'tablet' : 'phone'} // Necessário para trocar numColumns dinamicamente sem erro
                    numColumns={isTablet ? 2 : 1} // 2 colunas para tablet, 1 para celular
                    contentContainerStyle={{ gap: 20, paddingBottom: 20, alignItems: isTablet ? 'center' : 'center' }}
                    columnWrapperStyle={isTablet ? { justifyContent: 'space-between', width: '100%', paddingHorizontal: '5%' } : null}
                    style={{ width: '100%' }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={{ width: isTablet ? '45%' : '80%', borderCurve: 'circular', borderRadius: 10, paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#F5F7FA', gap: 20 }}>
                            <Text style={[estilo.fontG, {backgroundColor: '#001529', color: 'white', textDecorationColor: 'bold', borderRadius: 10, borderCurve: 'circular'}]}>{item.area}</Text>
                            <Image
                                source={item.foto}
                                style={{width: 100, height: 100, alignSelf: 'center'}}
                            />
                            <Text style={[estilo.fontM, {alignSelf: 'center'}]}>{item.nome}</Text>
                            <Text style={[estilo.fontPP, {alignSelf: 'center'}]}>{item.email}</Text>
                            <View style={{flexDirection: 'row', gap: 10, justifyContent: 'center'}}>
                                <TouchableOpacity
                                    style={{backgroundColor: '#001529', borderRadius: 5, borderCurve: 'circular', paddingHorizontal: 10, paddingVertical: 5}}
                                    onPress={() => Alert.alert('E-mail', item.email)}
                                >
                                    <Image
                                        source={require('../assets/email.png')}
                                        style={{width: 24, height: 24, tintColor: 'white'}}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{backgroundColor: '#001529', borderRadius: 5, borderCurve: 'circular', paddingHorizontal: 10, paddingVertical: 5}}
                                    onPress={() => Alert.alert('Telefone', item.telefone)}
                                >
                                    <Image
                                        source={require('../assets/telefone.png')}
                                        style={{width: 24, height: 24, tintColor: 'white'}}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{backgroundColor: '#001529', borderRadius: 5, borderCurve: 'circular', paddingHorizontal: 10, paddingVertical: 5}}
                                    onPress={() => navigation.navigate('DadosMembro', { membroId: item.id })}
                                >
                                    <Image
                                        source={require('../assets/menu_tres_tracos.png')}
                                        style={{width: 24, height: 24, tintColor: 'white'}}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{backgroundColor: 'red', borderRadius: 5, borderCurve: 'circular', paddingHorizontal: 15, paddingVertical: 5, justifyContent: 'center'}}
                                    onPress={() => {
                                        Alert.alert(
                                            'Confirmar Exclusão',
                                            'Tem certeza que deseja excluir este membro?',
                                            [
                                                { text: 'Cancelar', style: 'cancel' },
                                                {
                                                    text: 'Excluir',
                                                    style: 'destructive',
                                                    onPress: () => excluirMembro(item.id)
                                                }
                                            ]
                                        )
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