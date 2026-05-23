import React from 'react'
import { View, Text, Button, StyleSheet, useWindowDimensions } from 'react-native'
import estilo from '../componentes/estilo'

import Pedido from '../componentes/Pedido'
import ImagemZeus from '../componentes/ImagemZeus'
import ButtonConf from '../componentes/ButtonConf'

export default ({ navigation }) => {

    const { width, height } = useWindowDimensions()
    const isTablet = width >= 768 && width > height

    return (
        <View style={{ flex: 1, flexDirection: isTablet ? 'row' : 'column', gap: isTablet ? 0 : 50, backgroundColor: 'white', paddingTop: isTablet ? '0%' : '10%'}}>
            <View style={{flex: 1, justifyContent: 'flex-start'}}>
                <ImagemZeus />
            </View>
            <View style={[styles.mainGap, isTablet && { flex: 1, justifyContent: 'center', paddingBottom: 0 }]}>
                <Text style={[estilo.fontGG, {width: '80%'}]}>Nova senha alterada com sucesso</Text>
                <View style={{width: '80%'}}>
                    <ButtonConf titulo='Avançar' onPress={() => navigation.navigate('Login')} />
                </View>
            </View>
            </View>
    )
}

const styles = StyleSheet.create({
    mainGap: {
        flex: 1,
        paddingBottom: '50%',
        gap: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    }
})