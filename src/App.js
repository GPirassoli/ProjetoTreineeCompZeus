import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

import ImagemZeus from './componentes/ImagemZeus'
import Pedido from './componentes/Pedido'
import ButtonConf from './componentes/ButtonConf'
import estilo from './componentes/estilo'


export default props => {
    return (
        <View style={{ flex: 1, gap: 50, backgroundColor: 'white' }}>
            <ImagemZeus />
            <View style={styles.mainGap}>
                <View style={styles.main}>
                    <Text style={estilo.fontG}>Bem Vindo(a) ao</Text>
                    <Text style={estilo.fontGG}>ZEUS</Text>
                </View>
                <View style={styles.main}>
                    <Pedido pedido='email'/>
                    <Pedido pedido='senha'/>
                    <Text style={[estilo.fontPP, { color: '#036aca' }]}>Esqueceu a senha?</Text>
                </View>
                <ButtonConf/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainGap: {
        flex: 1,
        justifyContent: 'space-around',
        paddingBottom: 200,
        gap: 20,
        alignItems: 'center',
        backgroundColor: 'white',
    },

    main: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10
    },
})