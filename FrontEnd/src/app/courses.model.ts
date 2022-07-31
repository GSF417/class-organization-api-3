export interface course {
    name: string;
    prereqs: string[];
    semester: number;
}

export const ECOMP: course[] = [
    { name: 'Cálculo em uma Variável', prereqs: ["","",""], semester: 1},
    { name: 'Ciência, Tecnologia e Sociedade', prereqs: ["","",""], semester: 1},
    { name: 'Lógica de Programação', prereqs: ["","",""], semester: 1},
    { name: 'Química Geral', prereqs: ["","",""], semester: 1},
    { name: 'Fundamentos de Biologia Moderna', prereqs: ["","",""], semester: 1},
    { name: 'Fenômenos Mecânicos', prereqs: ["","",""], semester: 2},
    { name: 'Algoritmos e Estruturas de Dados I', prereqs: ["","",""], semester: 2},
    { name: 'Geometria Analítica', prereqs: ["","",""], semester: 2},
    { name: 'Séries e Equações Diferenciais', prereqs: ["","",""], semester: 2},
    { name: 'Matemática Discreta', prereqs: ["","",""], semester: 2},
    { name: 'Desenho Técnico Básico', prereqs: ["","",""], semester: 2},
    { name: 'Fenômenos do Contínuo', prereqs: ["","",""], semester: 3},
    { name: 'Algoritmos e Estruturas de Dados II', prereqs: ["","",""], semester: 3},
    { name: 'Cálculo em Várias Variáveis', prereqs: ["","",""], semester: 3},
    { name: 'Álgebra Linear', prereqs: ["","",""], semester: 3},
    { name: 'Probabilidade e Estatística', prereqs: ["","",""], semester: 3},
    { name: 'Circuitos Digitais', prereqs: ["","",""], semester: 3},
    { name: 'Projeto e Análise de Algoritmos', prereqs: ["","",""], semester: 4},
    { name: 'Programação Orientada a Objetos', prereqs: ["","",""], semester: 4},
    { name: 'Circuitos Elétricos I', prereqs: ["","",""], semester: 4},
    { name: 'Fenômenos Eletromagnéticos', prereqs: ["","",""], semester: 4},
    { name: 'Arquitetura e Organização de Computadores', prereqs: ["","",""], semester: 4},
    { name: 'Laboratório de Sistemas Computacionais: Circuitos Digitais', prereqs: ["","",""], semester: 4},
    { name: 'Laboratório de Circuitos Elétricos', prereqs: ["","",""], semester: 5},
    { name: 'Fenômenos Eletromagnéticos Experimental', prereqs: ["","",""], semester: 5},
    { name: 'Análise de Sinais', prereqs: ["","",""], semester: 5},
    { name: 'Circuitos Elétricos II', prereqs: ["","",""], semester: 5},
    { name: 'Linguagens Formais e Autômatos', prereqs: ["","",""], semester: 5},
    { name: 'Laboratório de Sistemas Computacionais: Arquitetura e Organização de Computadores', prereqs: ["","",""], semester: 5},
    { name: 'Engenharia de Software', prereqs: ["","",""], semester: 6},
    { name: 'Mecânica Geral', prereqs: ["","",""], semester: 6},
    { name: 'Controle de Sistemas Dinâmicos', prereqs: ["","",""], semester: 6},
    { name: 'Banco de Dados', prereqs: ["","",""], semester: 6},
    { name: 'Compiladores', prereqs: ["","",""], semester: 6},
    { name: 'Laboratório de Sistemas Computacionais: Engenharia de Sistemas', prereqs: ["","",""], semester: 6},
    { name: 'Microeconomia', prereqs: ["","",""], semester: 7},
    { name: 'Sistemas Embarcados', prereqs: ["","",""], semester: 7},
    { name: 'Materiais Elétricos', prereqs: ["","",""], semester: 7},
    { name: 'Seminários Interdisciplinares', prereqs: ["","",""], semester: 7},
    { name: 'Projetos em Engenharia de Computação', prereqs: ["","",""], semester: 7},
    { name: 'Sistemas Operacionais', prereqs: ["","",""], semester: 7},
    { name: 'Laboratório de Sistemas Computacionais: Compiladores', prereqs: ["","",""], semester: 7},
    { name: 'Cálculo Numérico', prereqs: ["","",""], semester: 8},
    { name: 'Teorias Administrativas', prereqs: ["","",""], semester: 8},
    { name: 'Programação Concorrente e Distríbuida', prereqs: ["","",""], semester: 8},
    { name: 'Segurança da Informação', prereqs: ["","",""], semester: 8},
    { name: 'Redes de Computadores', prereqs: ["","",""], semester: 8},
    { name: 'Laboratório de Sistemas Computacionais: Sistemas Operacionais', prereqs: ["","",""], semester: 8},
    { name: 'Laboratório de Sistemas Computacionais: Comunicação Digital', prereqs: ["","",""], semester: 9},
];

