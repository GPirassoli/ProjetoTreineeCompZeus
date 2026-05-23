import React, { createContext, useState } from 'react'

export const ClientesContext = createContext({})

export const ClientesProvider = ({ children }) => {
    // Estado global com a lista de clientes
    const [clientes, setClientes] = useState([
        { 
            id: '1', 
            nome: 'Tech Solutions Ltda', 
            email: 'contato@techsolutions.com.br', 
            telefone: '(11) 98765-4321', 
            membroResponsavel: 'Carlos Santos',
            segmento: 'Tecnologia',
            status: 'Ativo',
            endereco: 'Av. Paulista, 1000 - São Paulo, SP',
            anotacoes: 'Cliente prioritário focado em desenvolvimento de sistemas ERP.',
            reunioes: 'Semanalmente (Sextas 14h)',
            propostas: 'Proposta #102 aprovada em Out/2023.'
        },
        { 
            id: '2', 
            nome: 'Padaria Sabor & Arte', 
            email: 'padaria@saborearte.com', 
            telefone: '(35) 91234-5678', 
            membroResponsavel: 'Ana Cecília',
            segmento: 'Alimentício',
            status: 'Em Prospecção',
            endereco: 'Rua Direita, 200 - Pouso Alegre, MG',
            anotacoes: 'Apresentar pacote de marketing digital e gestão de mídias.',
            reunioes: 'Agendada: 20/11/2023',
            propostas: 'Em elaboração.'
        },
        { 
            id: '3', 
            nome: 'Construtora Alpha', 
            email: 'contato@construtoraalpha.com.br', 
            telefone: '(11) 97777-6666', 
            membroResponsavel: 'Mariana Silva',
            segmento: 'Construção Civil',
            status: 'Inativo',
            endereco: 'Av. das Nações, 500 - Bauru, SP',
            anotacoes: 'Projeto finalizado em 2022. Tentativa de reativação sem sucesso recente.',
            reunioes: 'Nenhuma agendada',
            propostas: 'Sem propostas ativas.'
        },
        { 
            id: '4', 
            nome: 'Mercado do Bairro', 
            email: 'gerencia@mercadobairro.com', 
            telefone: '(35) 95555-4444', 
            membroResponsavel: 'Lucas Almeida',
            segmento: 'Varejo',
            status: 'Lead',
            endereco: 'Rua das Flores, 10 - Itajubá, MG',
            anotacoes: 'Demonstrou interesse no sistema de estoque através de contato no Instagram.',
            reunioes: 'Pendente agendar primeira call',
            propostas: 'Ainda não enviada.'
        }
    ])

    // Função genérica para adicionar um cliente
    const adicionarCliente = (dadosCliente) => {
        const novoCliente = {
            id: Date.now().toString(), // Gera um ID único
            ...dadosCliente
        }
        setClientes([...clientes, novoCliente])
    }

    // Função para excluir cliente
    const excluirCliente = (id) => {
        setClientes(clientes.filter(cliente => cliente.id !== id))
    }

    // Função para editar cliente
    const editarCliente = (id, novosDados) => {
        setClientes(clientes.map(cliente => 
            cliente.id === id ? { ...cliente, ...novosDados } : cliente
        ))
    }

    return (
        <ClientesContext.Provider value={{ clientes, adicionarCliente, excluirCliente, editarCliente }}>
            {children}
        </ClientesContext.Provider>
    )
}