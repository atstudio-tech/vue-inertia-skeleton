import { marked } from 'marked'

export default class Str {
    constructor(private readonly str?: string | null) {}

    public static of(str?: string | null, replace?: Record<string, string>): Str {
        if (replace) {
            for (const [key, value] of Object.entries(replace)) {
                str = str?.replace(`:${key}`, value)
            }
        }

        return new Str(str)
    }

    public static markdown(str: string): string {
        return new this(str).markdown()
    }

    public static choice(str: string, count: number, signed = false): string {
        return new this(str).choice(count, signed)
    }

    public markdown(): string {
        return this.str ? marked(this.str) : ''
    }

    public choice(count: number, signed = false): string {
        if (!this.str) return ''

        const [singular, plural] = this.str.split('|')

        const sign = signed ? (count > 0 ? '+' : '') : ''

        return (
            sign +
            (Math.abs(count) === 1
                ? singular.replace(':count', count.toString())
                : plural.replace(':count', count.toString())
            ).trim()
        )
    }

    public toString(): string {
        return this.str ?? ''
    }
}