export const CCOMP: course[] = [
    { name: 'Cálculo em uma Variável', prereqs: ["","",""], semester: 1},
    { name: 'Ciência, Tecnologia e Sociedade', prereqs: ["","",""], semester: 1},
    { name: 'Lógica de Programação', prereqs: ["","",""], semester: 1},
    { name: 'Química Geral', prereqs: ["","",""], semester: 1},
    { name: 'Fundamentos de Biologia Moderna', prereqs: ["","",""], semester: 1},
    { name: 'Fenômenos Mecânicos', prereqs: ["","",""], semester: 2},
    { name: 'Algoritmos e Estruturas de Dados I', prereqs: ["","",""], semester: 2},
    { name: 'Geometria Analítica', prereqs: ["","",""], semester: 2},
    { name: 'Séries e Equações Diferenciais', prereqs: ["","",""], semester: 2},
    { name: 'Matemática Discreta', prereqs: ["","",""], semester: 2},
    { name: 'Algoritmos e Estruturas de Dados II', prereqs: ["","",""], semester: 3},
    { name: 'Cálculo em Várias Variáveis', prereqs: ["","",""], semester: 3},
    { name: 'Álgebra Linear', prereqs: ["","",""], semester: 3},
    { name: 'Probabilidade e Estatística', prereqs: ["","",""], semester: 3},
    { name: 'Circuitos Digitais', prereqs: ["","",""], semester: 3},
    { name: 'Banco de Dados', prereqs: ["","",""], semester: 4},
    { name: 'Projeto e Análise de Algoritmos', prereqs: ["","",""], semester: 4},
    { name: 'Programação Orientada a Objetos', prereqs: ["","",""], semester: 4},
    { name: 'Circuitos Elétricos I', prereqs: ["","",""], semester: 4},
    { name: 'Arquitetura e Organização de Computadores', prereqs: ["","",""], semester: 4},
    { name: 'Cálculo Numérico', prereqs: ["","",""], semester: 4},
    { name: 'Inteligência Artificial', prereqs: ["","",""], semester: 5},
    { name: 'Projeto Orientado a Objetos', prereqs: ["","",""], semester: 5},
    { name: 'Teoria dos Grafos', prereqs: ["","",""], semester: 5},
    { name: 'Sistemas Operacionais', prereqs: ["","",""], semester: 5},
    { name: 'Linguagens Formais e Autômatos', prereqs: ["","",""], semester: 5},
    { name: 'Engenharia de Software', prereqs: ["","",""], semester: 6},
    { name: 'Redes de Computadores', prereqs: ["","",""], semester: 6},
    { name: 'Computação Gráfica', prereqs: ["","",""], semester: 6},
    { name: 'Programação Concorrente e Distríbuida', prereqs: ["","",""], semester: 6},
    { name: 'Compiladores', prereqs: ["","",""], semester: 6},
];