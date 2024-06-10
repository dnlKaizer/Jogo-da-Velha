export class Seletor {
    constructor() {
        this.seletor = document.querySelector('.seletor')
        this.textoSeletor = document.querySelector('#texto-seletor')
        this.seta = document.querySelector('#seta')
        this.buttonSeta = document.querySelector('#botao-seta')  
        this.buttonModos = document.getElementsByClassName('modos')
        this.enable = false
        this.modo = 3

        this.seletor.addEventListener("animationend",() => {
            this.enableButton(this.buttonSeta)
            this.enableButtonModos()
        })
        this.seletor.addEventListener("animationstart",() => {
            this.disableButtonModos()
        })
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
        this.disableButton(this.buttonSeta)
    }

    disappear() {
        this.seletor.id = 'seletorOff'
        this.enable = false

        this.seta.style.rotate = '0deg'
        this.disableButton(this.buttonSeta)
    }

    /**
     * @param {HTMLButtonElement} button 
     */
    disableButton(button) {
        button.style.cursor = 'default'
        button.disabled = true
    }
    /**
     * @param {HTMLButtonElement} button 
     */
    enableButton(button) {
        button.style.cursor = 'pointer'
        button.disabled = false
    }

    disableButtonModos() {
        for (let index = 0; index < this.buttonModos.length; index++) {
            const button = this.buttonModos[index]
            this.disableButton(button)
        }
    }
    enableButtonModos() {
        for (let index = 0; index < this.buttonModos.length; index++) {
            const button = this.buttonModos[index]
            this.enableButton(button)
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
