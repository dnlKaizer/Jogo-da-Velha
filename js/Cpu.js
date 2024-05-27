export class Cpu {
    constructor(jogo, dificuldade) {
        this.jogo = jogo
        this.matriz = jogo.getMatriz
        this.dificuldade = dificuldade
    }

    lerJogadasPossiveis() {
        let jogadasPossiveis = []
        for (let i = 0; i < 9; i++) {
            if (this.matriz.getIndiceByIndex(i) == -1) {
                jogadasPossiveis.push(i)
            }
        }
        return jogadasPossiveis
    }

    random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }
}