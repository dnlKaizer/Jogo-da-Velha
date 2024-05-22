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
                    let symbol = document.createElement('div')
                    let nJogadas = this.jogo.getNJogadas
                    symbol.classList = `symbol${nJogadas % 2}`
                    cell.appendChild(symbol)
                }
            }
        }
    }
}