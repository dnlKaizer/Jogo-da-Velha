class JogoDaVelha {
    matriz = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]]
    nJogadas = 0

    getMatriz() {
        const matrizAux = this.matriz.map((x) => x) // Copia o atributo this.matriz
        return this.matrizAux
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

    verificarVencedorLinha(i) {
        if (this.matriz[i][0] != -1 && this.matriz[i][0] == this.matriz[i][1] && this.matriz[i][0] == this.matriz[i][2]) {
            return true
        } else {
            return false
        }
    }

    verificarVencedorColuna(j) {
        if (this.matriz[0][j] != -1 && this.matriz[0][j] == this.matriz[1][j] && this.matriz[0][j] == this.matriz[2][j]) {
            return true
        } else {
            return false
        }
    }

    verificarVencedorDiagonais() {
        let anterior = 0
        if (this.matriz[1][1] == -1) {
            return false
        }
        if (this.matriz[0][0] == this.matriz[1][1] && this.matriz[1][1] == this.matriz[2][2]) {
            return true
        }
        if (this.matriz[0][2] == this.matriz[1][1] && this.matriz[1][1] == this.matriz[2][0]) {
            return true
        }
        return false
    }

    verificarVencedor() {
        if (this.verificarVencedorDiagonais()) {
            return true
        }
        for (const pos in this.matriz) {
            if (this.verificarVencedorColuna(pos) || this.verificarVencedorLinha(pos)) {
                return true
            }
        }
        return false
    }
}

class Cpu {
    jogo
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

let jogo = new JogoDaVelha()
let cpu = new Cpu()