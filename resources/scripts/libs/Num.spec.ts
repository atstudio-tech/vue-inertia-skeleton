import Num from './Num'

describe('Num Library', () => {
    it('converts a number to a currency format', () => {
        let number = Num.of(12).currency()

        expect(number).to.equal('12 €')

        number = Num.of(12.5).currency()
        expect(number).to.equal('12,5 €')

        number = Num.of(12.5).currency({ decimals: 2 })
        expect(number).to.equal('12,50 €')

        number = Num.of(1099).currency()
        expect(number).to.equal('1 099 €')

        number = Num.of(1099).currency({ decimals: 2 })
        expect(number).to.equal('1 099,00 €')
    })

    it('converts a number to a percent format', () => {
        let number = Num.of(12).percent()

        expect(number).to.equal('12 %')

        number = Num.of(12.5).percent()
        expect(number).to.equal('12,5 %')

        number = Num.of(12.5).percent({ minimumFractionDigits: 2 })
        expect(number).to.equal('12,50 %')

        number = Num.of(1099).percent()
        expect(number).to.equal('1 099 %')

        number = Num.of(1099).percent({ minimumFractionDigits: 2 })
        expect(number).to.equal('1 099,00 %')
    })

    it('correctly formats a number', () => {
        const number = Num.of(1500)

        expect(number.format()).to.equal('1 500')
        expect(number.toString()).to.equal('1 500')
    })
})
