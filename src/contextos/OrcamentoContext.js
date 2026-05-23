import React, { createContext, useState } from 'react'

export const OrcamentoContext = createContext({})

export const OrcamentoProvider = ({ children }) => {
    const [orcamentos, setOrcamentos] = useState([
        { id: '1', descricao: 'Desenvolvimento de App Mobile', clienteAssociado: 'Tech Solutions Ltda', membroResponsavel: 'Carlos Santos', valorEstimado: 'R$ 15.000,00', dataCriacao: '10/10/2023', status: 'Aprovado' },
        { id: '2', descricao: 'Gestão de Tráfego Pago', clienteAssociado: 'Padaria Sabor & Arte', membroResponsavel: 'Ana Cecília', valorEstimado: 'R$ 2.500,00', dataCriacao: '15/11/2023', status: 'Pendente' },
        { id: '3', descricao: 'Consultoria Financeira', clienteAssociado: 'Mercado do Bairro', membroResponsavel: 'Lucas Almeida', valorEstimado: 'R$ 5.000,00', dataCriacao: '01/12/2023', status: 'Rejeitado' }
    ])

    const adicionarOrcamento = (dadosOrcamento) => {
        const novoOrcamento = {
            id: Date.now().toString(),
            ...dadosOrcamento
        }
        setOrcamentos([...orcamentos, novoOrcamento])
    }

    const excluirOrcamento = (id) => {
        setOrcamentos(orcamentos.filter(orcamento => orcamento.id !== id))
    }

    const editarOrcamento = (id, novosDados) => {
        setOrcamentos(orcamentos.map(orcamento => 
            orcamento.id === id ? { ...orcamento, ...novosDados } : orcamento
        ))
    }

    return (
        <OrcamentoContext.Provider value={{ orcamentos, adicionarOrcamento, excluirOrcamento, editarOrcamento }}>
            {children}
        </OrcamentoContext.Provider>
    )
}