export class Seletor {
    constructor() {
        this.seletor = document.querySelector('#seletor')
        this.textoSeletor = document.querySelector('#texto-seletor')
        this.seta = document.querySelector('#seta')
        this.enable = false
        this.modo = 3
        this.txtAppear = 'appear-seletor'
        this.txtDisappear = 'disappear-seletor'
        if (innerWidth > 480) {
            this.maxHeight = '168px'
        } else {
            this.minHeight = '120px'
            this.txtAppear += '-mobile'
            this.txtDisappear += '-mobile'
        }
    }

    get getStatus() {
        return this.enable
    }

    get getModo() {
        return this.modo
    }

    appear() {
        this.seletor.style.animation = `${this.txtAppear} 1.5s`
        this.enable = true
        this.seta.style.rotate = '180deg'
        this.seta.onclick = ''
        setTimeout(() => {
            this.seletor.style.maxHeight = this.maxHeight
            this.seta.onclick = () => {
                window.clicarSeletor()
            }
        }, 1000)
    }

    disappear() {
        this.seletor.style.animation = `${this.txtDisappear} 1.5s`
        this.enable = false
        this.seta.style.rotate = '0deg'
        this.seta.onclick = ''
        setTimeout(() => {
            this.seletor.style.maxHeight = '0px'
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