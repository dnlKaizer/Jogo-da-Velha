export class Ameaca {
    /** 
     * @param {number} indiceI
     * @param {number} indiceJ
     * @param {number} symbol
    */
    constructor(indiceI, indiceJ, symbol) {
        this.indiceI = indiceI
        this.indiceJ = indiceJ
        this.index = (3 * indiceI) + indiceJ
        this.symbol = symbol
    }

    get getIndiceI() {
        return this.indiceI
    }

    get getIndiceJ() {
        return this.indiceJ
    }

    get getIndex() {
        return this.index
    }

    get getSymbol() {
        return this.symbol
    }
}