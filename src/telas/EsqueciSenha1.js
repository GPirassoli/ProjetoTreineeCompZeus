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
                        <View style={styles.main}>
                            <Text style={estilo.fontGG}>Recuperar senha</Text>
                            <Text style={estilo.fontM}>Digite seu email para continuar</Text>
                            <Pedido pedido='email'/>
                        </View>
                        <View style={{ gap: 10, width: '80%', justifyContent: 'space-between'}}>
                            <ButtonConf titulo='Voltar' onPress={() => navigation.navigate('Login')} />
                            <ButtonConf titulo='Avançar' onPress={() => navigation.navigate('EsqueciSenha2')} />
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