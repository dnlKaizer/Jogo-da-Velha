export class Seletor {
    constructor() {
        this.seletor = document.querySelector('.seletor')
        this.textoSeletor = document.querySelector('#texto-seletor')
        this.seta = document.querySelector('#seta')
        this.buttonModos = document.getElementsByClassName('modos')
        this.enable = false
        this.modo = 3
    }

    get getStatus() {
        return this.enable
    }

    get getModo() {
        return this.modo
    }

    appear() {
        this.seletor.id = 'seletorOn'
        this.enable = true

        this.seta.style.rotate = '180deg'
        this.seta.onclick = ''
        setTimeout(() => {
            this.seta.onclick = () => {
                window.clicarSeletor()
            }
            this.enableButtonModos()
        }, 1000)
    }

    disappear() {
        this.seletor.id = 'seletorOff'
        this.enable = false

        this.seta.style.rotate = '0deg'
        this.seta.onclick = ''
        setTimeout(() => {
            this.seta.onclick = () => {
                window.clicarSeletor()
            }
            this.disableButtonModos()
        }, 1000)
    }

    disableButtonModos() {
        for (let index = 0; index < this.buttonModos.length; index++) {
            const button = this.buttonModos[index]
            button.style.cursor = 'default'
            button.onclick = ''
        }
    }

    enableButtonModos() {
        for (let index = 0; index < this.buttonModos.length; index++) {
            const button = this.buttonModos[index]
            button.style.cursor = 'pointer'
            button.onclick = () => {
                window.escolherModo(index)
            }
        }
    }

    /** 
     * @param {number} index
    */
    escolherModo(index) {
        this.modo = index
        let texts = ['Fácil', 'Médio', 'Impossível', 'Jogadores']
        this.textoSeletor.innerHTML = texts[index]
    }
}