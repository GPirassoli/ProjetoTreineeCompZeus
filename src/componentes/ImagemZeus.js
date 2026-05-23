import React from 'react'
import { Image, useWindowDimensions } from 'react-native'

export default props => {
    const { width, height } = useWindowDimensions()
    const isTablet = width >= 768 && width > height

    return (
        <Image 
        source={require('../assets/LogoZEUS02.png')}
        style={{justifyContent: 'flex-start', width: '100%', height: isTablet ? height : height * 0.41, resizeMode: isTablet ? 'cover' : 'cover'}}
        />
    )
}