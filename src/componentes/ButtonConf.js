import React from 'react'
import { Button } from 'react-native'

export default props => {
    return (
        <Button
            title={props.titulo}
            color={'#001529'}
            onPress={props.onPress}
        />
    )
}
