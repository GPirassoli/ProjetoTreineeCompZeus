import React, { useContext, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image, useWindowDimensions } from 'react-native'
import { EquipamentosContext } from '../contextos/EquipamentosContext'
import estilo from '../componentes/estilo'
import BarraSuperior from '../componentes/BarraSuperior'
import MenuLateral from '../componentes/MenuLateral'

export default ({ navigation }) => {
    const { historico } = useContext(EquipamentosContext)

    const [mostrarMenu, setmostrarMenu] = useState(false)
    const [menuPerfil, setmenuPerfil] = useState(false)

    const { width } = useWindowDimensions()
    const isTablet = width >= 768

    return (
        <View style={{ flex: 1, gap: 50, backgroundColor: 'white', marginTop: isTablet ? '3%' : '10%' }}>
            <BarraSuperior mostrarMenu={mostrarMenu} setmostrarMenu={setmostrarMenu} menuPerfil={menuPerfil} setmenuPerfil={setmenuPerfil} />

            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginBottom: 20 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/open.png')} style={{ width: 20, height: 20, tintColor: '#001529', transform: [{ rotate: '180deg' }], marginRight: 15 }} />
                </TouchableOpacity>
                <Text style={estilo.fontG}>Histórico de Alterações</Text>
            </View>
            
            {historico.length === 0 ? (
                <Text style={[estilo.fontM, { textAlign: 'center', marginTop: 50, color: 'gray' }]}>Nenhum registro encontrado.</Text>
            ) : (
                <FlatList
                    data={historico}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30, gap: 15 }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={{ backgroundColor: '#F5F7FA', padding: 15, borderRadius: 10, borderLeftWidth: 5, borderLeftColor: item.acao === 'Criação' ? '#28a745' : item.acao === 'Exclusão' ? '#dc3545' : '#036aca' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                                <Text style={[estilo.fontM, { fontWeight: 'bold' }]}>{item.acao}</Text>
                                <Text style={[estilo.fontPP, { color: 'gray' }]}>{item.data}</Text>
                            </View>
                            <Text style={estilo.fontM}>Equipamento: <Text style={{fontWeight:'bold'}}>{item.equipamentoNome}</Text></Text>
                            <Text style={[estilo.fontPP, { marginTop: 5 }]}>{item.detalhes}</Text>
                        </View>
                    )}
                />
            )}

            <MenuLateral mostrarMenu={mostrarMenu} setmostrarMenu={setmostrarMenu} navigation={navigation} />
        </View>
    )
}