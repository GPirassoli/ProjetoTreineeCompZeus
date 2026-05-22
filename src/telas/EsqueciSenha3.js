import React, { useState } from 'react'
import { View, Text, Button, StyleSheet, Alert } from 'react-native'
import estilo from '../componentes/estilo'

import Pedido from '../componentes/Pedido'
import ImagemZeus from '../componentes/ImagemZeus'
import ButtonConf from '../componentes/ButtonConf'

export default ({ navigation }) => {

    const [senha, setSenha] = useState('')
    const [confirmarSenha, setConfirmarSenha] = useState('')

    const avancar = () => {
        if (senha.length < 8) {
            Alert.alert('Senha inválida', 'Sua senha deve conter 8 caracteres ou mais.')
        } else if (senha !== confirmarSenha) {
            Alert.alert('Senhas diferentes', 'As senhas digitadas não coincidem. Tente novamente!')
        } else {
            navigation.navigate('EsqueciSenha4')
        }
    }
    
    return (
        <View style={{ flex: 1, gap: 50, backgroundColor: 'white', paddingTop: '10%'}}>
                    <ImagemZeus />
                    <View style={styles.mainGap}>
                        <View style={styles.main}>
                            <Text style={estilo.fontGG}>Escolha nova senha</Text>
                            <Text style={[estilo.fontM, {width: '60%', textAlign: 'center'}]}>
                                Sua senha deve conter 8 caracteres ou mais
                            </Text>
                            <Pedido pedido='senha' onChangeText={setSenha} />
                            <Pedido pedido='confirmar senha' onChangeText={setConfirmarSenha} />
                        </View>
                        <View style={{ gap: 10, width: '80%', justifyContent: 'space-between'}}>
                            <ButtonConf titulo='Voltar' onPress={() => navigation.navigate('EsqueciSenha2')} />
                            <ButtonConf titulo='Avançar' onPress={avancar} />
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