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
                            <Text style={estilo.fontGG}>Código enviado</Text>
                            <Text style={[estilo.fontM, {width: '60%', textAlign: 'center'}]}>
                                Digite o código de confirmação enviado ao seu E-mail
                            </Text>
                            <Pedido pedido='código'/>
                        </View>
                        <View style={{ gap: 10, width: '80%', justifyContent: 'space-between'}}>
                            <ButtonConf titulo='Voltar' onPress={() => navigation.navigate('EsqueciSenha1')} />
                            <ButtonConf titulo='Avançar' onPress={() => navigation.navigate('EsqueciSenha3')} />
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