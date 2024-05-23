export class Interface {
    constructor(jogo) {
        this.jogo = jogo
    }

    atualizar() {
        const mat = this.jogo.getMatriz
        const cells = document.getElementsByClassName('cell')
        let cursorType = 'pointer'
        if (this.jogo.getFim) {
            cursorType = 'auto'
        }
        for (let i = 0; i < 9; i++) {
            const cell = cells[i]
            cell.style.cursor = cursorType
            if (mat.getIndiceByIndex(i) != -1) {
                cell.style.cursor = 'auto'
                this.adicionarSimbolo(cell)
            }
        }
        if (this.jogo.getFim) {
            this.adicionarLinhaVitoria()
        }
    }

    adicionarLinhaVitoria() {
        const box = document.querySelector('#box')
        const vencedor = this.jogo.getVencedor
        const div = document.createElement('div')
        div.classList = 'vencedor'
        let multiplicador = 2 / 3
        if (innerWidth > 480) {
            multiplicador = 1
        }
        div.style.height = `${12.5 * multiplicador}px`
        div.style.animation = 'appear-x1 1.5s'
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
            box.appendChild(div)
        }, 500)
    }

    adicionarSimbolo(cell) {
        let div = cell.querySelector('div')
        if (div == null) {
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
    }

    reiniciar() {
        const cells = document.getElementsByClassName('cell')
        const box = document.querySelector('#box')
        const div = box.querySelector('div.vencedor')
        if (div != null) {
            box.removeChild(div)
        }
        for (let i = 0; i < 9; i++) {
            const cell = cells[i]
            cell.style.cursor = 'pointer'
            let div = cell.querySelector('div')
            if (div != null) {
                this.disappearSymbol(cell)
            }
        }
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
}