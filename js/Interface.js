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

    atualizarPainel() {
        for (let i = 0; i < 9; i++) {
            const cell = this.cells[i]
            if (cell.querySelector('div') == null && this.jogo.getIndice(i) != -1) {
                this.#adicionarSimbolo(cell)
                this.#disableButton(cell)
            }
        }

        if (this.jogo.getFim) {
            this.#disableAllCellButtons()
        }
    }

    /**
     * @param {HTMLButtonElement} cell 
     */
    #adicionarSimbolo(cell) {
        let symbol = this.getNjogadas % 2
        if (symbol == 0) {
            symbol = this.#criarO()
        } else {
            symbol = this.#criarX()
        }
        cell.appendChild(symbol)
    }

    /**
     * @param {HTMLButtonElement} cell 
     */
    #removerSimbolo(cell) {
        const div = cell.querySelector('div')
        if (div != null) {
            cell.removeChild(div)
        }
    }

    /**
     * @param {HTMLButtonElement} button 
     */
    #disableButton(button) {
        button.disabled = true
        button.style.cursor = 'default'
    }

    /**
     * @param {HTMLButtonElement} button 
     */
    #enableButton(button) {
        button.disabled = false
        button.style.cursor = 'pointer'
    }

    #disableAllCellButtons() {
        for (let index = 0; index < 9; index++) {
            const cell = this.cells[index];
            this.#disableButton(cell)
        }
    }

    #enableAllCellButtons() {
        for (let index = 0; index < 9; index++) {
            const cell = this.cells[index];
            this.#enableButton(cell)
        }
    }

    /**
     * @param {HTMLButtonElement} cell 
     */
    #desaparecerSymbol(cell) {
        let symbol = cell.querySelector('div')
        if (symbol.className == 'symbol1') {
            const symbol11 = symbol.querySelector('.symbol11')
            const symbol12 = symbol.querySelector('.symbol12')

            symbol11.style.animation = 'disappear-x1 0.4s'
            symbol12.style.animation = 'disappear-x2 0.4s'

            symbol = symbol11
        } else {
            symbol.style.animation = 'disappear-o 0.4s'
        }
        symbol.addEventListener("animationend", () => {
            this.#removerSimbolo(cell)
            this.#enableButton(cell)
        })
    }

    #desaparecerAllSymbols() {
        for (let index = 0; index < 9; index++) {
            if (this.jogo.getIndice(index) != -1) {
                const cell = this.cells[index]
                this.#desaparecerSymbol(cell)
            }
        }
    }

    reiniciar() {
        this.#desaparecerAllSymbols()
        // ASYNC AWAIT AQUI OH
        this.#enableAllCellButtons()
    }

    /**
     * @returns {HTMLDivElement}
     */
    #criarX() {
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
    #criarO() {
        const symbol0 = document.createElement('div')
        symbol0.classList = 'symbol0'
        return symbol0
    }

    /**
     * @param {number} index 
     * @returns {number[]}
     */  
    #indexParaIndices(index) {
        const j = index % 3
        const i = (index - j) / 3
        return [i,j]
    }
    /**
     * @param {number} i 
     * @param {number} j 
     * @returns {number}
     */
    #indicesParaIndex(i, j) {
        const index = (3 * i) + j
        return index 
    }
}