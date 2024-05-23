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
    setTimeout(() => {
        jogo = new JogoDaVelha()
        tela = new Interface(jogo)
    }, 500)
}

window.clicarSeletor = () => {
    tela.atualizarSeletor()
}

let jogo = new JogoDaVelha()
let tela = new Interface(jogo)