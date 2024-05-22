export class Interface {
    constructor(jogo) {
        this.jogo = jogo
    }

    atualizar() {
        const mat = this.jogo.getMatriz
        const cells = document.getElementsByClassName('cell')
        for (let i = 0; i < 9; i++) {
            const cell = cells[i]
            if (mat.getIndiceByIndex(i) != -1) {
                cell.style.cursor = 'auto'
                this.adicionarSimbolo(cell)
            }
        }
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
            }, 490)
        } else {
            div.style.animation = 'disappear-o 0.4s'
            setTimeout(() => {
                cell.removeChild(div)
            }, 390)
        }
    }
}