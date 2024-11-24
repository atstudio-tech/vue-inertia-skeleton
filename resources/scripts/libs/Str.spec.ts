import Str from './Str'

describe('Str Library', () => {
    it('parses Markdown text', () => {
        const str = Str.of('Hello, **world**!')

        expect(str.markdown()).to.equal('<p>Hello, <strong>world</strong>!</p>\n')
    })

    it('chooses a correct string part depending on the singular or plural forms', () => {
        let str = Str.of(':count item|:count items').choice(2)
        expect(str).to.equal('2 items')

        str = Str.of(':count item|:count items').choice(1)
        expect(str).to.equal('1 item')

        str = Str.of(':count item  |    :count items').choice(0)
        expect(str).to.equal('0 items')

        str = Str.of('item|items').choice(10)
        expect(str).to.equal('items')

        str = Str.of(':count item|:count items').choice(3, true)
        expect(str).to.equal('+3 items')
        str = Str.of(':count item|:count items').choice(-1, true)
        expect(str).to.equal('-1 item')

        str = Str.of(null).choice(2)
        expect(str).to.equal('')

        str = Str.of(undefined).choice(2)
        expect(str).to.equal('')
    })

    it('replaces placeholders with a value', () => {
        let str = Str.of('Hello :name', { name: 'John' })

        expect(str.toString()).to.be.equal('Hello John')
    })
})
