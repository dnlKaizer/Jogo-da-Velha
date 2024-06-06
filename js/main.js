import { Interface } from "./Interface.js";
import { JogoDaVelha } from "./JogoDaVelha.js";

let jogo = new JogoDaVelha()
let tela = new Interface(jogo)

/**
 * @param {number} indexCell 
 */
window.clicar = (indexCell) => {
    jogo.jogar(indexCell)
    tela.atualizarPainel()
} 

/**
 * @param {number} tipoModo 
 */  
window.escolherModo = (tipoModo) => {

} 

window.reiniciar = () => {
    tela.reiniciar()
    jogo = new JogoDaVelha()
    tela.setJogo = jogo
} 

window.clicarSeletor = () => {

} 