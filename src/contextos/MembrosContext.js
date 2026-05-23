import React, { createContext, useState } from 'react'

export const MembrosContext = createContext({})

export const MembrosProvider = ({ children }) => {
    // Estado global com a lista de membros
    const [membros, setMembros] = useState([
        { 
            id: '1', 
            nome: 'Carlos Santos', 
            email: 'carlos.santos@compjunior.com.br', 
            telefone: '(35) 99999-9999', 
            area: 'Vendas',
            habilidades: 'Comunicação, Negociação',
            dataIngresso: '10/02/2023',
            aniversario: '15/05/2000',
            genero: 'Masculino',
            foto: require('../assets/user.png')
        },
        { 
            id: '2', 
            nome: 'Santos Carlos', 
            email: 'santos.carlos@compjunior.com.br', 
            telefone: '(35) 98888-8888', 
            area: 'Presidencia',
            habilidades: 'Gerencia, Organização',
            dataIngresso: '11/02/2024',
            aniversario: '25/10/1999',
            genero: 'Masculino',
            foto: require('../assets/user.png')
        },
        { 
            id: '3', 
            nome: 'Ana Cecília', 
            email: 'ana.cecilia@compjunior.com.br', 
            telefone: '(35) 97777-7777',
            area: 'Marketing',
            habilidades: 'Desing, Organização',
            dataIngresso: '03/12/2025',
            aniversario: '25/07/2003',
            genero: 'Feminino',
            foto: require('../assets/user.png')
        },
        { 
            id: '4', 
            nome: 'Mariana Silva', 
            email: 'mariana.silva@compjunior.com.br', 
            telefone: '(35) 96666-6666',
            area: 'GP',
            habilidades: 'Liderança, Scrum',
            dataIngresso: '01/03/2023',
            aniversario: '12/04/2001',
            genero: 'Feminino',
            foto: require('../assets/user.png')
        },
        { 
            id: '5', 
            nome: 'Pedro Costa', 
            email: 'pedro.costa@compjunior.com.br', 
            telefone: '(35) 95555-5555',
            area: 'Projetos',
            habilidades: 'React Native, Node.js',
            dataIngresso: '15/06/2023',
            aniversario: '22/08/2002',
            genero: 'Masculino',
            foto: require('../assets/user.png')
        },
        { 
            id: '6', 
            nome: 'Luiza Souza', 
            email: 'luiza.souza@compjunior.com.br', 
            telefone: '(35) 94444-4444',
            area: 'Diretoria',
            habilidades: 'Gestão Estratégica, Visão de Negócios',
            dataIngresso: '10/01/2022',
            aniversario: '05/11/1998',
            genero: 'Feminino',
            foto: require('../assets/user.png')
        },
        { 
            id: '7', 
            nome: 'Lucas Almeida', 
            email: 'lucas.almeida@compjunior.com.br', 
            telefone: '(35) 93333-3333',
            area: 'Gerência',
            habilidades: 'Análise de Dados, Planejamento',
            dataIngresso: '20/09/2023',
            aniversario: '30/01/2000',
            genero: 'Masculino',
            foto: require('../assets/user.png')
        }
    ])

    // Função genérica para adicionar um membro
    const adicionarMembro = (dadosMembro) => {
        const novoMembro = {
            id: Date.now().toString(), // Gera um ID único simples
            foto: require('../assets/user.png'), // Padrão
            ...dadosMembro // Agora os dados novos substituem o padrão se existirem
        }
        setMembros([...membros, novoMembro])
    }

    // Função para excluir membro baseado no ID
    const excluirMembro = (id) => {
        setMembros(membros.filter(membro => membro.id !== id))
    }

    // Função para editar os dados de um membro existente
    const editarMembro = (id, novosDados) => {
        setMembros(membros.map(membro => 
            membro.id === id ? { ...membro, ...novosDados } : membro
        ))
    }

    return (
        <MembrosContext.Provider value={{ membros, adicionarMembro, excluirMembro, editarMembro }}>
            {children}
        </MembrosContext.Provider>
    )
}