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
        this.dificuldade = dificuldade
    }

    modoFacil() {
        const nJogadas = this.jogo.getNJogadas
        let jogadasPossiveis
        switch (nJogadas) {
            case 0:
                jogadasPossiveis = this.lerJogadasPossiveis()
                this.fazerJogadaPossivel(jogadasPossiveis)
            break;

            case 1:
                jogadasPossiveis = this.lerJogadasPossiveis()
                this.fazerJogadaPossivel(jogadasPossiveis)
            break;

            case 2:
                jogadasPossiveis = this.lerJogadasPossiveis()
                this.fazerJogadaPossivel(jogadasPossiveis)
            break;

            case 3:
                jogadasPossiveis = this.lerJogadasPossiveis()
                this.fazerJogadaPossivel(jogadasPossiveis)
            break;

            case 4:
                jogadasPossiveis = this.lerJogadasPossiveis()
                this.fazerJogadaPossivel(jogadasPossiveis)
            break;

            case 5:
                jogadasPossiveis = this.lerJogadasPossiveis()
                this.fazerJogadaPossivel(jogadasPossiveis)
            break;

            case 6:
                jogadasPossiveis = this.lerJogadasPossiveis()
                this.fazerJogadaPossivel(jogadasPossiveis)
            break;

            case 7:
                jogadasPossiveis = this.lerJogadasPossiveis()
                this.fazerJogadaPossivel(jogadasPossiveis)
            break;

            case 8:
                jogadasPossiveis = this.lerJogadasPossiveis()
                this.fazerJogadaPossivel(jogadasPossiveis)
            break;
        
            default:
                break;
        }
    }

    /** 
     * @param {number[]} jogadasPossiveis 
    */
    fazerJogadaPossivel(jogadasPossiveis) {
        const nJogadasPossiveis = jogadasPossiveis.length
        if (nJogadasPossiveis > 0) {
            const index = this.random(0, nJogadasPossiveis - 1)
            this.jogo.jogarIndex(jogadasPossiveis[index])
        }
    }

    /** 
     * @returns {number[]} 
    */
    lerJogadasPossiveis() {
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