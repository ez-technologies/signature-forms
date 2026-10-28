import { resolveMasterSheetId } from './masterSheetId';

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
});
