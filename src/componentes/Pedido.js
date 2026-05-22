import React, {useState} from 'react'
import { TextInput, View, Text, TouchableOpacity, Image } from 'react-native'

import estilo from './estilo'


export default props => {
    const [pedido, setpedido] = useState('')
    const [mostrarSenha, setMostrarSenha] = useState(false)
            
    return (
        <View style={{ alignItems: 'center', width: '100%' }}>
            <Text style={{ justifyContent: 'flex-start', width: '80%', paddingLeft: 5}}>
                {props.pedido}
            </Text>
            <View style={{ justifyContent: 'center', width: '80%'}}>
                <TextInput style={[estilo.txtInput]}
                    placeholder="Digite aqui"
                    secureTextEntry={(props.pedido === 'senha' || props.pedido === 'confirmar senha') && !mostrarSenha}
                    value={pedido}
                    onChangeText={texto => { //Só devolve uma funcão ao pai caso tenha sido pedido por "onChangeText" na chamada
                        setpedido(texto)
                        if (props.onChangeText) props.onChangeText(texto)
                    }}
                />
                {(props.pedido === 'senha' || props.pedido === 'confirmar senha') && (
                    <TouchableOpacity 
                        style={{ position: 'absolute', right: 10 }}
                        onPress={() => setMostrarSenha(!mostrarSenha)}
                    >
                        <Image 
                            source={ 
                                mostrarSenha 
                                    ? require('../assets/olho-aberto.png')
                                    : require('../assets/olho-fechado.png')
                            } 
                            style={{ width: 24, height: 24, tintColor: 'gray' }}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}
