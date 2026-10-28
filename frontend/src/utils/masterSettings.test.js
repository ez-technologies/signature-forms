import { extractMasterSettings } from './masterSettings';

describe('extractMasterSettings', () => {
    test('reads content sheet id and backend url from global rows', () => {
        const parsed = { global: { content_sheet_id: ' C1 ', gas_web_app_url: ' https://x/exec ' } };
        expect(extractMasterSettings(parsed)).toEqual({
            contentSheetId: 'C1',
            gasWebAppUrl: 'https://x/exec',
            missing: [],
        });
    });

    test('lists every missing row, with no fallback', () => {
        expect(extractMasterSettings({ global: {} })).toEqual({
            contentSheetId: '',
            gasWebAppUrl: '',
            missing: ['global.content_sheet_id', 'global.gas_web_app_url'],
        });
        expect(extractMasterSettings({}).missing).toHaveLength(2);
    });
});
