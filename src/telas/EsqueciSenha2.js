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
                    <View style={[styles.mainGap, isTablet && { flex: 1, justifyContent: 'center', gap: 25}]}>
                        <View style={styles.main}>
                            <Text style={estilo.fontGG}>Código enviado</Text>
                            <Text style={[estilo.fontM, {width: '60%', textAlign: 'center'}]}>
                                Digite o código de confirmação enviado ao seu E-mail
                            </Text>
                            <Pedido pedido='código'/>
                        </View>
                        <View style={{ gap: 10, width: '80%', justifyContent: 'space-between'}}>
                            <ButtonConf titulo='Avançar' onPress={() => navigation.navigate('EsqueciSenha3')} />
                            <ButtonConf titulo='Voltar' onPress={() => navigation.navigate('EsqueciSenha1')} />
                        </View>
                    </View>
                </View>
    )
}

const styles = StyleSheet.create({
    mainGap: {
        flex: 1,
        justifyContent: 'space-around',
        paddingBottom: 20,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    main: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
        width: '100%'
    }
})