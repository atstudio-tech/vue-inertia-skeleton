export type NumType = number | string | null

export type Currency = 'EUR' | 'USD'

export interface CurrencyOptions {
    decimals?: number
    currency?: Currency
}

export default class Num {
    constructor(private readonly num: NumType) {}

    public static of(number: NumType): Num {
        return new Num(number)
    }

    public static currency(number: NumType, options?: CurrencyOptions): string {
        return new this(number).currency(options)
    }

    public static percent(number: NumType, options?: CurrencyOptions): string {
        return new this(number).percent(options)
    }

    public static format(number: NumType): string {
        return new this(number).toString()
    }

    public currency(options?: CurrencyOptions): string {
        if (this.num === null || this.num === '') return ''

        options = { currency: 'EUR', decimals: 0, ...options }

        const intlOptions = {
            style: 'currency',
            currency: options.currency,
            minimumFractionDigits: options.decimals,
        }

        return new Intl.NumberFormat('fr-FR', intlOptions).format(this.num as number)
    }

    public percent(options?: Intl.NumberFormatOptions): string {
        if (this.num === null || this.num === '') return ''

        const intlOptions = { style: 'percent', maximumFractionDigits: 2, ...options }

        return new Intl.NumberFormat('fr-FR', intlOptions).format((this.num as number) / 100)
    }

    public format(): string {
        return this.toString()
    }

    public toString(): string {
        return new Intl.NumberFormat('fr-FR').format(this.num as number)
    }
}
