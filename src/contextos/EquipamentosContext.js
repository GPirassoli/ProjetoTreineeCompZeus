import React, { createContext, useState } from 'react'

export const EquipamentosContext = createContext({})

export const EquipamentosProvider = ({ children }) => {
    const [equipamentos, setEquipamentos] = useState([
        {
            id: '1',
            foto: require('../assets/equipamento.png'),
            nome: 'Notebook Dell Latitude',
            codigo: 'EQP-001',
            dataAquisicao: '15/02/2023',
            estadoEquipamento: 'Em uso',
            responsavel: 'Carlos Santos',
            localizacao: 'Escritório (Sede)',
            observacao: 'Bateria com vida útil moderada.'
        },
        {
            id: '2',
            foto: require('../assets/equipamento.png'),
            nome: 'Projetor Epson HD',
            codigo: 'EQP-002',
            dataAquisicao: '10/05/2023',
            estadoEquipamento: 'Disponível',
            responsavel: '',
            localizacao: 'Sala de Reuniões',
            observacao: 'Lâmpada trocada recentemente.'
        },
        {
            id: '3',
            foto: require('../assets/equipamento.png'),
            nome: 'Monitor LG 24"',
            codigo: 'EQP-003',
            dataAquisicao: '20/08/2022',
            estadoEquipamento: 'Manutenção',
            responsavel: 'Suporte TI',
            localizacao: 'Assistência Técnica',
            observacao: 'Tela apresentando falhas de imagem.'
        }
    ])

    // Estado para armazenar os registros do histórico
    const [historico, setHistorico] = useState([
        { id: 'h1', equipamentoNome: 'Notebook Dell Latitude', acao: 'Criação', data: new Date().toLocaleString(), detalhes: 'Equipamento registrado no sistema inicialmente.' }
    ])

    // Função auxiliar para registrar no histórico
    const registrarHistorico = (equipamentoNome, acao, detalhes) => {
        const novoRegistro = {
            id: Date.now().toString(),
            equipamentoNome,
            acao,
            data: new Date().toLocaleString(),
            detalhes
        }
        setHistorico(prev => [novoRegistro, ...prev])
    }

    const adicionarEquipamento = (dadosEquipamento) => {
        const novoEquipamento = { id: Date.now().toString(), foto: require('../assets/equipamento.png'), ...dadosEquipamento }
        setEquipamentos([...equipamentos, novoEquipamento])
        registrarHistorico(novoEquipamento.nome, 'Criação', 'Equipamento adicionado ao sistema.')
    }

    const excluirEquipamento = (id) => {
        const eqp = equipamentos.find(e => e.id === id)
        if (eqp) registrarHistorico(eqp.nome, 'Exclusão', 'Equipamento removido permanentemente.')
        setEquipamentos(equipamentos.filter(e => e.id !== id))
    }

    const editarEquipamento = (id, novosDados) => {
        const eqp = equipamentos.find(e => e.id === id)
        if (eqp) registrarHistorico(novosDados.nome || eqp.nome, 'Edição', 'As informações do equipamento foram atualizadas.')
        setEquipamentos(equipamentos.map(e => e.id === id ? { ...e, ...novosDados } : e))
    }

    return (
        <EquipamentosContext.Provider value={{ equipamentos, historico, adicionarEquipamento, excluirEquipamento, editarEquipamento }}>
            {children}
        </EquipamentosContext.Provider>
    )
}