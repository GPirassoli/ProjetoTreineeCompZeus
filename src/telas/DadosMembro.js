import React, { useContext, useState } from 'react'
import { View, Text, TouchableOpacity, Image, Alert, useWindowDimensions } from 'react-native'
import { MembrosContext } from '../contextos/MembrosContext'
import estilo from '../componentes/estilo'
import ButtonConf from '../componentes/ButtonConf'
import BarraSuperior from '../componentes/BarraSuperior'
import MenuLateral from '../componentes/MenuLateral'

export default ({ route, navigation }) => {
    // 1. Acessa o parâmetro passado na navegação
    const { membroId } = route.params

    // 2. Puxa a lista de membros do Contexto Global
    const { membros, excluirMembro } = useContext(MembrosContext)

    // 3. Procura os dados completos do membro através do ID
    const membro = membros.find(m => m.id === membroId)

    const [mostrarMenu, setmostrarMenu] = useState(false)
    const [menuPerfil, setmenuPerfil] = useState(false)

    const { width } = useWindowDimensions()
    const isTablet = width >= 768

    return (
        <View style={{ flex: 1, gap: 50, backgroundColor: 'white', paddingTop: '10%'}}>
            <BarraSuperior mostrarMenu={mostrarMenu} setmostrarMenu={setmostrarMenu} menuPerfil={menuPerfil} setmenuPerfil={setmenuPerfil} />
            <View style={{ justifyContent: 'flex-end', backgroundColor: 'white', alignItems: 'center', gap: 5}}>
                {/* Renderiza os dados encontrados */}
                <Image 
                    source={membro?.foto}
                    style={{ width: 100, height: 100, alignSelf: 'center', marginBottom: 20 }}
                />
                <Text style={estilo.fontM}><Text style={{fontWeight: 'bold'}}>Nome:</Text> {membro?.nome}</Text>
                <Text style={estilo.fontM}><Text style={{fontWeight: 'bold'}}>Cargo:</Text> {membro?.area}</Text>
                <Text style={estilo.fontM}><Text style={{fontWeight: 'bold'}}>Email Institucional:</Text> {membro?.email}</Text>
                <Text style={estilo.fontM}><Text style={{fontWeight: 'bold'}}>Telefone:</Text> {membro?.telefone}</Text>
                <Text style={estilo.fontM}><Text style={{fontWeight: 'bold'}}>Habilidades:</Text> {membro?.habilidades}</Text>
                <Text style={estilo.fontM}><Text style={{fontWeight: 'bold'}}>Data de Ingresso:</Text> {membro?.dataIngresso}</Text>
                <Text style={estilo.fontM}><Text style={{fontWeight: 'bold'}}>Aniversário:</Text> {membro?.aniversario}</Text>
                <Text style={estilo.fontM}><Text style={{fontWeight: 'bold'}}>Gênero:</Text> {membro?.genero}</Text>
            </View>
            <View style={{gap: 15}}>
                <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center', gap: 15}}>
                    <View style={{ flex: 1 }}>
                        <ButtonConf titulo="Editar" onPress={() => navigation.navigate('EditarMembro', { membroId: membro?.id })} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <ButtonConf titulo="Excluir" onPress={() => {
                            Alert.alert(
                                'Confirmar Exclusão',
                                'Tem certeza que deseja excluir este membro?',
                                [
                                    { text: 'Cancelar', style: 'cancel' },
                                    {
                                        text: 'Excluir',
                                        style: 'destructive',
                                        onPress: () => {
                                            excluirMembro(membro?.id)
                                            navigation.goBack()
                                        }
                                    }
                                ]
                            )
                        }} />
                    </View>
                </View>
                <View style={{ width: '80%', alignSelf: 'center' }}>
                    <ButtonConf titulo="Voltar" onPress={() => navigation.goBack()} />
                </View>
            </View>

            <MenuLateral mostrarMenu={mostrarMenu} setmostrarMenu={setmostrarMenu} navigation={navigation} />
        </View>
    )
}