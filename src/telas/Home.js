import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, useWindowDimensions } from 'react-native'
import estilo from '../componentes/estilo'
import ButtonConf from '../componentes/ButtonConf'
import Pedido from '../componentes/Pedido'
import BarraSuperior from '../componentes/BarraSuperior'
import MenuLateral from '../componentes/MenuLateral'

export default ({ navigation }) => {

    const [mostrarMenu, setmostrarMenu] = useState(false)
    const [menuPerfil, setmenuPerfil] = useState(false)
    const [expandirMembros, setExpandirMembros] = useState(false)
    const [expandirClientes, setExpandirClientes] = useState(false)
    const [expandirEquipamentos, setExpandirEquipamentos] = useState(false)
    const [expandirOrcamento, setExpandirOrcamento] = useState(false)
    const [expandirPenalidades, setExpandirPenalidades] = useState(false)

    const { width } = useWindowDimensions()
    const isTablet = width >= 768

    return (
        <View style={{ flex: 1, gap: 50, backgroundColor: 'white', marginTop: isTablet? '3%' : '10%'}}>
            <BarraSuperior mostrarMenu={mostrarMenu} setmostrarMenu={setmostrarMenu} menuPerfil={menuPerfil} setmenuPerfil={setmenuPerfil} />
            <ScrollView contentContainerStyle={{justifyContent: 'center', backgroundColor: 'white', alignItems: 'center', gap: 25, paddingBottom: 20}} showsVerticalScrollIndicator={false}>
                {/* Barra Pesquisar */}
                <View style={{ justifyContent: 'space-between', alignItems: 'center', width: '80%', flexDirection: 'row'}}>
                    <TextInput style={[estilo.txtInput]}
                        placeholder="Pesquisar"
                    />
                    <Image 
                        source={require('../assets/lupa.png')} 
                        style={{ width: 24, height: 24, tintColor: 'gray', position: 'absolute', right: 15 }}
                    />
                </View>
                
                {/* Texto expositivo */}
                <View style={{ width: '80%', flexDirection: isTablet ? 'row' : 'column', gap: 25}}>
                    <View style={{ justifyContent: 'space-between', flex: 1, flexDirection: 'row', gap: 25}}>
                        <View style={{ backgroundColor: '#F5F7FA', borderRadius: 12, flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10}}>
                            <Text style={[estilo.fontM, { textAlign: 'center' }]}>Total de membros:</Text>
                            <Text style={estilo.fontG}>30</Text>
                        </View>
                        <View style={{ backgroundColor: '#F5F7FA', borderRadius: 12, flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10}}>
                            <Text style={[estilo.fontM, { textAlign: 'center' }]}>Total de clientes:</Text>
                            <Text style={estilo.fontG}>10</Text>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'space-between', flex: 1, flexDirection: 'row', gap: 25}}>
                        <View style={{ backgroundColor: '#F5F7FA', borderRadius: 12, flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10}}>
                            <Text style={[estilo.fontM, { textAlign: 'center' }]}>Orçamento Total:</Text>
                            <Text style={estilo.fontG}>70.000,0</Text>
                        </View>
                        <View style={{ backgroundColor: '#F5F7FA', borderRadius: 12, flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10}}>
                            <Text style={[estilo.fontM, { textAlign: 'center' }]}>Total de equipamentos:</Text>
                            <Text style={estilo.fontG}>35</Text>
                        </View>
                    </View>
                </View>
                
                {/* Itens Interativos */}
                <TouchableOpacity //Membro
                    style={{ width: '80%', backgroundColor: '#F5F7FA', borderRadius: 12, justifyContent: 'center'}}
                    onPress={() => setExpandirMembros(!expandirMembros)}
                >
                    <View style={{ height: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <View style={{ flexDirection: 'row', gap: 5}}>
                            <Text style={[estilo.fontM, {marginLeft: 15, color: '#001529', fontWeight: 'bold'}]}>Membros</Text>
                            <Text style={[estilo.fontM, {color: '#001529'}]}>{expandirMembros ? '(Ocultar)' : '(Clique para ver)'}</Text>
                        </View>
                        <Image 
                            source={require('../assets/open.png')}
                            style={{ width: 15, height: 15, tintColor: '#001529', marginRight: 15, transform: [{ rotate: expandirMembros ? '90deg' : '0deg' }]}}
                        />
                    </View>
                    {expandirMembros && (
                        <View style={{ padding: 15, borderTopWidth: 1, borderTopColor: '#e0e0e0', gap: 5 }}>
                            <Text style={estilo.fontM}>• Vendas: 30%</Text>
                            <Text style={estilo.fontM}>• Marketing: 20%</Text>
                            <Text style={estilo.fontM}>• GP: 20%</Text>
                            <Text style={estilo.fontM}>• Projetos: 15%</Text>
                            <Text style={estilo.fontM}>• Direção: 15%</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5}}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Membros')}
                                >
                                    <Text style={[estilo.fontM, {color: '#001529'}]}>Ver todos</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{flexDirection: 'row', alignItems: 'center', gap: 5}}
                                    onPress={() => navigation.navigate('AdicionarMembro')}
                                >
                                    <Image 
                                        source={require('../assets/add.png')}
                                        style={{ width: 12, height: 12, tintColor: '#001529' }}
                                    />
                                    <Text style={[estilo.fontM]}>Adicionar Membro</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </TouchableOpacity>
                
                <TouchableOpacity //Clientes
                    style={{ width: '80%', backgroundColor: '#F5F7FA', borderRadius: 12, justifyContent: 'center'}}
                    onPress={() => setExpandirClientes(!expandirClientes)}
                >
                    <View style={{ height: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <View style={{ flexDirection: 'row', gap: 5}}>
                            <Text style={[estilo.fontM, {marginLeft: 15, color: '#001529', fontWeight: 'bold'}]}>Clientes</Text>
                            <Text style={[estilo.fontM, {color: '#001529'}]}>{expandirClientes ? '(Ocultar)' : '(Clique para ver)'}</Text>
                        </View>
                        <Image 
                            source={require('../assets/open.png')}
                            style={{ width: 15, height: 15, tintColor: '#001529', marginRight: 15, transform: [{ rotate: expandirClientes ? '90deg' : '0deg' }]}}
                        />
                    </View>
                    {expandirClientes && (
                        <View style={{ padding: 15, borderTopWidth: 1, borderTopColor: '#e0e0e0', gap: 5 }}>
                            <Text style={estilo.fontM}>• Ativos: 8</Text>
                            <Text style={estilo.fontM}>• Inativos: 2</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5}}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Clientes')}
                                >
                                    <Text style={[estilo.fontM, {color: '#001529'}]}>Ver todos</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{flexDirection: 'row', alignItems: 'center', gap: 5}}
                                    onPress={() => navigation.navigate('AdicionarCliente')}
                                >
                                    <Image source={require('../assets/add.png')} style={{ width: 12, height: 12, tintColor: '#001529' }} />
                                    <Text style={[estilo.fontM]}>Adicionar Cliente</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </TouchableOpacity>

                <TouchableOpacity //Equipamentos
                    style={{ width: '80%', backgroundColor: '#F5F7FA', borderRadius: 12, justifyContent: 'center'}}
                    onPress={() => setExpandirEquipamentos(!expandirEquipamentos)}
                >
                    <View style={{ height: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <View style={{ flexDirection: 'row', gap: 5}}>
                            <Text style={[estilo.fontM, {marginLeft: 15, color: '#001529', fontWeight: 'bold'}]}>Equipamentos</Text>
                            <Text style={[estilo.fontM, {color: '#001529'}]}>{expandirEquipamentos ? '(Ocultar)' : '(Clique para ver)'}</Text>
                        </View>
                        <Image 
                            source={require('../assets/open.png')}
                            style={{ width: 15, height: 15, tintColor: '#001529', marginRight: 15, transform: [{ rotate: expandirEquipamentos ? '90deg' : '0deg' }]}}
                        />
                    </View>
                    {expandirEquipamentos && (
                        <View style={{ padding: 15, borderTopWidth: 1, borderTopColor: '#e0e0e0', gap: 5 }}>
                            <Text style={estilo.fontM}>• Disponíveis: 20</Text>
                            <Text style={estilo.fontM}>• Em uso: 10</Text>
                            <Text style={estilo.fontM}>• Manutenção: 5</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5}}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Equipamentos')}
                                >
                                    <Text style={[estilo.fontM, {color: '#001529'}]}>Ver todos</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{flexDirection: 'row', alignItems: 'center', gap: 5}}
                                    onPress={() => navigation.navigate('AdicionarEquipamento')}
                                >
                                    <Image source={require('../assets/add.png')} style={{ width: 12, height: 12, tintColor: '#001529' }} />
                                    <Text style={[estilo.fontM]}>Adicionar Eqp.</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </TouchableOpacity>

                <TouchableOpacity //Orçamento
                    style={{ width: '80%', backgroundColor: '#F5F7FA', borderRadius: 12, justifyContent: 'center'}}
                    onPress={() => setExpandirOrcamento(!expandirOrcamento)}
                >
                    <View style={{ height: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <View style={{ flexDirection: 'row', gap: 5}}>
                            <Text style={[estilo.fontM, {marginLeft: 15, color: '#001529', fontWeight: 'bold'}]}>Orçamento</Text>
                            <Text style={[estilo.fontM, {color: '#001529'}]}>{expandirOrcamento ? '(Ocultar)' : '(Clique para ver)'}</Text>
                        </View>
                        <Image 
                            source={require('../assets/open.png')}
                            style={{ width: 15, height: 15, tintColor: '#001529', marginRight: 15, transform: [{ rotate: expandirOrcamento ? '90deg' : '0deg' }]}}
                        />
                    </View>
                    {expandirOrcamento && (
                        <View style={{ padding: 15, borderTopWidth: 1, borderTopColor: '#e0e0e0', gap: 5 }}>
                            <Text style={estilo.fontM}>• Receitas: R$ 50.000</Text>
                            <Text style={estilo.fontM}>• Despesas: R$ 20.000</Text>
                            <Text style={estilo.fontM}>• Saldo: R$ 30.000</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5}}>
                                <TouchableOpacity onPress={() => navigation.navigate('Orcamento')}>
                                    <Text style={[estilo.fontM, {color: '#001529'}]}>Ver detalhes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{flexDirection: 'row', alignItems: 'center', gap: 5}}
                                    onPress={() => navigation.navigate('AdicionarOrcamento')}
                                >
                                    <Image source={require('../assets/add.png')} style={{ width: 12, height: 12, tintColor: '#001529' }} />
                                    <Text style={[estilo.fontM]}>Novo Orçamento</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </TouchableOpacity>

                <TouchableOpacity //Penalidades
                    style={{ width: '80%', backgroundColor: '#F5F7FA', borderRadius: 12, justifyContent: 'center'}}
                    onPress={() => setExpandirPenalidades(!expandirPenalidades)}
                >
                    <View style={{ height: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <View style={{ flexDirection: 'row', gap: 5}}>
                            <Text style={[estilo.fontM, {marginLeft: 15, color: '#001529', fontWeight: 'bold'}]}>Penalidades</Text>
                            <Text style={[estilo.fontM, {color: '#001529'}]}>{expandirPenalidades ? '(Ocultar)' : '(Clique para ver)'}</Text>
                        </View>
                        <Image 
                            source={require('../assets/open.png')}
                            style={{ width: 15, height: 15, tintColor: '#001529', marginRight: 15, transform: [{ rotate: expandirPenalidades ? '90deg' : '0deg' }]}}
                        />
                    </View>
                    {expandirPenalidades && (
                        <View style={{ padding: 15, borderTopWidth: 1, borderTopColor: '#e0e0e0', gap: 5 }}>
                            <Text style={estilo.fontM}>• Advertências: 3</Text>
                            <Text style={estilo.fontM}>• Suspensões: 1</Text>
                            <Text style={estilo.fontM}>• Desligamentos: 0</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5}}>
                                <TouchableOpacity onPress={() => navigation.navigate('Penalidades')}>
                                    <Text style={[estilo.fontM, {color: '#001529'}]}>Ver todas</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{flexDirection: 'row', alignItems: 'center', gap: 5}}
                                    onPress={() => navigation.navigate('AdicionarPenalidade')}
                                >
                                    <Image source={require('../assets/add.png')} style={{ width: 12, height: 12, tintColor: '#001529' }} />
                                    <Text style={[estilo.fontM]}>Nova Penalidade</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </TouchableOpacity>
            </ScrollView>

            <MenuLateral mostrarMenu={mostrarMenu} setmostrarMenu={setmostrarMenu} navigation={navigation} />
        </View>
    )
}