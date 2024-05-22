import { Matriz } from "./Matriz.js";

export class JogoDaVelha {
    constructor() {
        this.matriz = new Matriz()
        this.nJogadas = 0
        this.fim = false
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

    jogar(i, j) {
        if (this.fim) {
            return
        }
        this.nJogadas++
        this.matriz.alterar((this.nJogadas % 2), i, j)
    }

    jogarIndex(index) {
        if (this.fim) {
            return
        }
        this.nJogadas++
        this.matriz.alterarByIndex((this.nJogadas % 2), index)
    }
}