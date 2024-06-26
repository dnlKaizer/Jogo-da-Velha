import { Ameaca } from "./Ameaca.js"
import { JogoDaVelha } from "./JogoDaVelha.js"

export class Cpu {

    /** 
     * @param {JogoDaVelha} jogo 
     * @param {number} dificuldade 
    */
    constructor(jogo, dificuldade) {
        this.jogo = jogo
        this.matriz = jogo.getMatriz
        this.jogadas = jogo.getJogadas
        this.dificuldade = dificuldade
        /* 
        0: início no centro
        1: início no canto
        2: início no meio
        */
    }

    /**
     * @returns {number}
     */
    get #getPattern() {
        if (this.jogadas[0].isCentro()) {
            return 0
        } else if (this.jogadas[0].isMeio()) {
            return 2
        } else {
            return 1
        }
    }

    jogar() {
        if (this.dificuldade == 0) {
            this.#jogarModoFacil()
        } else if (this.dificuldade == 1) {
            this.#jogarModoMedio()
        } else {
            this.#jogarModoImpossivel()
        }
    }

    #jogarModoFacil() {
        const ameacas = this.#verificarAmeacas()
        const nAmeacas = ameacas.length
        let jogadasPossiveis = this.#lerTodasJogadasPossiveis()
        const nJogadas = this.jogo.getNJogadas

        if (nAmeacas > 0) {
            for (const ameaca of ameacas) {
                if (ameaca.getSymbol == (nJogadas + 1) % 2) {
                    jogadasPossiveis = [ameaca.getIndex]
                    break
                } else {
                    jogadasPossiveis.splice(jogadasPossiveis.indexOf(ameaca.getIndex), 1)
                }
            }
        }
        if (jogadasPossiveis.length == 0) {
            jogadasPossiveis = this.#lerTodasJogadasPossiveis()
        }
        this.#fazerJogadaPossivel(jogadasPossiveis)
    }

    #jogarModoMedio() {
        let jogadasPossiveis
        const ameacas = this.#verificarAmeacas()
        const nAmeacas = ameacas.length
        const nJogadas = this.jogo.getNJogadas

        if (nAmeacas > 0) {
            jogadasPossiveis = []
            for (const ameaca of ameacas) {
                if (ameaca.getSymbol == (nJogadas + 1) % 2) {
                    jogadasPossiveis = [ameaca.getIndex]
                    break
                } else {
                    jogadasPossiveis.push(ameaca.getIndex)
                }
            }
        } else {
            jogadasPossiveis = this.#lerTodasJogadasPossiveis()
        }
        this.#fazerJogadaPossivel(jogadasPossiveis)
    }

    #jogarModoImpossivel() {
        const nJogadas = this.jogo.getNJogadas
        if (this.#fazerJogadaAmeaca(this.#verificarAmeacas())) {
            return
        }
        switch (nJogadas) {
            case 0:
                this.#jogada0()
            break;
        
            case 1:
                this.#jogada1()
            break;
        
            case 2:
                this.#jogada2()
            break;

            case 3:
                this.#jogada3()
            break;
        
            case 4:
                this.#jogada4()
            break;
        
            case 5:
                this.#jogada5()
            break;
        
            case 6:
                this.#jogada6()
            break;
        
            case 7:
                this.#jogada7()
            break;
        
            case 8:
                this.#jogada8()
            break;
        
            default:
            break;
        }
    }

    #jogada0() {
        const sorte = this.#random(1, 10)
        if (sorte >= 9) {
            this.#fazerJogadaPossivel(this.#meiosPossiveis())
        } else if (sorte >= 6) {
            this.#fazerJogadaPossivel([4])
        } else {
            this.#fazerJogadaPossivel(this.#cantosPossiveis())
        }
    }

    #jogada1() {
        const jogada = this.jogadas[0]
        let jogadasPossiveis = []
        const pattern = this.#getPattern
        if (pattern == 0) {
            jogadasPossiveis = this.#cantosPossiveis()
        } else if (pattern == 2) {
            jogadasPossiveis = [4]
        } else {
            jogadasPossiveis = [4]
        }
        this.#fazerJogadaPossivel(jogadasPossiveis)
    }

    #jogada2() {

    }

    #jogada3() {
        let jogadasPossiveis
        const pattern = this.#getPattern
        if (pattern == 0) {
            jogadasPossiveis = this.#cantosPossiveis()
        } else if (pattern == 1) {
            if (this.jogadas[2].isMeio()) {
                let i = this.jogadas[0].getI
                let j = this.jogadas[0].getJ
                if (this.matriz.getIndice(2 - i, 1) == -1) {
                    jogadasPossiveis = [(3 * (2 - i)) + 1]
                } else {
                    jogadasPossiveis = [3 + 2 - j]
                }
                //FINALIZADO
            } else {
                jogadasPossiveis = this.#meiosPossiveis()
                //FINALIZADO
            }
        } else {
            if (this.jogadas[2].isCanto()) {
                let index
                if (this.jogadas[0].getI == 1) {
                    index = (3 * (2 - this.jogadas[2].getI)) + 1
                } else {
                    index = 3 + 2 - this.jogadas[2].getJ
                }
                jogadasPossiveis = [index]
            } else if (this.jogadas[2].getIndex == this.jogadas[0].getInverso) {
                jogadasPossiveis = this.#cantosPossiveis()
            } else {
                jogadasPossiveis = this.#cantosPossiveis()
                let i = this.jogadas[(this.jogadas[0].getI % 2) * 2].getI
                let j = this.jogadas[(this.jogadas[0].getJ % 2) * 2].getJ
                let index
                index = (3 * i) + j
                jogadasPossiveis.splice(jogadasPossiveis.indexOf(index), 1)
                index = (3 * (2 - i)) + 2 - j
                jogadasPossiveis.splice(jogadasPossiveis.indexOf(index), 1)
            }
            //FINALIZADO
        }
        this.#fazerJogadaPossivel(jogadasPossiveis)
    }

    #jogada4() {

    }

    #jogada5() {
        this.#fazerJogadaPossivel(this.#lerTodasJogadasPossiveis())
    }

    #jogada6() {
        
    }

    #jogada7() {
        this.#fazerJogadaPossivel(this.#lerTodasJogadasPossiveis())
    }

    #jogada8() {
        
    }

    /**
     * @param {Ameaca[]} ameacas 
     */
    #fazerJogadaAmeaca(ameacas) {
        if (ameacas.length == 0) {
            return false
        }
        const symbol = (this.jogo.getNJogadas + 1) % 2
        for (let index = 0; index < ameacas.length; index++) {
            if (ameacas[index].getSymbol == symbol) {
                this.jogo.jogar(ameacas[index].getIndex)
                return true
            }
        }
        this.jogo.jogar(ameacas[0].getIndex)
        return true
    }

    /** 
     * @param {number[]} jogadasPossiveis 
    */
    #fazerJogadaPossivel(jogadasPossiveis) {
        const nJogadasPossiveis = jogadasPossiveis.length
        if (nJogadasPossiveis == 0) {
            return
        }
        if (nJogadasPossiveis == 1) {
            this.jogo.jogar(jogadasPossiveis[0])
        } else {
            const index = this.#random(0, nJogadasPossiveis - 1)
            this.jogo.jogar(jogadasPossiveis[index])
        }
    }

    #meiosPossiveis() {
        let meios = [1, 3, 5, 7]
        return this.#lerJogadaPossivel(meios)
    }

    #cantosPossiveis() {
        let cantos = [0, 2, 6, 8]
        return this.#lerJogadaPossivel(cantos)
    }

    /**
     * @param {number[]} array 
    */
    #lerJogadaPossivel(array) {
        for (let i = 0; i < array.length; i++) {
            if (this.matriz.getIndiceByIndex(array[i]) != -1) {
                array.splice(i, 1)
                i--
            }
        }
        return array
    }

    /** 
     * @returns {number[]} 
    */
    #lerTodasJogadasPossiveis() {
        let jogadasPossiveis = []
        for (let i = 0; i < 9; i++) {
            if (this.matriz.getIndiceByIndex(i) == -1) {
                jogadasPossiveis.push(i)
            }
        }
        return jogadasPossiveis
    }
    
    /** 
     * @returns {Ameaca[]} 
    */
    #verificarAmeacas() {
        let ameacas = []
        let ameaca
        let i
        let j
        for (let m = 0; m < 3; m++) {
            j = this.#verificarAmeacaArray(this.matriz.getRow(m))
            if (j != -1) {
                i = m
                if (j == 1) {
                    ameaca = new Ameaca(i, j, this.matriz.getIndice(i, 0))
                } else {
                    ameaca = new Ameaca(i, j, this.matriz.getIndice(i, 2 - j))
                }
                ameacas.push(ameaca)
            }
            i = this.#verificarAmeacaArray(this.matriz.getColumn(m))
            if (i != -1) {
                j = m
                if (i == 1) {
                    ameaca = new Ameaca(i, j, this.matriz.getIndice(0, j))
                } else {
                    ameaca = new Ameaca(i, j, this.matriz.getIndice(2 - i, j))
                }
                ameacas.push(ameaca)
            }
        }
        i = this.#verificarAmeacaArray(this.matriz.getDiagonalPrincipal())
        if (i != -1) {
            if (i == 1) {
                ameaca = new Ameaca(i, i, this.matriz.getIndice(0, 0))
            } else {
                ameaca = new Ameaca(i, i, this.matriz.getIndice(1, 1))
            }
            ameacas.push(ameaca)
        }
        i = this.#verificarAmeacaArray(this.matriz.getDiagonalSecundaria())
        if (i != -1) {
            if (j == i) {
                ameaca = new Ameaca(i, 2-i, this.matriz.getIndice(0, 2))
            } else {
                ameaca = new Ameaca(i, 2-i, this.matriz.getIndice(1, 1))
            }
            ameacas.push(ameaca)
        }
        
        for (let m = 0; m < ameacas.length; m++) {
            for (let n = m + 1; n < ameacas.length; n++) {
                if (ameacas[m].getIndex == ameacas[n].getIndex && ameacas[m].getSymbol == ameacas[n].getSymbol) {
                    ameacas.splice(n, 1)
                }
            }
        }
        return ameacas
    }

    /** 
     * @param {number[]} array 
     * @returns {number}
    */
    #verificarAmeacaArray(array) {
        inicio:
        for (let i = 0; i < 3; i++) {
            for (let j = i + 1; j < 3; j++) {
                if (array[i] == -1) {
                    continue inicio
                }
                if (array[i] == array[j]) {
                    if (array[3 - i - j] == -1) {
                        return (3 - i - j)
                    }
                }
            }
        }
        return -1
    }
    
    /** 
     * @param {number} min 
     * @param {number} max 
     * @returns {number}
    */
    #random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }
}