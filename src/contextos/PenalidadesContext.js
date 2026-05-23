import React, { createContext, useState } from 'react'

export const PenalidadesContext = createContext({})

export const PenalidadesProvider = ({ children }) => {
    const [penalidades, setPenalidades] = useState([
        { id: '1', membro: 'Carlos Santos', tipo: 'Advertência', motivo: 'Atraso injustificado em Reunião Geral', dataAplicacao: '10/11/2023', status: 'Ativa', evidencia: 'ata_reuniao.pdf' },
        { id: '2', membro: 'Ana Cecília', tipo: 'Suspensão', motivo: 'Falta de entrega de atividades', dataAplicacao: '05/10/2023', status: 'Cumprida', evidencia: 'relatorio_faltas.pdf' }
    ])

    const adicionarPenalidade = (dadosPenalidade) => {
        const novaPenalidade = {
            id: Date.now().toString(),
            ...dadosPenalidade
        }
        setPenalidades([...penalidades, novaPenalidade])
    }

    const excluirPenalidade = (id) => {
        setPenalidades(penalidades.filter(penalidade => penalidade.id !== id))
    }

    const editarPenalidade = (id, novosDados) => {
        setPenalidades(penalidades.map(penalidade => 
            penalidade.id === id ? { ...penalidade, ...novosDados } : penalidade
        ))
    }

    return (
        <PenalidadesContext.Provider value={{ penalidades, adicionarPenalidade, excluirPenalidade, editarPenalidade }}>
            {children}
        </PenalidadesContext.Provider>
    )
}