import React, { useContext, useState } from 'react'
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, Alert, useWindowDimensions } from 'react-native'
import { MembrosContext } from '../contextos/MembrosContext'
import estilo from '../componentes/estilo'
import ButtonConf from '../componentes/ButtonConf'
import BarraSuperior from '../componentes/BarraSuperior'
import MenuLateral from '../componentes/MenuLateral'

export default ({ route, navigation }) => {
    // 1. Acessa o parâmetro passado na navegação
    const { membroId } = route.params

    // 2. Puxa a lista de membros do Contexto Global
    const { membros, editarMembro } = useContext(MembrosContext)

    // 3. Procura os dados completos do membro através do ID
    const membro = membros.find(m => m.id === membroId)

    const [mostrarMenu, setmostrarMenu] = useState(false)
    const [menuPerfil, setmenuPerfil] = useState(false)

    const [nome, setNome] = useState(membro?.nome || '')
    const [area, setArea] = useState(membro?.area || '')
    const [email, setEmail] = useState(membro?.email || '')
    const [telefone, setTelefone] = useState(membro?.telefone || '')
    const [habilidades, setHabilidades] = useState(membro?.habilidades || '')
    const [dataIngresso, setDataIngresso] = useState(membro?.dataIngresso || '')
    const [aniversario, setAniversario] = useState(membro?.aniversario || '')
    const [genero, setGenero] = useState(membro?.genero || '')
    const [foto, setFoto] = useState(membro?.foto || require('../assets/user.png'))

    const { width: windowWidth } = useWindowDimensions()
    const isTablet = windowWidth >= 768

    const salvar = () => {
        if (!nome || !email || !area) {
            Alert.alert('Campos Obrigatórios', 'Preencha pelo menos o Nome, Email e Área.')
            return
        }
        Alert.alert(
            'Confirmar Alteração',
            'Deseja realmente salvar as alterações deste membro?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { 
                    text: 'Confirmar', 
                    onPress: () => {
                        editarMembro(membroId, {
                            nome, email, telefone, area, habilidades, dataIngresso, aniversario, genero, foto
                        })
                        setTimeout(() => {
                            Alert.alert('Sucesso', 'Dados do membro atualizados!', [
                                { text: 'OK', onPress: () => navigation.goBack() }
                            ])
                        }, 500)
                    }
                }
            ]
        )
    }

    return (
        <View style={{ flex: 1, gap: 50, backgroundColor: 'white', paddingTop: '10%'}}>
            <BarraSuperior mostrarMenu={mostrarMenu} setmostrarMenu={setmostrarMenu} menuPerfil={menuPerfil} setmenuPerfil={setmenuPerfil} />
            
            <ScrollView contentContainerStyle={{ paddingBottom: 20, alignItems: 'center', gap: 15 }} style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }} showsVerticalScrollIndicator={false}>
                <Text style={estilo.fontGG}>Editar Membro</Text>

                <TouchableOpacity onPress={() => Alert.alert('Galeria', 'Aqui será aberta a galeria para trocar a foto!')} style={{ alignItems: 'center', marginBottom: 10 }}>
                    <Image source={foto} style={{ width: 100, height: 100, borderRadius: 50, borderWidth: 2, borderColor: '#001529' }} />
                    <Text style={[estilo.fontM, { color: '#036aca', marginTop: 5, fontWeight: 'bold' }]}>Alterar Foto</Text>
                </TouchableOpacity>

                <View style={{ width: isTablet ? 600 : '80%', gap: 10 }}>
                    <Text style={estilo.fontM}>Nome:</Text>
                    <TextInput style={estilo.txtInput} value={nome} onChangeText={setNome} placeholder="Digite o nome" />

                    <Text style={estilo.fontM}>Cargo/Área:</Text>
                    <TextInput style={estilo.txtInput} value={area} onChangeText={setArea} placeholder="Digite a área (ex: GP)" />

                    <Text style={estilo.fontM}>Email Institucional:</Text>
                    <TextInput style={estilo.txtInput} value={email} onChangeText={setEmail} placeholder="Digite o email" keyboardType="email-address" autoCapitalize="none" />

                    <Text style={estilo.fontM}>Telefone:</Text>
                    <TextInput style={estilo.txtInput} value={telefone} onChangeText={setTelefone} placeholder="Digite o telefone" keyboardType="phone-pad" />

                    <Text style={estilo.fontM}>Habilidades:</Text>
                    <TextInput style={estilo.txtInput} value={habilidades} onChangeText={setHabilidades} placeholder="Digite as habilidades" />

                    <Text style={estilo.fontM}>Data de Ingresso:</Text>
                    <TextInput style={estilo.txtInput} value={dataIngresso} onChangeText={setDataIngresso} placeholder="DD/MM/AAAA" />

                    <Text style={estilo.fontM}>Aniversário:</Text>
                    <TextInput style={estilo.txtInput} value={aniversario} onChangeText={setAniversario} placeholder="DD/MM/AAAA" />

                    <Text style={estilo.fontM}>Gênero:</Text>
                    <TextInput style={estilo.txtInput} value={genero} onChangeText={setGenero} placeholder="Digite o gênero" />
                </View>

                <View style={{ width: isTablet ? 600 : '80%', flexDirection: 'row', justifyContent: 'space-between', gap: 15, marginTop: 10 }}>
                    <View style={{ flex: 1 }}>
                        <ButtonConf titulo="Cancelar" onPress={() => navigation.goBack()} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <ButtonConf titulo="Salvar" onPress={salvar} />
                    </View>
                </View>
            </ScrollView>

            <MenuLateral mostrarMenu={mostrarMenu} setmostrarMenu={setmostrarMenu} navigation={navigation} />
        </View>
    )
}