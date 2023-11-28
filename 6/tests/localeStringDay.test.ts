import getLocaleStringDay from "../lib/localeStringDay";
import {describe, expect, test} from "@jest/globals";

describe('Test funkce getLocaleStringDay()', () => {

test('den 0 je neděle', () => {
    expect(getLocaleStringDay(0)).toBe('neděle');
});

test('den 7 je mimo rozsah', () => {
    expect(getLocaleStringDay(7)).toBe(false);
});

test('den -2 mimo rozsah', () => {
    expect(getLocaleStringDay(-2)).toBe(false);
});

test('den null je mimo rozsah', () => {
    expect(getLocaleStringDay(null)).toBe(false);
});

test('den undefined je mimo rozsah', () => {
    expect(getLocaleStringDay(undefined)).toBe(false);
});

});