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
    }

    jogar() {
        if (this.dificuldade == 0) {
            this.jogarModoFacil()
        } else if (this.dificuldade == 1) {
            this.jogarModoMedio()
        } else {
            this.jogarModoImpossivel()
        }
    }

    jogarModoFacil() {
        const ameacas = this.verificarAmeacas()
        const nAmeacas = ameacas.length
        let jogadasPossiveis = this.lerTodasJogadasPossiveis()
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
            jogadasPossiveis = this.lerTodasJogadasPossiveis()
        }
        this.fazerJogadaPossivel(jogadasPossiveis)
    }

    jogarModoMedio() {
        let jogadasPossiveis
        const ameacas = this.verificarAmeacas()
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
            jogadasPossiveis = this.lerTodasJogadasPossiveis()
        }
        this.fazerJogadaPossivel(jogadasPossiveis)
    }

    jogarModoImpossivel() {
        const nJogadas = this.jogo.getNJogadas
        switch (nJogadas) {
            case 0:
                this.jogada0()
            break;
        
            case 1:
                this.jogada1()
            break;
        
            case 2:
                this.jogada2()
            break;

            case 3:
                this.jogada3()
            break;
        
            case 4:
                this.jogada4()
            break;
        
            case 5:
                this.jogada5()
            break;
        
            case 6:
                this.jogada6()
            break;
        
            case 7:
                this.jogada7()
            break;
        
            case 8:
                this.jogada8()
            break;
        
            default:
            break;
        }
    }

    jogada0() {
        const sorte = this.random(1, 10)
        if (sorte >= 9) {
            this.fazerJogadaPossivel([1, 3, 5, 7])
        } else if (sorte >= 6) {
            this.fazerJogadaPossivel([4])
        } else {
            this.fazerJogadaPossivel([0, 2, 6, 8])
        }
    }

    jogada1() {
        const jogada = this.jogadas[0]
        let jogadasPossiveis = []
        if (jogada.isCentro()) {
            jogadasPossiveis = [0, 2, 6, 8]
        } else if (jogada.isMeio()) {
            if (jogada.getIndex < 4) {
                jogadasPossiveis.push(8)
            } else {
                jogadasPossiveis.push(0)
            }
            if ((jogada.getIndex % 4) == 1) {
                jogadasPossiveis.push(6)
            } else {
                jogadasPossiveis.push(2)
            }
        } else {
            jogadasPossiveis = [4]
        }
        this.fazerJogadaPossivel(jogadasPossiveis)
    }

    jogada2() {

    }

    jogada3() {

    }

    jogada4() {

    }

    jogada5() {

    }

    jogada6() {

    }

    jogada7() {

    }

    jogada8() {

    }

    /** 
     * @param {number[]} jogadasPossiveis 
    */
    fazerJogadaPossivel(jogadasPossiveis) {
        const nJogadasPossiveis = jogadasPossiveis.length
        if (nJogadasPossiveis == 0) {
            return
        }
        if (nJogadasPossiveis == 1) {
            this.jogo.jogarIndex(jogadasPossiveis[0])
        } else {
            const index = this.random(0, nJogadasPossiveis - 1)
            this.jogo.jogarIndex(jogadasPossiveis[index])
        }
    }

    /**
     * @param {number[]} array 
     */
    lerJogadaPossivel(array) {
        for (let i = 0; i < array.length; i++) {
            if (this.matriz.getIndiceByIndex(array[i]) == -1) {
                array.splice(i, 1)
                i--
            }
        }
        return array
    }

    /** 
     * @returns {number[]} 
    */
    lerTodasJogadasPossiveis() {
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
    verificarAmeacas() {
        let ameacas = []
        let ameaca
        let i
        let j
        for (let m = 0; m < 3; m++) {
            j = this.verificarAmeacaArray(this.matriz.getRow(m))
            if (j != -1) {
                i = m
                if (j == 1) {
                    ameaca = new Ameaca(i, j, this.matriz.getIndice(i, 0))
                } else {
                    ameaca = new Ameaca(i, j, this.matriz.getIndice(i, 2 - j))
                }
                ameacas.push(ameaca)
            }
            i = this.verificarAmeacaArray(this.matriz.getColumn(m))
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
        i = this.verificarAmeacaArray(this.matriz.getDiagonalPrincipal())
        if (i != -1) {
            if (i == 1) {
                ameaca = new Ameaca(i, i, this.matriz.getIndice(0, 0))
            } else {
                ameaca = new Ameaca(i, i, this.matriz.getIndice(1, 1))
            }
            ameacas.push(ameaca)
        }
        i = this.verificarAmeacaArray(this.matriz.getDiagonalSecundaria())
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
    verificarAmeacaArray(array) {
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
    random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }
}