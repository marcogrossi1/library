let formularioPesquisa = document.querySelector('#formulario-pesquisa')
let formularioAdiciona = document.querySelector('#formulario-adiciona')

let formularioInicial = document.querySelector('#escolha-inicial')

let opcaoPesquisa = document.querySelector('#pesquisar')
let opcaoAdiciona = document.querySelector('#adicionar')

let livrosEncontradosEl = document.querySelector('#livros-encontrados')

const ocultaFormularios = (valor) => {
    if(valor == 'pesquisa') {
        formularioAdiciona.classList.add('oculto')
        formularioPesquisa.classList.remove('oculto')
    }

    else if(valor == 'adiciona') {
        formularioAdiciona.classList.remove('oculto')
        formularioPesquisa.classList.add('oculto')
    }

    else {
        formularioAdiciona.classList.add('oculto')
        formularioPesquisa.classList.add('oculto')
    }
}

formularioInicial.addEventListener('input', () => ocultaFormularios(formularioInicial.value))
opcaoPesquisa.addEventListener('click', () => ocultaFormularios('pesquisa'))
opcaoAdiciona.addEventListener('click', () => ocultaFormularios('adiciona'))

const url = 'https://sheetdb.io/api/v1/wyjrn46se5m0s'

// Searching

let pesquisaTituloEl = document.querySelector('#titulo-pesquisa')
let botaoPesquisaEl = document.querySelector('#botao-pesquisa')

    pesquisaTituloEl.addEventListener('keyup', (e) => {
        if(e.keyCode === 13)
            pesquisaLivros(pesquisaTituloEl)
    })


let livros = [{}, {}]

const escreveLivrosEncontrados = (dados, i) => {
    resultadosLivros.classList.remove('oculto')
    formularioPesquisa.classList.add('oculto')

    if(dados[i].Situação == "Na Estante") {
        livrosEncontradosEl.innerHTML += 
        `<article class='livro-resultado-disp'>
            <ul>
                <h2 id='titulo-display'>${dados[i].Título}</h2>
                <h4 id='autor-display'>${dados[i].Autor}</h4>
                <li>Gênero: ${dados[i].Gênero}</li>
                <li>Data: ${dados[i].Data}</li>
                <li>Estante: ${dados[i].Estante}</li>
                <li>Situação: ${dados[i].Situação}</li>
                <li>Index: ${dados[i].Index}</li>
            </ul>
            <button id='botao-reserva'>Reservar</button>
        </article>`
    }
    
    else {
        livrosEncontradosEl.innerHTML += 
        `<article class='livro-resultado-indisp'>
            <ul>
                <h2 id='titulo-display'>${dados[i].Título}</h2>
                <h4 id='autor-display'>${dados[i].Autor}</h4>
                <li>Gênero: ${dados[i].Gênero}</li>
                <li>Data: ${dados[i].Data}</li>
                <li>Estante: ${dados[i].Estante}</li>
                <li>Situação: ${dados[i].Situação}</li>
                <li>Index: ${dados[i].Index}</li>
            </ul>
            <button id='botao-devolve'>Devolução</button>
        </article>`    
    }
}

let formularioReserva = document.querySelector('#formulario-reserva')
let formularioDevolve = document.querySelector('#formulario-devolve')
let resultadosLivros = document.querySelector('#resultados-livros')

const updateReserva = (bookTitle, name) => {
    fetch(url + '/Título/' + bookTitle, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            data: {
                'Situação': name
            }
        })
    })

    .then((response) => response.json())
    .then((data) => console.log(data));
}

const reservaLivros = () => {
    let botaoReservaEl = document.querySelectorAll('#botao-reserva')
    let livroEscolhido = []

    for(let i = 0; i < botaoReservaEl.length; i++)
        botaoReservaEl[i].addEventListener('click', () =>{
            livroEscolhido[0] = livros[i]

            console.log(livroEscolhido)
            
            livrosEncontradosEl.innerHTML = ''
            escreveLivrosEncontrados(livroEscolhido, 0)

            formularioReserva.classList.remove('oculto')
        })
            
    let nameSelectionEl = document.querySelector('#name-selection')
    let confirmaReservaEl = document.querySelector('#confirma-reserva')
    let avisoEl = document.querySelector('#aviso')
    
    confirmaReservaEl.addEventListener('click', () => {
        updateReserva(livroEscolhido[0].Título, nameSelectionEl.value)
        
        setTimeout(function() {
            formularioReserva.classList.add('oculto')
            formularioPesquisa.classList.add('oculto')
            formularioDevolve.classList.add('oculto')
            resultadosLivros.classList.add('oculto')
            formularioInicial.value = ''
            avisoEl.innerHTML = ''
        }, 5000)

        avisoEl.innerHTML = `Oi, ${nameSelectionEl.value}, registramos sua reserva!`
    })
}

