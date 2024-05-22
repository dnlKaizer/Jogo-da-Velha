export class Matriz {
    constructor() {
        this.indices = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]]
    }

    getMatIndices() {
        const matAux = this.indices.slice()
        return matAux
    }

    getRow(i) {
        const row = this.indices[i].slice()
        return row
    }

    getColumn(j) {
        const column = []
        this.indices.forEach(row => {
            column.push(row[j])
        });
        return column
    }

    getIndice(i,j) {
        return this.indices[i][j]
    }

    /**
     * @param {number} index [0, 8]
     * @returns {number} indice
     */
    getIndiceByIndex(index) {
        let j = index % 3 
        let i = (index - j) / 3
        return this.indices[i][j]
    }
}