export class Seletor {
    constructor() {
        this.seletor = document.querySelector('.seletor')
        this.textoSeletor = document.querySelector('#texto-seletor')
        this.seta = document.querySelector('#seta')
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
        }, 1000)
    }

    escolherModo(index) {
        this.modo = index
        let texts = ['Fácil', 'Médio', 'Impossível', 'Jogadores']
        this.textoSeletor.innerHTML = texts[index]
    }
}