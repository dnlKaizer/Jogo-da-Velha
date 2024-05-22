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
        }
    }

    restart() {
        const cells = document.getElementsByClassName('cell')
        for (let i = 0; i < 9; i++) {
            const cell = cells[i]
            let div = cell.querySelector('div')
            if (div != null) {
                cell.removeChild(div)
            }
        }
    }
}