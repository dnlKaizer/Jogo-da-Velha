class JogoDaVelha {
    matriz = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]]
    nJogadas = 0

    getMatriz() {
        const matrizAux = this.matriz.map((x) => x) // Copia o atributo this.matriz
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
    dificuldade
    // 0 indica fácil
    // 1 indica médio
    // 2 indica difícil
    // 3 indica impossível
    
    adicionarDificuldade(dificuldade) {
        this.dificuldade = dificuldade
    }

    melhorJogada() {
        const dif = this.dificuldade
        const mat = jogo.getMatriz()
        const nJogadas = jogo.nJogadas

        let i
        let j

        switch (nJogadas) {
            case 0:
                i = this.random(0,2)
                j = this.random(0,2)
                jogo.jogar(i,j)
                break;
            case 1:
                
                break;
            case 2:
                
                break;
            case 3:
                
                break;
            case 4:
                
                break;
            case 5:
                
                break;
            case 6:
                
                break;
            case 7:
                
                break;
            case 8:
                
                break;
            case 9:
                
                break;
        
            default:
                break;
        }
    } 


    verificarAmeacaLinha(i) {
        let ameaca = {
            indexI: -1,
            indexJ: -1
        }
        const mat = jogo.getMatriz()
        inicio:
        for (let m = 0; m < 3; m++) {
            for (let n = m + 1; n < 3; n++) {
                if (mat[i][m] == -1) {
                    continue inicio
                }
                if (mat[i][m] == mat[i][n]) {
                    ameaca.indexI = i
                    if (m == 1) {
                        ameaca.indexJ = 0
                    } else if (n == 1) {
                        ameaca.indexJ = 2
                    } else {
                        ameaca.indexJ = 1
                    }
                    return ameaca
                }
            }
        }
        return false
    }
    verificarAmeacaColuna(j) {
        let ameaca = {
            indexI: -1,
            indexJ: -1
        }
        const mat = jogo.getMatriz()
        inicio:
        for (let m = 0; m < 3; m++) {
            for (let n = m + 1; n < 3; n++) {
                if (mat[m][j] == -1) {
                    continue inicio
                }
                if (mat[m][j] == mat[n][j]) {
                    ameaca.indexJ = j
                    if (m == 1) {
                        ameaca.indexI = 0
                    } else if (n == 1) {
                        ameaca.indexI = 2
                    } else {
                        ameaca.indexI = 1
                    }
                    return ameaca
                }
            }
        }
        return false
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
cpu.adicionarJogo(jogo)
cpu.adicionarDificuldade(0)