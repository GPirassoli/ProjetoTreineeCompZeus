import React from 'react'
import { Image } from 'react-native'

export default props => {
    return (
        <Image 
        source={require('../assets/LogoZEUS02.png')}
        style={{justifyContent: 'flex-start', width: '100%', height: '30%'}}
        />
    )
}