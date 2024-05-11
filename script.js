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

class Ameaca {
    indexI
    indexJ
    simbolo
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

    verificarAmeacas() {
        let ameaca
        let ameacas = []
        for (let m = 0; m < 3; m++) {
            ameaca = this.verificarAmeacaLinha(m)
            if (ameaca != false) {
                ameacas.push(ameaca)
            }
            ameaca = this.verificarAmeacaColuna(m)
            if (ameaca != false) {
                ameacas.push(ameaca)
            }
        }
        ameaca = this.verificarAmeacaDiagonais()
        if (ameaca != false) {
            ameacas.push(ameaca)
        }
        for (let i = 0; i < ameacas.length - 1; i++) {
            for (let j = 0; j < ameacas.length; j++) {
                if (ameacas[i] == ameacas[j]) {
                    ameacas.splice(j, 1)
                }
            }
        }
        return ameacas
    }

    verificarAmeacaLinha(i) {
        const mat = jogo.getMatriz()
        inicio:
        for (let m = 0; m < 3; m++) {
            for (let n = m + 1; n < 3; n++) {
                if (mat[i][m] == -1) {
                    continue inicio
                }
                if (mat[i][m] == mat[i][n]) {
                    for (let index = 0; index < 3; index++) {
                        if (mat[i][index] == -1) {
                            const ameaca = new Ameaca
                            ameaca.indexI = i
                            ameaca.indexJ = index
                            ameaca.simbolo = mat[i][m]
                            return ameaca
                        }
                    }
                }
            }
        }
        return false
    }

    verificarAmeacaColuna(j) {
        const mat = jogo.getMatriz()
        inicio:
        for (let m = 0; m < 3; m++) {
            for (let n = m + 1; n < 3; n++) {
                if (mat[m][j] == -1) {
                    continue inicio
                }
                if (mat[m][j] == mat[n][j]) {
                    for (let index = 0; index < 3; index++) {
                        if (mat[index][j] == -1) {
                            const ameaca = new Ameaca
                            ameaca.indexI = index
                            ameaca.indexJ = j
                            ameaca.simbolo = mat[m][j]
                            return ameaca
                        }
                    }
                }
            }
        }
        return false
    }

    verificarAmeacaDiagonais() {
        const mat = jogo.getMatriz()
        inicio:
        for (let m = 0; m < 3; m++) {
            for (let n = m + 1; n < 3; n++) {
                if (mat[m][m] == -1) {
                    continue inicio
                }
                if (mat[m][m] == mat[n][n]) {
                    for (let index = 0; index < 3; index++) {
                        if (mat[index][index] == -1) {
                            const ameaca = new Ameaca
                            ameaca.indexI = index
                            ameaca.indexJ = index
                            ameaca.simbolo = mat[m][m]
                            return ameaca
                        }
                    }
                }
                if (mat[m][2 - m] == mat[n][2 - n]) {
                    for (let index = 0; index < 3; index++) {
                        if (mat[index][2 - index] == -1) {
                            const ameaca = new Ameaca
                            ameaca.indexI = index
                            ameaca.indexJ = 2 - index
                            ameaca.simbolo = mat[m][m]
                            return ameaca
                        }
                    }
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

console.log(cpu.verificarAmeacas())
jogo.jogar(0,0)
jogo.jogar(0,1)
jogo.jogar(0,2)
jogo.jogar(1,0)
jogo.jogar(2,0)
jogo.jogar(1,2)
jogo.jogar(2,2)
jogo.jogar(2,1)
console.log(cpu.verificarAmeacas())
console.log(jogo.getMatriz())