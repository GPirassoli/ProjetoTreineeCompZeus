import React from 'react'
import { View, Text, TouchableOpacity, Image, Modal, TouchableWithoutFeedback, StyleSheet, useWindowDimensions } from 'react-native'
import estilo from './estilo'

export default ({ mostrarMenu, setmostrarMenu, navigation }) => {
    const { width } = useWindowDimensions()
    const isTablet = width >= 768

    const navigateTo = (screen) => {
        setmostrarMenu(false)
        navigation.navigate(screen)
    }

    return (
        <Modal visible={mostrarMenu} transparent={true} animationType="fade">
            <View style={styles.overlay}>
                <TouchableWithoutFeedback onPress={() => setmostrarMenu(false)}>
                    <View style={styles.background} />
                </TouchableWithoutFeedback>
                <View style={[styles.menu, isTablet && { width: 300 }]}>
                    <Image source={require('../assets/escrito_zeus.png')} style={{width: 180, height: 180, tintColor: '#001529'}} />
                    <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Home')}>
                        <Image source={require('../assets/home.png')} style={{width: 25, height: 25, tintColor: '#001529'}} />
                        <Text style={estilo.fontM}>Início</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Membros')}>
                        <Image source={require('../assets/membros.png')} style={{width: 25, height: 25, tintColor: '#001529'}} />
                        <Text style={estilo.fontM}>Membros</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Clientes')}>
                        <Image source={require('../assets/cliente.png')} style={{width: 25, height: 25, tintColor: '#001529'}} />
                        <Text style={estilo.fontM}>Clientes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Equipamentos')}>
                        <Image source={require('../assets/equipamento.png')} style={{width: 25, height: 25, tintColor: '#001529'}} />
                        <Text style={estilo.fontM}>Equipamentos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Orcamento')}>
                        <Image source={require('../assets/orcamento.png')} style={{width: 25, height: 25, tintColor: '#001529'}} />
                        <Text style={estilo.fontM}>Orçamento</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Penalidades')}>
                        <Image source={require('../assets/penalidades.png')} style={{width: 25, height: 25, tintColor: '#001529'}} />
                        <Text style={estilo.fontM}>Penalidades</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={() => navigateTo('Login')}>
                        <Text style={[estilo.fontM, { color: 'red'}]}>Sair</Text>
                    </TouchableOpacity>
                    <View>
                        <Image source={require('../assets/logo_comp.png')} style={{ width: 100, height: 80, alignSelf: 'center'}} />
                        <Text style={[estilo.fontM, {alignSelf: 'center', color: '#001529'}]}>CompJr</Text>
                        <Text style={[estilo.fontPP, {alignSelf: 'center'}]}>Sistema ERP</Text>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: { flex: 1, flexDirection: 'row' },
    background: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    menu: {
        width: '80%',
        backgroundColor: 'white',
        height: '100%',
        paddingHorizontal: 20,
        gap: 15,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    menuItem: { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eee', flexDirection: 'row', gap: 10 }
})