let cancelaEl = document.querySelectorAll('#cancela')

for(let i = 0; i < cancelaEl.length; i++)
    cancelaEl[i].addEventListener('click', () => {
        formularioReserva.classList.add('oculto')
        formularioPesquisa.classList.add('oculto')
        formularioDevolve.classList.add('oculto')
        resultadosLivros.classList.add('oculto')
        formularioAdiciona.classList.add('oculto')
        formularioInicial.value = ''
        avisoEl.innerHTML = ''
    })

const devolveLivros = () => {
    let botaoDevolveEl = document.querySelectorAll('#botao-devolve')
    let livroEscolhido = []

    for(let i = 0; i < botaoDevolveEl.length; i++)
        botaoDevolveEl[i].addEventListener('click', () =>{
            livroEscolhido[0] = livros[i]

            console.log(livroEscolhido)
            
            livrosEncontradosEl.innerHTML = ''
            escreveLivrosEncontrados(livroEscolhido, 0)

            formularioDevolve.classList.remove('oculto')
        })
            
    let confirmaDevolveEl = document.querySelector('#confirma-devolucao')
    let avisoEl = document.querySelector('#aviso-devolve')
    
    confirmaDevolveEl.addEventListener('click', () => {
        updateReserva(livroEscolhido[0].Título, 'Na Estante')

        setTimeout(function() {
            formularioReserva.classList.add('oculto')
            formularioPesquisa.classList.add('oculto')
            formularioDevolve.classList.add('oculto')
            formularioInicial.value = ''
        }, 5000)

        avisoEl.innerHTML = `Oi, ${livroEscolhido[0].Situação}, registramos sua devolução!<br> ESTANTE: <em>${livroEscolhido[0].Estante}</em>`
    })
}

const pesquisaLivros = (metodo) => {
    fetch(url + `/search_or?Título=${metodo.value}*&Gênero=${metodo.value}*&Autor=${metodo.value}*&Estante=${metodo.value}*&Data=${metodo.value}&Situação=${metodo.value}*`)
    .then((response) => response.json())
    .then((data) => {
        livrosEncontradosEl.innerHTML = `Mostrando ${data.length} resultados para '${metodo.value}':`

        for(let i = 0; i < data.length; i++) { 
            livros[i] = data[i]

            escreveLivrosEncontrados(data, i)
        }
        console.log(data)

        reservaLivros()
        devolveLivros()
    });
}

let generoSelecionaEl = document.querySelector('#genero-seleciona')

botaoPesquisaEl.addEventListener('click', () => pesquisaLivros(pesquisaTituloEl))
generoSelecionaEl.addEventListener('input', () => pesquisaLivros(generoSelecionaEl))

//Adding books

let botaoAdicionaEl = document.querySelector('#botao-adiciona')

const adicionaData = () => {
    let data = new Date()

    return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`
}

const adicionaLivro = () => {
    let tituloAdiciona = document.querySelector('#titulo-adiciona')
    let autorAdiciona = document.querySelector('#autor-adiciona')
    let generoAdiciona = document.querySelector('#genero-adiciona')
    let estanteAdiciona = document.querySelector('#estante-adiciona')
    let dataAdiciona = document.querySelector('#data-adiciona')
    let situacaoAdiciona = document.querySelector('#situacao-adiciona')

    if(dataAdiciona.value == '')
        dataAdiciona.value = adicionaData()


    dado = {
        Título: tituloAdiciona.value,
        Autor: autorAdiciona.value,
        Gênero: generoAdiciona.value,
        Estante: estanteAdiciona.value,
        Data: dataAdiciona.value,
        Situação: situacaoAdiciona.value
    }

    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            data: [{
                    'Título': dado.Título,
                    'Autor': dado.Autor,
                    'Gênero': dado.Gênero,
                    'Estante': dado.Gênero,
                    'Data': dado.Data,
                    'Situação': dado.Situação
            }]
        })
    })
  .then((response) => response.json())
  .then((data) => console.log(data));
}

botaoAdicionaEl.addEventListener('click', () => adicionaLivro())
