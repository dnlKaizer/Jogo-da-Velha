import { Interface } from "./Interface.js";
import { JogoDaVelha } from "./JogoDaVelha.js";
import { Cpu } from "./Cpu.js";

let jogo = new JogoDaVelha()
let tela = new Interface(jogo)
let cpu

/**
 * @param {number} indexCell 
 */
window.clicar = (indexCell) => {
    jogo.jogar(indexCell)
    tela.atualizarPainel()
    if (tela.getModo < 3 && !jogo.getFim) {
        jogadaCpu()
    }
} 

function jogadaCpu() {
    cpu = new Cpu(jogo, tela.getModo)
    cpu.jogar()
    tela.disableAllCellButtons()
    setTimeout(() => {
        tela.atualizarPainel()
        if (!jogo.getFim) {
            tela.enableSelectedCellButtons()
        }
    }, 750);
}

/**
 * @param {number} tipoModo 
 */  
window.escolherModo = (tipoModo) => {
    window.reiniciar()
    tela.escolherModo(tipoModo)
} 

window.reiniciar = () => {
    tela.reiniciar()
    jogo = new JogoDaVelha()
    tela.setJogo = jogo
} 

window.clicarSeletor = () => {
    tela.clicarSeletor()
} 
