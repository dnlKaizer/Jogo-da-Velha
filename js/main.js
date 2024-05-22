import { Interface } from './Interface.js'
import { JogoDaVelha } from './JogoDaVelha.js'

window.clicar = function (index) {
    jogo.jogarIndex(index)
    tela.atualizar()
}

let jogo = new JogoDaVelha()
let tela = new Interface(jogo)