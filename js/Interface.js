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
            this.disableAllCellButtons()
            this.#adicionarLinhaVitoria()
        }
    }

    reiniciar() {
        this.#desaparecerAllSymbols()
        this.enableSelectedCellButtons()
        this.#removerLinhaVitoria()
    }

    clicarSeletor() {
        if (this.seletor.getStatus) {
            this.seletor.disappear()
            this.#backgroundOff()
        } else {
            this.seletor.appear()
            this.#backgroundOn()
        }
    }

    escolherModo(tipoModo) {
        this.seletor.escolherModo(tipoModo)
        this.clicarSeletor()
    }

    #adicionarLinhaVitoria() {
        const vencedor = this.jogo.getVencedor
        const linha = document.createElement('div')
        linha.classList = 'vencedor'
        linha.id = `vencedor${vencedor.getType}${vencedor.getIndex}`
        linha.addEventListener("animationstart", () => {
            linha.style.opacity = '1'
        })
        this.box.appendChild(linha)
    }
    #removerLinhaVitoria() {
        const linha = this.box.querySelector('.vencedor')
        if (linha != null) {
            linha.remove()
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

    disableAllCellButtons() {
        for (let index = 0; index < 9; index++) {
            const cell = this.cells[index];
            this.#disableButton(cell)
        }
    }
    enableSelectedCellButtons() {
        for (let index = 0; index < 9; index++) {
            if (this.jogo.getIndice(index) == -1) {
                const cell = this.cells[index];
                this.#enableButton(cell)
            }
        }
    }

    /**
     * @param {HTMLButtonElement} cell 
     */
    #desaparecerSymbol(cell) {
        const symbol = cell.firstChild
        if (symbol != null) {
            if (symbol.className == 'symbol1') {
                this.#desaparecerX(cell, symbol)
            } else {
                this.#desaparecerO(cell, symbol)
            }
        }
    }
    #desaparecerAllSymbols() {
        for (let index = 0; index < 9; index++) {
            if (this.jogo.getIndice(index) != -1) {
                const cell = this.cells[index]
                this.#desaparecerSymbol(cell)
            }
        }
    }

    /**
     * @param {HTMLButtonElement} cell 
     * @param {HTMLDivElement} symbol 
     */
    #desaparecerX(cell, symbol) {
        const symbol11 = symbol.querySelector('.symbol11')
        const symbol12 = symbol.querySelector('.symbol12')

        symbol11.style.animation = 'disappear-x 0.25s ease-in-out 0.25s'
        symbol11.addEventListener("animationend", () => {
            symbol.remove()
            this.#enableButton(cell)
        })
        symbol12.style.animation = 'disappear-x 0.25s'
        symbol12.addEventListener("animationend", () => {
            symbol12.remove()
        })
    }
    /**
     * @param {HTMLButtonElement} cell 
     * @param {HTMLDivElement} symbol 
     */
    #desaparecerO(cell, symbol) {
        symbol.style.animation = 'disappear-o 0.5s linear'
        symbol.addEventListener("animationend", () => {
            symbol.remove()
            this.#enableButton(cell)
        })
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
        this.addStartEventSymbol(symbol11)
        this.addEndEventSymbol(symbol12)
        return symbol1
    }
    /**
     * @returns {HTMLDivElement}
     */
    #criarO() {
        const symbol0 = document.createElement('div')
        symbol0.classList = 'symbol0'
        this.addStartEventSymbol(symbol0)
        this.addEndEventSymbol(symbol0)
        return symbol0
    }

    /**
     * @param {HTMLDivElement} symbol 
     */
    addStartEventSymbol(symbol) {
        symbol.addEventListener("animationstart", () => {
            this.#disableButton(this.buttonReiniciar)
        })
    }
    /**
     * @param {HTMLDivElement} symbol 
     */
    addEndEventSymbol(symbol) {
        symbol.addEventListener("animationend", () => {
            this.#enableButton(this.buttonReiniciar)
        })
    }

    #backgroundOn() {
        const background = document.querySelector('.background')
        background.id = 'backgroundOn'
        background.style.zIndex = '1'
        background.removeEventListener("animationend", this.#alterarZIndex)
    }
    #backgroundOff() {
        const background = document.querySelector('.background')
        background.id = 'backgroundOff'
        background.addEventListener("animationend", this.#alterarZIndex)
    }
    #alterarZIndex() {
        const background = document.querySelector('.background')
        background.style.zIndex = '0'
    }
}
