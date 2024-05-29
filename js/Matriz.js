export class Matriz {
    constructor() {
        this.indices = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]]
    }

    get getMatIndices() {
        const matAux = this.indices.slice()
        return matAux
    }

    /** 
     * @param {number} i
     * @returns {number[]}
    */
    getRow(i) {
        const row = this.indices[i].slice()
        return row
    }

    /** 
     * @param {number} j
     * @returns {number[]}
    */
    getColumn(j) {
        const column = []
        this.indices.forEach(row => {
            column.push(row[j])
        });
        return column
    }

    /** 
     * @returns {number[]}
    */
    getDiagonalPrincipal() {
        let diagonalPrincipal = []
        this.indices.forEach((linha,i) => {
            diagonalPrincipal.push(linha[i])
        });
        return diagonalPrincipal
    }

    /** 
     * @returns {number[]}
    */
    getDiagonalSecundaria() {
        let diagonalSecundaria = []
        this.indices.forEach((linha,i) => {
            diagonalSecundaria.push(linha[2 - i])
        });
        return diagonalSecundaria
    }

    /** 
     * @param {number} i
     * @param {number} j
     * @returns {number}
    */
    getIndice(i,j) {
        return this.indices[i][j]
    }

    /**
     * @param {number} index 
     * @returns {number}
     */
    getIndiceByIndex(index) {
        let j = index % 3 
        let i = (index - j) / 3
        return this.indices[i][j]
    }

    /** 
     * @param {number} valor
     * @param {number} i
     * @param {number} j
    */
    alterar(valor, i, j) {
        this.indices[i][j] = valor
    }

    /** 
     * @param {number} valor
     * @param {number} index
    */
    alterarByIndex(valor, index) {
        let j = index % 3 
        let i = (index - j) / 3
        this.indices[i][j] = valor
    }
}