class JogoDaVelha {
    matriz = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]];
    nJogadas = 0

    getMatriz() {
        const matrizAux = this.matriz.map((x) => x) // Copia o atributo matriz
        return matrizAux
    }

    jogar(i, j) {
        // 0 indica que é O
        // 1 indica que é X
        if (this.matriz[i][j] == -1) {
            this.nJogadas++;
            this.matriz[i][j] = this.nJogadas % 2
        }
    }
}

const jogoDaVelha = new JogoDaVelha()