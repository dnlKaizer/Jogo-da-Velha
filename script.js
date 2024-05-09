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
            return this.matriz[i][0]
        } else {
            return -1
        }
    }

    verificarVencedorColuna(j) {
        if (this.matriz[0][j] != -1 && this.matriz[0][j] == this.matriz[1][j] && this.matriz[0][j] == this.matriz[2][j]) {
            return this.matriz[0][j]
        } else {
            return -1
        }
    }

    verificarVencedorDiagonais() {
        if (this.matriz[1][1] == -1) {
            return -1
        }
        if (this.matriz[0][0] == this.matriz[1][1] && this.matriz[1][1] == this.matriz[2][2]) {
            return this.matriz[1][1]
        }
        if (this.matriz[0][2] == this.matriz[1][1] && this.matriz[1][1] == this.matriz[2][0]) {
            return this.matriz[1][1]
        }
        return -1
    }

    verificarVencedor() {
        let teste = this.verificarVencedorDiagonais()
        if (teste != -1) {
            return teste
        }
        for (const pos in this.matriz) {
            teste = this.verificarVencedorColuna(pos)
            if (teste != -1) {
                return teste
            }
            teste = this.verificarVencedorLinha(pos)
            if (teste != -1) {
                return teste
            }
        }
        return -1
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

console.log(jogo.verificarVencedor())
jogo.jogar(0,0)
console.log(jogo.verificarVencedor())
jogo.jogar(1,0)
console.log(jogo.verificarVencedor())
jogo.jogar(0,1)
console.log(jogo.verificarVencedor())
jogo.jogar(1,1)
console.log(jogo.verificarVencedor())
jogo.jogar(0,2)
console.log(jogo.verificarVencedor())