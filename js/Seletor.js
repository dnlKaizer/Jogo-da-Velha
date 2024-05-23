export class Seletor {
    constructor() {
        this.seletor = document.querySelector('#seletor')
        this.seta = document.querySelector('#seta')
        this.enable = false
    }

    get getStatus() {
        return this.enable
    }

    appear() {
        this.seletor.style.animation = 'appear-seletor 1.5s'
        this.enable = true
        this.seta.style.rotate = '180deg'
        this.seta.onclick = ''
        setTimeout(() => {
            this.seletor.style.maxHeight = '168px'
            this.seta.onclick = () => {
                window.clicarSeletor()
            }
        }, 1000)
    }

    disappear() {
        this.seletor.style.animation = 'disappear-seletor 1.5s'
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
}