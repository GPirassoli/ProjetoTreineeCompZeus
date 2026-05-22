import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import estilo from '../componentes/estilo'

import Pedido from '../componentes/Pedido'
import ImagemZeus from '../componentes/ImagemZeus'
import ButtonConf from '../componentes/ButtonConf'

export default ({ navigation }) => {

    return (
        <View style={{ flex: 1, gap: 50, backgroundColor: 'white', paddingTop: '10%'}}>
            <ImagemZeus />
            <View style={styles.mainGap}>
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