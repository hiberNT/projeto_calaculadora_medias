var form = document.getElementById('form-atividade')
const imgAprovado = '<img src="./images/aprovado.png" alt="Emoji celebrando" />'
const imgReprovado = '<img src="./images/reprovado.png" alt="Emoji descepcionado" />'
const atividades = [] //arrays feitas para armazenar o que for informado pelo o usuário
const notas = []
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>' //colocamos o span para ficar personalizado o aprov e reprov ta puxando o span do css
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>'
const notaMinima = Number(prompt("Digite a nota minima:"))//pra perguntar pro usuario no inicio qual vai ser a media das notas

let linhas = '' //esta aqui no inicio pois se colocarmos dps do evente submit não vai funcionar pois o quando clicamos em submit esta sendo resetado o conteúdo

form.addEventListener('submit',function(e) {
    e.preventDefault() 

    adicionarLinha()
    atualizaTabela() 
    atualizaMediaFinal()
})

function adicionarLinha() {
    var inputNomeatividade = document.getElementById('nome-ativ')
    var inputNotaatividade = document.getElementById('nota-ativ')

    if(atividades.includes(inputNomeatividade.value)) { //vai verificar se a atividade colocado pelo o usuario ja esta no array atividades para que não temos 2 atividades com mesmo nome atraves dessa função includes
        alert(`A atividade: ${inputNomeatividade.value} já foi inserida`)
    }else {
        atividades.push(inputNomeatividade.value)// feito para adicionar o conteudo as arrays vazias quando o adicionarLinha for ativado
        notas.push(Number(inputNotaatividade.value)) //trasformei a string em numero com o Number() para assim consguirmos somar se fosse string ia acontecer uma concatenação '5'+'5'=55
    
        let linha = '<tr>' //estamos fazendo aqui nossos valores digitados ir para a tabela e ela esta recebendo nossa html como string por isso ''
        linha += `<td> ${inputNomeatividade.value}</td>`// += é usado como uma concatenação pq é mais facil so += que linha = linha + outro conteudo
        linha += `<td> ${inputNotaatividade.value} </td>`
        linha += `<td> ${inputNotaatividade.value >=notaMinima ? imgAprovado  : imgReprovado } </td>`//usamos o operador ternario ? : ta na mina anotação do word sobre
        linha += '</tr>'
    
        linhas += linha // feito para que seja feita mais linhas dps de adicionar nome e nota da materia 
    }

    inputNomeatividade.value = '' //fazendo iisso para limpar o campo dps que digitarmos
    inputNotaatividade.value = ''
}

function atualizaTabela() {
    var corpoTabela = document.querySelector('tbody')
    corpoTabela.innerHTML = linhas
}

function atualizaMediaFinal() {
    const mediaFinal = calculaMediaFinal()

    document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2) // to fixed limita o tanto de casas decimais ,aqui estamos organizando para aparecer o valor da divisão das notas
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >=notaMinima ? spanAprovado : spanReprovado
}

function calculaMediaFinal() {
    let somaDasNotas = 0

    for(let i =0; i < notas.length; i++) { // enquato i for menor que notas ex 7<10 ele vai entrar no i++ e ser incrementado cada vez que entrar no for
        somaDasNotas += notas[i]           // i++ é a mesmma coisa de i= i + 1
    }
    
    return somaDasNotas / notas.length
}