class JogoDaVelha {
    matriz = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]]
    nJogadas = 0

    getMatriz() {
        const matrizAux = this.matriz.map((x) => x) // Copia o atributo matriz
        return matrizAux
    }

    jogar(i, j) {
        // -1 indica vazio
        // 0 indica que é O
        // 1 indica que é X
        if (this.matriz[i][j] == -1) {
            this.nJogadas++;
            this.matriz[i][j] = this.nJogadas % 2
        }
    }
}

class Cpu {
    jogoDaVelha
    dificuldade
    // 0 indica fácil
    // 1 indica médio
    // 2 indica difícil
    // 3 indica impossível

    adicionarDificuldade(dificuldade) {
        this.dificuldade = dificuldade
    }

    /**
     * Retorna número aleatório [min, max]. AMBOS inclusos.
     * @param {number} min   
     * @param {number} max   
     * @returns {number} número aleatório
     */ 
    random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
}

let jogoDaVelha = new JogoDaVelha()
let cpu = new Cpu()