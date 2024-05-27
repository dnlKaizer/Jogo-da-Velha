import { Cpu } from './Cpu.js'
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
    jogo = new JogoDaVelha()
    tela = new Interface(jogo)
    if (index < 3) {
        cpu = new Cpu(jogo, index)
    } else {
        cpu = 0
    }
}

let jogo = new JogoDaVelha()
let tela = new Interface(jogo)
let cpu = 0