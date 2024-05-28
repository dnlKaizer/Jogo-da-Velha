import { Cpu } from './Cpu.js'
import { Interface } from './Interface.js'
import { JogoDaVelha } from './JogoDaVelha.js'

window.clicar = (index) => {
    jogo.jogarIndex(index)
    tela.atualizar()
    if (cpu != 0) {
        tela.disableAllCellButtons()
        setTimeout(() => {
            if (!jogo.getFim) {
                tela.enableAllCellButtons()
                cpu.modoFacil()
                tela.atualizar()
            }
        }, 1000)
    }
}

window.reiniciar = () => {
    tela.reiniciar()
    const index = tela.getModo
    jogo = new JogoDaVelha()
    tela.setJogo = jogo
    if (index < 3) {
        cpu = new Cpu(jogo, index)
    } else {
        cpu = 0
    }
}

window.clicarSeletor = () => {
    tela.atualizarSeletor()
}

window.escolherModo = (index) => {
    tela.escolherModo(index)
    window.reiniciar()
}

let jogo = new JogoDaVelha()
let tela = new Interface(jogo)
let cpu = 0