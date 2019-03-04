const {expect} = require('chai')
const product = require('../src/')
const naturalGen = function* () {
    let num = 0
    while (true) {
        yield num++
    }
}
const naturals = () => ({
    [Symbol.iterator]: naturalGen
})
const toArray = (iterator, num = Infinity) => {
    const array = []
    for (let index = 0; index < num; ++index) {
        const {value, done} = iterator.next()
        if (done) {
            break
        }
        array.push(value)
    }
    return array
}

describe('product', function () {
    describe('method', function () {
        describe('given 1 list', function () {
            it('cartesian product of one iterable with one element', function () {
                const iterator = product([[1]])
                expect(toArray(iterator))
                    .to.be.deep.equal([[1]])
            })

            it('cartesian product of one iterable with one element', function () {
                const iterator = product([[1, 2, 3]])
                expect(toArray(iterator))
                    .to.be.deep.equal([[1], [2], [3]])
            })
        })
        describe('given 2 lists, it makes cartesian product of these lists', function () {
            it('2 no empty lists', function () {
                const iterator = product([
                    [1, 2],
                    [3, 4]
                ])
                expect(toArray(iterator)).to.be.deep.equal([
                    [1, 3],
                    [2, 3],
                    [1, 4],
                    [2, 4]
                ])
            })

            it('first list is empty', function () {
                const iterator = product([
                    [],
                    [1, 2, 3, 4]
                ])
                expect(toArray(iterator)).to.be.deep.equal([])
            })

            it('second list is empty', function () {
                const iterator = product([
                    [1, 2, 3, 4],
                    []
                ])
                expect(toArray(iterator)).to.be.deep.equal([])
            })

            it('2 lists are empty', function () {
                const iterator = product([
                    [],
                    []
                ])
                expect(toArray(iterator)).to.be.deep.equal([])
            })

            it('first list has one element', function () {
                const iterator = product([
                    [0],
                    [1, 2, 3, 4]
                ])
                expect(toArray(iterator)).to.be.deep.equal([
                    [0, 1],
                    [0, 2],
                    [0, 3],
                    [0, 4]
                ])
            })
        })

        describe('one list', function () {
            it('no empty list', function () {
                const iterator = product([[1, 2, 3, 4]])
                expect(toArray(iterator))
                    .to.be.deep.equal([[1], [2], [3], [4]])
            })

            it('empty list', function () {
                const iterator = product([[]])
                expect(toArray(iterator))
                    .to.be.deep.equal([])
            })
        })

        describe('zero lists', function () {
            it('returns empty list', function () {
                const iterator = product([])
                expect(toArray(iterator))
                    .to.be.deep.equal([])
            })
        })

        describe('more than 2 lists', function () {
            it('3 no empty lists with the same length', function () {
                const iterator = product([
                    [1, 2],
                    [3, 4],
                    [5, 6]
                ])
                expect(toArray(iterator)).to.be.deep.equal([
                    [1, 3, 5],
                    [2, 3, 5],
                    [1, 4, 5],
                    [2, 4, 5],
                    [1, 3, 6],
                    [2, 3, 6],
                    [1, 4, 6],
                    [2, 4, 6]
                ])
            })

            it('3 no empty lists with different length', function () {
                const iterator = product([
                    [1, 2],
                    [3],
                    [4, 5, 6]
                ])
                expect(toArray(iterator)).to.be.deep.equal([
                    [1, 3, 4],
                    [2, 3, 4],
                    [1, 3, 5],
                    [2, 3, 5],
                    [1, 3, 6],
                    [2, 3, 6]
                ])
            })

            it('there is an empty list', function () {
                const iterator = product([
                    [1, 2, 3],
                    new Set([3, 4, 5, 3, 2, 4]),
                    [],
                    [4, 5, 6]
                ])
                expect(toArray(iterator)).to.be.deep.equal([])
            })
        })

        it('product of potentially infinite iterables', function () {
            const iterator = product(new Set([
                naturals(),
                naturals()
            ]))
            expect(toArray(iterator, 5)).to.be.deep.equal([
                [0, 0],
                [1, 0],
                [2, 0],
                [3, 0],
                [4, 0]
            ])
        })
    })
})
