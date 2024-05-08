class JogoDaVelha {
    matriz = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]];

    getMatriz() {
        const matrizAux = this.matriz.map((x) => x) // Copia o atributo matriz
        return matrizAux
    }
}

const jogoDaVelha = new JogoDaVelha()