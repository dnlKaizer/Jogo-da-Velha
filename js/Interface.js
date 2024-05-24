import { Seletor } from "./Seletor.js"

export class Interface {
    constructor(jogo) {
        this.jogo = jogo
        this.cells = document.getElementsByClassName('cell')
        this.box = document.querySelector('#box')
        this.seletor = new Seletor()
        this.modo = document.querySelector('#modo')
    }

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
            this.disableAllButtons()
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
            this.enableButtons()
        }, 500)
    }

    enableButtons() {
        for (let index = 0; index < 9; index++) {
            this.cells[index].onclick = () => {window.clicar(index)}
            if (this.jogo.getMatriz.getIndiceByIndex(index) == -1) {
                this.cells[index].style.cursor = 'pointer'
            }
        }
    }

    disableAllButtons() {
        for (let index = 0; index < 9; index++) {
            this.cells[index].onclick = ''
            this.cells[index].style.cursor = 'default'
        }
    }

    disableButton(button) {
        button.onclick = ''
        button.style.cursor = 'default'
    }
    
    adicionarLinhaVitoria() {
        const vencedor = this.jogo.getVencedor
        const div = document.createElement('div')
        div.classList = 'vencedor'
        let multiplicador = 2 / 3
        if (innerWidth > 480) {
            multiplicador = 1
        }
        div.style.height = `${13 * multiplicador}px`
        if (vencedor.getType == 2) {
            div.style.width = `${624 * multiplicador}px`
            if (vencedor.getIndex == 0) {
                div.style.rotate = '45deg'
            } else {
                div.style.rotate = '-45deg'
            }

        } else {
            div.style.width = `${450 * multiplicador}px`
            let values = [-150 * multiplicador, 0, 150 * multiplicador]
            if (vencedor.getType == 0) {
                div.style.transform = `translate(0px, ${values[vencedor.getIndex]}px)`
            } else {
                div.style.transform = `translate(0px, ${(-1) * values[vencedor.getIndex]}px)`
                div.style.rotate = '90deg'
            }
        }
        setTimeout(() => {
            this.box.appendChild(div)
        }, 500)
    }

    appearSymbol(cell) {
        // let div = cell.querySelector('div')
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
        // if (div == null) {
        // }
    }

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
        } else {
            this.seletor.appear()
        }
    }

    escolherModo(index) {
        this.seletor.escolherModo(index)
    }
}