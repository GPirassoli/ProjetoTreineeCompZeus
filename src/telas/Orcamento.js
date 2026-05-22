import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, Modal, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import estilo from '../componentes/estilo'
import ButtonConf from '../componentes/ButtonConf'

export default ({ navigation }) => {

    const [mostrarMenu, setmostrarMenu] = useState(false)
    const [menuPerfil, setmenuPerfil] = useState(false)

    return (
        <View style={{ flex: 1, gap: 50, backgroundColor: 'white', paddingTop: '10%'}}>
            <View style={{backgroundColor: 'white', borderBottomWidth: 1,
            borderBottomColor: 'gray', height: '7%', justifyContent: 'center'}}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 5, width: '100%'}}>
                    <TouchableOpacity 
                    style={{paddingLeft: 15 }}
                    onPress={() => setmostrarMenu(!mostrarMenu)}
                    >
                        <Image 
                            source={require('../assets/menu_tres_tracos.png')}
                            style={{ width: 24, height: 24, tintColor: '#001529' }}
                        />
                    </TouchableOpacity>
                    <Image 
                        source={require('../assets/escrito_zeus.png')}
                        style={{width: 90, height: 90, tintColor: '#001529'}}
                    />
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: 10}}>
                        <TouchableOpacity style={{ width: 24, height: 24, backgroundColor: '#F5F7FA', borderRadius: 12,
                        justifyContent: 'center', alignItems: 'center' }}>
                            <Image 
                                source={require('../assets/notification.png')}
                                style={{ width: 15, height: 15, tintColor: '#001529' }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: 24, height: 24, backgroundColor: '#F5F7FA', borderRadius: 12,
                        justifyContent: 'center', alignItems: 'center' }}>
                            <Image 
                                source={require('../assets/setting.png')}
                                style={{ width: 15, height: 15, tintColor: '#001529' }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity 
                        style={{paddingRight: 15 }}
                        onPress={() => setmenuPerfil(!menuPerfil)}
                        >
                            <Image 
                                source={require('../assets/user.png')}
                                style={{ width: 24, height: 24, tintColor: '#001529'}}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1, justifyContent: 'space-evenly', backgroundColor: 'white', alignItems: 'center'}}>
                <View style={{width: '80%'}}>
                    <ButtonConf titulo='Orcamento' onPress={() => navigation.navigate('Login')} />
                </View>
            </View>

            {/* Modal do Menu Lateral */}
            <Modal visible={mostrarMenu} transparent={true} animationType="fade">
                <View style={styles.overlay}>
                    {/* Fundo escuro semitransparente que fecha o menu ao ser clicado */}
                    <TouchableWithoutFeedback onPress={() => setmostrarMenu(false)}>
                        <View style={styles.background} />
                    </TouchableWithoutFeedback>
                    
                    {/* Conteúdo do Menu */}
                    <View style={styles.menu}>
                        <Image
                            source={require('../assets/escrito_zeus.png')}
                            style={{width: 180, height: 180, tintColor: '#001529'}}
                        />
                        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}>
                            <Image 
                                source={require('../assets/home.png')}
                                style={{width: 25, height: 25, tintColor: '#001529'}}
                            />
                            <Text style={estilo.fontM}>Início</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Membros')}>
                            <Image 
                                source={require('../assets/membros.png')}
                                style={{width: 25, height: 25, tintColor: '#001529'}}
                            />
                            <Text style={estilo.fontM}>Membros</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Clientes')}>
                            <Image 
                                source={require('../assets/cliente.png')}
                                style={{width: 25, height: 25, tintColor: '#001529'}}
                            />
                            <Text style={estilo.fontM}>Clientes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Equipamentos')}>
                            <Image 
                                source={require('../assets/equipamento.png')}
                                style={{width: 25, height: 25, tintColor: '#001529'}}
                            />
                            <Text style={estilo.fontM}>Equipamentos</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={() => setmostrarMenu(false)}>
                            <Image 
                                source={require('../assets/orcamento.png')}
                                style={{width: 25, height: 25, tintColor: '#001529'}}
                            />
                            <Text style={estilo.fontM}>Orçamento</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Penalidades')}>
                            <Image 
                                source={require('../assets/penalidades.png')}
                                style={{width: 25, height: 25, tintColor: '#001529'}}
                            />
                            <Text style={estilo.fontM}>Penalidades</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Login')}>
                            <Text style={[estilo.fontM, { color: 'red'}]}>Sair</Text>
                        </TouchableOpacity>
                        <View>
                            <Image
                                source={require('../assets/logo_comp.png')}
                                style={{ width: 100, height: 80, alignSelf: 'center'}}
                            />
                            <Text style={[estilo.fontM, {alignSelf: 'center', color: '#001529'}]}>CompJr</Text>
                            <Text style={[estilo.fontPP, {alignSelf: 'center'}]}>Sistema ERP</Text>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        flexDirection: 'row',
    },
    background: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    menu: {
        width: '80%',
        backgroundColor: 'white',
        height: '100%',
        paddingTop: '15%',
        paddingHorizontal: 20,
        gap: 15,
        // Sombras para dar destaque ao menu
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    menuItem: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        flexDirection: 'row',
        gap: 10,
    }
})