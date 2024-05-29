export class Jogada {

    /** 
     * @param {number} index
     * @param {number} symbol
    */
    constructor(symbol, index) {
        this.symbol = symbol 
        this.index = index
        this.j = index % 3
        this.i = (index - (index % 3)) / 3
    }

    get getIndex() {
        return this.index
    }

    get getSymbol() {
        return this.symbol
    }

    isCentro() {
        if (this.index == 4) {
            return true
        } else {
            return false
        }
    }

    isCanto() {
        if (!this.isCentro()) {
            if (this.index % 2 == 0) {
                return true
            }
        }
        return false
    }

    isMeio() {
        if (this.index % 2 == 1) {
            return true
        } else {
            return false
        }
    }
}