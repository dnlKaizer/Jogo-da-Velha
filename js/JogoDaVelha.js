import { Matriz } from "./Matriz.js";

export class JogoDaVelha {
    constructor() {
        this.matriz = new Matriz()
    }

    getMatriz() {
        return this.matriz
    }
}