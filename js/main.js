import { Interface } from './Interface.js'
import { JogoDaVelha } from './JogoDaVelha.js'

window.clicar = (index) => {
    if (jogo.getMatriz.getIndiceByIndex(index) == -1) {
        jogo.jogarIndex(index)
        tela.atualizar()
    }
}

window.reiniciar = () => {
    tela.reiniciar()
    jogo = new JogoDaVelha()
    tela = new Interface(jogo)
}

window.clicarSeletor = () => {
    tela.atualizarSeletor()
}

window.escolherModo = (index) => {
    tela.escolherModo(index)
    window.reiniciar()
    // ADICIONAR DIFICULDADE DO CPU AQUI
}

let jogo = new JogoDaVelha()
let tela = new Interface(jogo)