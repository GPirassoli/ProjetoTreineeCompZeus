import React, {useState} from 'react'
import { TextInput, View, Text} from 'react-native'

import estilo from './estilo'

export default props => {
    const [pedido, setpedido] = useState('')
            
    return (
        <View style={{ alignItems: 'center' }}>
            <Text style={{ justifyContent: 'flex-start', width: '200', paddingLeft: 5}}>
                {props.pedido}
            </Text>
            <TextInput style={estilo.txtInput}
                placeholder="Digite aqui"
                secureTextEntry={props.pedido === 'senha'}
                value={pedido}
                onChangeText={texto => setpedido(texto)}
            />
        </View>
    )
}
