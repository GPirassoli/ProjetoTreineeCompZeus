import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image, Alert } from 'react-native'
import Pedido from '../componentes/Pedido'
import ImagemZeus from '../componentes/ImagemZeus'
import ButtonConf from '../componentes/ButtonConf'
import estilo from '../componentes/estilo'

export default ({ navigation }) => {

    const [press, setPress] = useState(false)
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const entrar = () => {
        if (email === 'membro123@gmail.com' && senha === 'senha123') { //login e senha genericos apenas para testes
            navigation.navigate('Home')
        } else {
            Alert.alert('Erro no Login', 'E-mail ou senha incorretos. Tente novamente!')
        }
    }

    return (
        <View style={{ flex: 1, gap: 50, backgroundColor: 'white', paddingTop: '0%'}}>
            <ImagemZeus />
            <View style={styles.mainGap}>
                <View style={styles.main}>
                    <Text style={estilo.fontG}>Bem Vindo(a) ao</Text>
                    <Text style={estilo.fontGG}>ZEUS</Text>
                    <Pedido pedido='email' onChangeText={setEmail} />
                    <Pedido pedido='senha' onChangeText={setSenha} />
                    <View style={{flexDirection: 'row', justifyContent: 'flex-start', width: '80%', gap: 5}}>
                        <TouchableOpacity
                            onPress={() => setPress(!press)}
                        >
                            <Image 
                            source={ 
                                press
                                    ? require('../assets/press.png')
                                    : require('../assets/not_press.png')
                            } 
                            style={{ width: 16, height: 16, tintColor: 'gray' }}
                            />
                        </TouchableOpacity>
                        <Text style={estilo.fontPP}>Lembrar minha senha</Text>

                        <TouchableOpacity
                            style={{ alignItems: 'flex-end', width: '60%'}}
                            onPress={() => navigation.navigate('EsqueciSenha1')}
                        >
                            <Text style={[estilo.fontPP, { color: '#036aca' }]}>Esqueceu a senha?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{width: '80%'}}>
                    <ButtonConf titulo='Entrar' onPress={entrar} />
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
        gap: 20,
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