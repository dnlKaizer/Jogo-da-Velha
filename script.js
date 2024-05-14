class JogoDaVelha {
    matriz = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]]
    nJogadas = 0

    getMatriz() {
        const matrizAux = this.matriz.slice() // Copia o atributo this.matriz
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

class Jogada {
    indice

    isCanto() {
        const cantos = [[0,0], [0,2], [2,0], [2,2]]
        for (const valor of cantos) {
            if (compararArrays(valor, this.indice)) {
                return true
            }
        }
        return false
    }

    isCentro() {
        return compararArrays(this.indice, [1,1])
    }

    isMeio() {
        if (this.isCanto() || this.isCentro()) {
            return false
        }
        return true
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
        const mat = jogo.getMatriz()
        const nJogadas = jogo.nJogadas

        switch (nJogadas) {
            case 0:
                this.jogada1()
                break;
            case 1:
                this.jogada2()
                break;
            case 2:
                this.jogada3()
                break;
            case 3: 
                this.jogada4() 
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
            for (let j = i + 1; j < ameacas.length; j++) {
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
                if (mat[m][2 - m] == -1) {
                    continue inicio
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

    jogada1() {
        let i = this.random(0,2)
        let j = this.random(0,2)
        jogo.jogar(i,j)
    }

    jogada2() {

        const mat = jogo.getMatriz()
        let pattern = 2

        inicio:
        if (mat[1][1] != -1) {
            pattern = 0
        } else {
            for (let i = 0; i < 3; i += 2) {
                for (let j = 0; j < 3; j += 2) {
                    if (mat[i][j] != -1) {
                        pattern = 0
                        break inicio
                    }
                }
            }
        }
        
        this.fazerJogadaPattern(pattern)
    }

    jogada3() {
        const mat = jogo.getMatriz()
        let i
        let j
        let x = new Jogada
        let o = new Jogada
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                if (mat[i][j] != -1) {
                    if (mat[i][j] == 1) {
                        x.indice = [i,j]
                    } else {
                        o.indice = [i,j]
                    }
                } 
            }
        }

        if (x.isCentro()) {
            if (o.isCanto()) {
                i = 2 - o.indice[0]
                j = 2 - o.indice[1]
            } else {
                this.fazerJogadaPattern(0)
                return
            }
        } else if (x.isCanto()) {
            if (mat[1][1] == -1) {
                i = 1
                j = 1
            } else {
                i = 2 - x.indice[0]
                j = 2 - x.indice[1]
            }
        } else {
            if (mat[1][1] == -1) {
                i = 1
                j = 1
            } else {
                i = x.indice[1]
                j = x.indice[0]
            }
        }
        jogo.jogar(i,j)
    }


    fazerJogadaPattern(pattern) {
        /* 
        Patterns (Ambos incluem centro):
        0 - Cantos
        1 - Meios
        2 - Qualquer
        */
       const mat = jogo.getMatriz()
       let jogadas = []
       let i
       let j
       let m

        if (pattern == 2) {
            for (i = 0; i < 3; i++) {
                for (j = 0; j < 3; j++) {
                    if (mat[i][j] == -1) {
                        jogadas.push([i,j])
                    }
                }
            }
        } else {
            if (mat[1][1] == -1) {
                jogadas.push([1,1])
            }
            if (pattern == 0) {
                for (i = 0; i < 3; i += 2) {
                    for (j = 0; j < 3; j += 2) {
                        if (mat[i][j] == -1) {
                            jogadas.push([i,j])
                        }
                    }
                }
            } else {
                for (m = 0; m < 3; m += 2) {
                    if (mat[m][1] == -1) {
                        jogadas.push([m,1])
                    }
                    if (mat[1][m] == -1) {
                        jogadas.push([1,m])
                    }
                }
            }
        }

        m = this.random(0, jogadas.length - 1)
        i = jogadas[m][0]
        j = jogadas[m][1]
        
        jogo.jogar(i,j)
    }

    fazerJogadaAmeacas() {
        const ameacas = this.verificarAmeacas()
        if (ameacas.length > 0) {
            if (ameacas.length != 1) {
                for (const ameaca of ameacas) {
                    if (ameaca.simbolo == this.nJogadas % 2 + 1) {
                        let i = ameaca.indexI
                        let j = ameaca.indexJ
                        jogo.jogar(i,j)
                        return true
                    }
                }
            }
            const ameaca = ameacas[0]
            let i = ameaca.indexI
            let j = ameaca.indexJ
            jogo.jogar(i,j)
            return true
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

function compararArrays(ar1, ar2) {
    for (let i = 0; i < ar1.length; i++) {
        if (ar1[i] != ar2[i]) {
            return false
        }
    }
    return true
}

let jogo = new JogoDaVelha()
let cpu = new Cpu()
