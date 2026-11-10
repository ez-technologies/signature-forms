import { resolveMasterSheetId, parseSuffixMap } from './masterSheetId';

const SUFFIX = 'vdGw97692GjeFMGeWMM_h0sldt5jlNhHYGsk';

describe('resolveMasterSheetId', () => {
    test('s is joined with the suffix', () => {
        expect(resolveMasterSheetId('?s=1IN_gFzB', SUFFIX))
            .toEqual({ id: `1IN_gFzB${SUFFIX}` });
    });

    test('fs is used as the full id, without the suffix', () => {
        expect(resolveMasterSheetId('?fs=FULLID123', SUFFIX)).toEqual({ id: 'FULLID123' });
    });

    test('fs wins over s, and sheetId still works', () => {
        expect(resolveMasterSheetId('?fs=FULL&s=1IN_gFzB', SUFFIX)).toEqual({ id: 'FULL' });
        expect(resolveMasterSheetId('?sheetId=LEGACY', SUFFIX)).toEqual({ id: 'LEGACY' });
    });

    test('s without a configured suffix is an error', () => {
        expect(resolveMasterSheetId('?s=abc', '')).toEqual({ error: 'missing_suffix' });
    });

    test('no parameter is an error', () => {
        expect(resolveMasterSheetId('', SUFFIX)).toEqual({ error: 'missing_id' });
    });

    test('s uses the suffix mapped to its short id, falling back to the default', () => {
        const map = { '1t0JGKm2': 'v6veAzLygyMvbW6qe4fWjfjAZFUQfp814_6I' };
        expect(resolveMasterSheetId('?s=1t0JGKm2', SUFFIX, map))
            .toEqual({ id: '1t0JGKm2v6veAzLygyMvbW6qe4fWjfjAZFUQfp814_6I' });
        expect(resolveMasterSheetId('?s=1IN_gFzB', SUFFIX, map))
            .toEqual({ id: `1IN_gFzB${SUFFIX}` });
    });

    test('s with a mapped suffix works without a default suffix', () => {
        expect(resolveMasterSheetId('?s=abc', '', { abc: 'xyz' })).toEqual({ id: 'abcxyz' });
    });
});

describe('parseSuffixMap', () => {
    test('parses prefix:suffix pairs and ignores junk', () => {
        expect(parseSuffixMap('a:b, c:d ,bad,:x,y:')).toEqual({ a: 'b', c: 'd' });
        expect(parseSuffixMap(undefined)).toEqual({});
    });
});
