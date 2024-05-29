export class Vencedor {
    /** 
     * @param {number} symbol
     * @param {number} type
     * @param {number} index
    */
    constructor(symbol, type, index) {
        this.symbol = symbol 
        this.type = type
        /* 
        0: Linha
        1: Coluna
        2: Diagonal
        */
        this.index = index
        /* 
        Se type == 0 ou type == 1
        index é o índice da linha/coluna
        Se type == 2
        0: Diagonal Principal
        1: Diagonal Secundária
        */
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