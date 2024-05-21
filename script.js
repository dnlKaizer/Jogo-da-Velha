class JogoDaVelha {
    matriz = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]]
    nJogadas = 0
    fim = true
    vencedor = -1
    jogadas = []

    getMatriz() {
        const matrizAux = this.matriz.slice() // Copia o atributo this.matriz
        return matrizAux
    }

    jogar(vetor) {
        // -1 indica vazio
        // 0 indica que é O
        // 1 indica que é X
        const i = vetor[0]
        const j = vetor[1]
        if (this.matriz[i][j] == -1 && this.fim) {
            this.nJogadas++;
            this.matriz[i][j] = this.nJogadas % 2
            let jogada = new Jogada
            jogada.inserirIndice([i,j])
            jogada.inserirSimbolo(this.nJogadas % 2)
            this.jogadas.push(jogada)
            if (this.verificarVencedor() || this.nJogadas == 9) {
                this.fim = false
            }
        }
    }

    verificarVencedorLinha(i) {
        if (this.matriz[i][0] != -1 && this.matriz[i][0] == this.matriz[i][1] && this.matriz[i][0] == this.matriz[i][2]) {
            this.vencedor = new Vencedor()
            this.vencedor.simbolo = this.matriz[i][0]
            this.vencedor.tipo = 1
            this.vencedor.index = i
            return true
        } else {
            return false
        }
    }

    verificarVencedorColuna(j) {
        if (this.matriz[0][j] != -1 && this.matriz[0][j] == this.matriz[1][j] && this.matriz[0][j] == this.matriz[2][j]) {
            this.vencedor = new Vencedor()
            this.vencedor.simbolo = this.matriz[0][j]
            this.vencedor.tipo = 2
            this.vencedor.index = j
            return true
        } else {
            return false
        }
    }

    verificarVencedorDiagonais() {
        if (this.matriz[1][1] == -1) {
            return false
        }
        if (this.matriz[0][0] == this.matriz[1][1] && this.matriz[1][1] == this.matriz[2][2]) {
            this.vencedor = new Vencedor()
            this.vencedor.simbolo = this.matriz[0][0]
            this.vencedor.tipo = 0
            this.vencedor.index = 0
            return true
        }
        if (this.matriz[0][2] == this.matriz[1][1] && this.matriz[1][1] == this.matriz[2][0]) {
            this.vencedor = new Vencedor()
            this.vencedor.simbolo = this.matriz[0][2]
            this.vencedor.tipo = 0
            this.vencedor.index = 1
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

class Vencedor {
    simbolo
    tipo
    /* 
    TIPO:
    0: Diagonal
    1: Linha
    2: Coluna
     */
    index
    /* INDEX:
    Para tipos 1 ou 2, é o index da linha ou coluna
    Para tipo 0, é 0 para diagonal principal e 1 para secundária
     */
}

class Ameaca {
    indexI
    indexJ
    simbolo
}

class Jogada {
    indice
    simbolo

    inserirIndice(vet) {
        this.indice = vet
    }

    inserirSimbolo(simbolo) {
        this.simbolo = simbolo
    }

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
    estaJogando = false
    // 0 indica fácil
    // 1 indica médio
    // 2 indica difícil
    // 3 indica impossível
    
    adicionarDificuldade(dificuldade) {
        this.dificuldade = dificuldade
    }

    melhorJogada() {
        const nJogadas = jogo.nJogadas

        switch (nJogadas) {
            case 0:
                this.jogada1()
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

    jogada1() {
        clicar(this.random(0,8))
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

    fazerJogadaPattern(pattern) {
        let jogadasPossiveis = this.lerJogadasPossiveis(pattern)

        m = this.random(0, jogadasPossiveis.length - 1)
        i = jogadasPossiveis[m][0]
        j = jogadasPossiveis[m][1]
        
        jogo.jogar([i,j])
    }

    fazerJogadaAmeacas() {
        const ameacas = this.verificarAmeacas()
        if (ameacas.length > 0) {
            if (ameacas.length != 1) {
                for (const ameaca of ameacas) {
                    if (ameaca.simbolo == jogo.nJogadas % 2 + 1) {
                        let i = ameaca.indexI
                        let j = ameaca.indexJ
                        jogo.jogar([i,j])
                        return true
                    }
                }
            }
            const ameaca = ameacas[0]
            let i = ameaca.indexI
            let j = ameaca.indexJ
            jogo.jogar([i,j])
            return true
        }
        return false
    }

    lerJogadasPossiveis(pattern) {
        /* 
        Patterns (Ambos incluem centro):
        0 - Cantos
        1 - Meios
        2 - Qualquer
        */
       const mat = jogo.getMatriz()
       let jogadasPossiveis = []
       let i
       let j
       let m

        if (pattern == 2) {
            for (i = 0; i < 3; i++) {
                for (j = 0; j < 3; j++) {
                    if (mat[i][j] == -1) {
                        jogadasPossiveis.push([i,j])
                    }
                }
            }
        } else {
            if (mat[1][1] == -1) {
                jogadasPossiveis.push([1,1])
            }
            if (pattern == 0) {
                for (i = 0; i < 3; i += 2) {
                    for (j = 0; j < 3; j += 2) {
                        if (mat[i][j] == -1) {
                            jogadasPossiveis.push([i,j])
                        }
                    }
                }
            } else {
                for (m = 0; m < 3; m += 2) {
                    if (mat[m][1] == -1) {
                        jogadasPossiveis.push([m,1])
                    }
                    if (mat[1][m] == -1) {
                        jogadasPossiveis.push([1,m])
                    }
                }
            }
        }
        return jogadasPossiveis
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

function clicar(index) {
    let j = index % 3
    let i = Math.floor(index / 3)
    if (jogo.vencedor == -1) {
        jogo.jogar([i,j])
        atualizarPainel(index)
        if (jogo.vencedor != -1) {
            encerrar()
            return
        }
        if (cpu.estaJogando) {
            cpu.melhorJogada()
        }
    }
}

function atualizarPainel(index) {
    const cells = document.getElementsByClassName('cell')
    const element = document.createElement('div')
    element.id = `id${index}`
    element.classList = 'symbol' + (jogo.nJogadas % 2)
    cells[index].appendChild(element)
    cells[index].style.cursor = 'auto'
}

function mouseEnter(index) {
    let j = index % 3
    let i = Math.floor(index / 3)
    const mat = jogo.getMatriz()
    if (mat[i][j] == -1 && jogo.fim) {
        const cells = document.getElementsByClassName('cell')
        const element = document.createElement('div')
        const symbol = (jogo.nJogadas + 1) % 2
        element.classList = 'symbol' + symbol
        element.style.opacity = '0.2'
        cells[index].appendChild(element)
    }
}

function mouseLeave(index) {
    let j = index % 3
    let i = Math.floor(index / 3)
    const mat = jogo.getMatriz()
    if (mat[i][j] == -1 && jogo.fim) {
        const cells = document.getElementsByClassName('cell')
        cells[index].innerHTML = ''
    }
}

function encerrar() {
    const cells = document.getElementsByClassName('cell')
    for (let i = 0; i < 9; i++) {
        cells[i].style.cursor = 'auto'
    }
    linhaVitoria()
}

function linhaVitoria() {
    const vencedor = jogo.vencedor
    let multiplicador
    if (innerWidth > 480) {
        multiplicador = 1
    } else {
        multiplicador = 2 / 3
    }
    const tagVencedor = document.createElement('div')
    const box = document.querySelector('#box')
    tagVencedor.style.height = `${12 * multiplicador}px`
    tagVencedor.classList = 'vencedor'
    if (vencedor.tipo == 0) {
        tagVencedor.style.width = `${624 * multiplicador}px`
        if (vencedor.index == 0) {
            tagVencedor.style.rotate = '45deg'
        } else {
            tagVencedor.style.rotate = '135deg'
        }
    } else {
        const distancia = [-151, 0, 151]
        tagVencedor.style.width = `${450 * multiplicador}px`
        if (vencedor.tipo == 1) {
            let vertical = distancia[vencedor.index] * multiplicador
            tagVencedor.style.transform = `translateY(${vertical}px)`
        } else {
            let horizontal = distancia[vencedor.index] * multiplicador
            tagVencedor.style.rotate = '90deg'
            tagVencedor.style.transform = `translateY(${horizontal * (-1)}px)`
        }
    }
    box.appendChild(tagVencedor)
}

function restart() {
    const cells = document.getElementsByClassName('cell')
    const box = document.querySelector('#box')
    if (jogo.vencedor != -1) {
        const vencedor = document.querySelector('.vencedor')
        box.removeChild(vencedor)
    }
    for (let i = 0; i < 9; i++) {
        cells[i].style.cursor = 'pointer'
        cells[i].innerHTML = ''
    }
    jogo = new JogoDaVelha()
}

function jogarContraCpu() {
    if (cpu.estaJogando) {
        cpu.melhorJogada()
    } else {
        cpu.estaJogando = true
    }
}

let jogo = new JogoDaVelha()
let cpu = new Cpu()