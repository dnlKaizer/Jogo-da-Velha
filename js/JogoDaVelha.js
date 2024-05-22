import { Matriz } from "./Matriz.js";
import { Vencedor } from "./Vencedor.js";

export class JogoDaVelha {
    constructor() {
        this.matriz = new Matriz()
        this.nJogadas = 0
        this.fim = false
        this.vencedor
    }

    get getMatriz() {
        return this.matriz
    }

    get getNJogadas() {
        return this.nJogadas
    }

    get getFim() {
        return this.fim
    }

    jogarIndex(index) {
        if (this.fim) {
            return
        }
        this.nJogadas++
        this.matriz.alterarByIndex((this.nJogadas % 2), index)
        this.verificarVencedor()
    }

    verificarVencedor() {
        for (let m = 0; m < 3; m++) {
            if (this.valoresVetorIguais(this.matriz.getRow(m))) {
                this.vencedor = new Vencedor(this.matriz.getRow(m)[0], 0, m)
                this.fim = true
            }
            if (this.valoresVetorIguais(this.matriz.getColumn(m))) {
                this.vencedor = new Vencedor(this.matriz.getColumn(m)[0], 1, m)
                this.fim = true
            }
        }
        if (this.valoresVetorIguais(this.matriz.getDiagonalPrincipal())) {
            this.vencedor = new Vencedor(this.matriz.getIndice(1,1), 2, 0)
            this.fim = true
        }
        if (this.valoresVetorIguais(this.matriz.getDiagonalSecundaria())) {
            this.vencedor = new Vencedor(this.matriz.getIndice(1,1), 2, 1)
            this.fim = true
        }
    }

    valoresVetorIguais(array) {
        for (let m = 0; m < 3; m++) {
            for (let n = m + 1; n < 3; n++) {
                if (array[m] == -1 || array[m] != array[n]) {
                    return false
                }
            }
        }
        return true
    }
}