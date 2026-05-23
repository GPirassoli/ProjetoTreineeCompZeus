import React from 'react'
import { View, TouchableOpacity, Image, useWindowDimensions } from 'react-native'

export default ({ mostrarMenu, setmostrarMenu, menuPerfil, setmenuPerfil }) => {
    const { width } = useWindowDimensions()
    const isTablet = width >= 768

    return (
        <View style={{backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: 'gray', height: isTablet ? 60 : '7%', justifyContent: 'center'}}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 5, width: '100%'}}>
                <TouchableOpacity style={{paddingLeft: 15 }} onPress={() => setmostrarMenu(!mostrarMenu)}>
                    <Image source={require('../assets/menu_tres_tracos.png')} style={{ width: 24, height: 24, tintColor: '#001529' }} />
                </TouchableOpacity>
                <Image source={require('../assets/escrito_zeus.png')} style={{width: 90, height: 90, tintColor: '#001529'}} />
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: 10}}>
                    <TouchableOpacity style={{ width: 24, height: 24, backgroundColor: '#F5F7FA', borderRadius: 12, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../assets/notification.png')} style={{ width: 15, height: 15, tintColor: '#001529' }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: 24, height: 24, backgroundColor: '#F5F7FA', borderRadius: 12, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../assets/setting.png')} style={{ width: 15, height: 15, tintColor: '#001529' }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{paddingRight: 15 }} onPress={() => setmenuPerfil(!menuPerfil)}>
                        <Image source={require('../assets/user.png')} style={{ width: 24, height: 24, tintColor: '#001529'}} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}