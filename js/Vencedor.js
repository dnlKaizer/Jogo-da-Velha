export class Vencedor {
    constructor(symbol, type, index) {
        this.symbol = symbol
        this.type = type
        this.index = index
    }

    get getSymbol() {
        return this.symbol
    }

    get getType() {
        return this.type
    }

    get getIndex() {
        return this.index
    }
}