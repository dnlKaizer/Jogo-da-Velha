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

    get getNjogadas() {
        return this.jogo.getNJogadas
    }

    /**
     * @param {JogoDaVelha} jogo
     */
    set setJogo(jogo) {
        this.jogo = jogo
    }

    adicionarSimbolo(indexCell) {
        const cell = cells[indexCell]
        const symbol = this.getNjogadas % 2
        if (symbol == 0) {
            symbol = this.criarO()
        } else {
            symbol = this.criarX()
        }
        cell.appendChild(symbol)
    }

    /**
     * @returns {HTMLDivElement}
     */
    criarX() {
        const symbol1 = document.createElement('div')
        const symbol11 = document.createElement('div')
        const symbol12 = document.createElement('div')
        symbol1.classList = 'symbol1'
        symbol11.classList = 'symbol11'
        symbol12.classList = 'symbol12'
        symbol1.appendChild(symbol11)
        symbol1.appendChild(symbol12)
        return symbol1
    }
    /**
     * @returns {HTMLDivElement}
     */
    criarO() {
        const symbol0 = document.createElement('div')
        symbol0.classList = 'symbol0'
        return symbol0
    }

    /**
     * @param {number} index 
     * @returns {number[]}
     */  
    indexParaIndices(index) {
        const j = index % 3
        const i = (index - j) / 3
        return [i,j]
    }

    /**
     * @param {number} i 
     * @param {number} j 
     * @returns {number}
     */
    indicesParaIndex(i, j) {
        const index = (3 * i) + j
        return index 
    }
}