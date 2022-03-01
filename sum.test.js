const sum = require('./sum')

test('add 1 + 2 equal 3', () => {
    expect(sum(1, 2)).toBe(3)
    expect(sum(4, 5)).toBe(9)
})

test('isTruthy?', () => {
    expect(1).toBeTruthy()
    expect(0).toBeFalsy()
})
