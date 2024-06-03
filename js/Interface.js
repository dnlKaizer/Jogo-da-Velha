import { JogoDaVelha } from "./JogoDaVelha.js"
import { Seletor } from "./Seletor.js"

export class Interface {
    /**
     * @param {JogoDaVelha} jogo
     */
    constructor(jogo) {
        this.jogo = jogo
        this.cells = document.getElementsByClassName('cell')
        this.box = document.querySelector('#box')
        this.seletor = new Seletor()
        this.modo = document.querySelector('#modo')
        this.buttonReiniciar = document.querySelector('#reiniciar')     
        this.background = document.querySelector('.background')
    }

    get getModo() {
        return this.seletor.getModo
    }

    /**
     * @param {JogoDaVelha} jogo
     */
    set setJogo(jogo) {
        this.jogo = jogo
    }
}