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

    /** 
     * @param {number} index 
     * @returns {HTMLButtonElement} 
    */
    getCell(index) {
        return this.cells[index]
    }
    
    atualizar() {
        const mat = this.jogo.getMatriz
        for (let i = 0; i < 9; i++) {
            const cell = this.getCell(i)
            if (mat.getIndiceByIndex(i) != -1 && cell.querySelector('div') == null) {
                this.disableButton(cell)
                this.appearSymbol(cell)
            }
        }
        if (this.jogo.getFim) {
            this.adicionarLinhaVitoria()
            this.disableAllCellButtons()
        }
    }
    
    reiniciar() {
        const div = box.querySelector('.vencedor')
        if (div != null) {
            this.box.removeChild(div)
        }
        for (let i = 0; i < 9; i++) {
            const cell = this.getCell(i)
            let div = cell.querySelector('div')
            if (div != null) {
                this.disappearSymbol(cell)
            }
        }
        setTimeout(() => {
            this.enableAllCellButtons()
        }, 500)
    }

    enableSelectedCellButtons() {
        for (let index = 0; index < 9; index++) {
            if (!this.jogo.getFim) {
                if (this.jogo.getMatriz.getIndiceByIndex(index) == -1) {
                    this.enableButton(this.cells[index])
                }
            }
        }
    }

    enableAllCellButtons() {
        for (let index = 0; index < 9; index++) {
            this.enableButton(this.cells[index])
        }
    }

    disableAllCellButtons() {
        for (let index = 0; index < 9; index++) {
            this.disableButton(this.cells[index])
        }
    }

    /** 
     * @param {HTMLButtonElement} button
    */
    disableButton(button) {
        button.disabled = true
        button.style.cursor = 'default'
    }

    /** 
     * @param {HTMLButtonElement} button
    */
    enableButton(button) {
        button.disabled = false
        button.style.cursor = 'pointer'
    }

    disableButtonReiniciar() {
        this.disableButton(this.buttonReiniciar)
    }

    enableButtonReiniciar() {
        this.enableButton(this.buttonReiniciar)
    }
    
    adicionarLinhaVitoria() {
        const vencedor = this.jogo.getVencedor
        const div = document.createElement('div')
        div.classList = 'vencedor'
        div.id = `vencedor${vencedor.getType}${vencedor.getIndex}`
        this.box.appendChild(div)
        setTimeout(() => {
            div.style.opacity = '1'
        }, 550)
    }

    /** 
     * @param {HTMLButtonElement} cell
    */
    appearSymbol(cell) {
        let nJogadas = this.jogo.getNJogadas
        let symbol = document.createElement('div')
        symbol.classList = `symbol${nJogadas % 2}`
        if (nJogadas % 2 == 1) {
            let before = document.createElement('div')
            let after = document.createElement('div')
            before.classList = 'symbol11'
            after.classList = 'symbol12'
            symbol.appendChild(before)
            symbol.appendChild(after)
        }
        cell.appendChild(symbol)
    }

    /** 
     * @param {HTMLButtonElement} cell
    */
    disappearSymbol(cell) {
        let div = cell.querySelector('div')
        let before = div.querySelector('.symbol11')
        if (before != null) {
            let after = div.querySelector('.symbol12')
            before.style.animation = 'disappear-x1 0.5s'
            after.style.animation = 'disappear-x2 0.25s'
            setTimeout(() => {
                div.removeChild(after)
            }, 240)
            setTimeout(() => {
                cell.removeChild(div)
            }, 480)
        } else {
            div.style.animation = 'disappear-o 0.5s'
            setTimeout(() => {
                cell.removeChild(div)
            }, 480)
        }
    }

    atualizarSeletor() {
        if (this.seletor.getStatus) {
            this.seletor.disappear()
            this.enableSelectedCellButtons()
            this.enableButton(this.buttonReiniciar)
            this.background.id = 'backgroundOff'
            setTimeout(() => {
                this.background.style.zIndex = '0'
            }, 900)
        } else {
            this.seletor.appear()
            this.disableAllCellButtons()
            this.disableButton(this.buttonReiniciar)
            this.background.style.zIndex = '1'
            this.background.id = 'backgroundOn'
        }
    }

    /** 
     * @param {number} index
    */
    escolherModo(index) {
        this.atualizarSeletor()
        this.seletor.escolherModo(index)
    }
}