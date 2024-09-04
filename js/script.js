// Array para armazenar os dados dos alunos
let alunos = [];

// Função para adicionar um aluno à lista
function adicionarAluno() {
    const nome = document.getElementById('nome').value;
    const notas = [
        parseFloat(document.getElementById('nota1').value),
        parseFloat(document.getElementById('nota2').value),
        parseFloat(document.getElementById('nota3').value),
        parseFloat(document.getElementById('nota4').value),
        parseFloat(document.getElementById('nota5').value)
    ];
    const frequencia = parseFloat(document.getElementById('frequencia').value);

    // Verifica se todos os campos foram preenchidos corretamente
    if (nome && notas.every(nota => !isNaN(nota) && nota >= 0 && nota <= 10) && !isNaN(frequencia) && frequencia >= 0 && frequencia <= 100) {
        // Adiciona o aluno ao array
        alunos.push({ nome, notas, frequencia });

        // Limpa os campos do formulário
        document.getElementById('formulario').reset();

        // Atualiza o resultado
        processarAlunos();
    } else {
        alert("Por favor, preencha todos os campos corretamente.");
    }
}

// Função para calcular a média das notas de um aluno
function calcularMediaNotas(notas) {
    const soma = notas.reduce((acc, nota) => acc + nota, 0);
    return soma / notas.length;
}

// Função para calcular a média de uma disciplina na turma
function calcularMediaDisciplina(alunos, disciplinaIndex) {
    const soma = alunos.reduce((acc, aluno) => acc + aluno.notas[disciplinaIndex], 0);
    return soma / alunos.length;
}

// Função para verificar quais alunos estão acima da média da turma e quais têm frequência abaixo de 75%
function verificarAlunosAtencao(alunos, mediaTurma) {
    const acimaMedia = alunos.filter(aluno => aluno.mediaNotas > mediaTurma).map(aluno => aluno.nome);
    const frequenciaBaixa = alunos.filter(aluno => aluno.frequencia < 75).map(aluno => aluno.nome);

    return { acimaMedia, frequenciaBaixa };
}

// Função principal para processar os dados dos alunos
function processarAlunos() {
    // Calcular média de notas de cada aluno e a média da turma para cada disciplina
    alunos.forEach(aluno => {
        aluno.mediaNotas = calcularMediaNotas(aluno.notas);
    });

    const mediaTurmaDisciplinas = [];
    for (let i = 0; i < 5; i++) {
        mediaTurmaDisciplinas.push(calcularMediaDisciplina(alunos, i));
    }

    // Calcular média geral da turma
    const mediaTurma = alunos.reduce((acc, aluno) => acc + aluno.mediaNotas, 0) / alunos.length;

    // Verificar alunos que precisam de atenção especial
    const { acimaMedia, frequenciaBaixa } = verificarAlunosAtencao(alunos, mediaTurma);

    // Exibir os resultados na página
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `
        ${alunos.map(aluno => `<p>${aluno.nome} ${aluno.mediaNotas.toFixed(2)} ${aluno.frequencia}%</p>`).join('')}
        
        <h3>Média da Turma em Cada Disciplina</h3>
        ${mediaTurmaDisciplinas.map((media, index) => `<p>Disciplina ${index + 1}: ${media.toFixed(2)}</p>`).join('')}
        
        <h3>Alunos com Média Acima da Média da Turma</h3>
        <p>${acimaMedia.length > 0 ? acimaMedia.join(", ") : ""}</p>
        
        <h3>Alunos com Frequência Abaixo de 75%</h3>
        <p>${frequenciaBaixa.length > 0 ? frequenciaBaixa.join(", ") : ""}</p>
    `;
}
