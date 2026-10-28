// Settings that live in the master sheet's global.* rows (no env or default fallback).
export function extractMasterSettings(parsedMaster) {
    const global = (parsedMaster && parsedMaster.global) || {};
    const contentSheetId = String(global.content_sheet_id || '').trim();
    const gasWebAppUrl = String(global.gas_web_app_url || '').trim();
    const missing = [];
    if (!contentSheetId) missing.push('global.content_sheet_id');
    if (!gasWebAppUrl) missing.push('global.gas_web_app_url');
    return { contentSheetId, gasWebAppUrl, missing };
}
