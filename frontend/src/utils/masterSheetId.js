// fs = full sheet id (used as-is), sheetId = legacy full id, s = short id + REACT_APP_MASTER_SHEET_SUFFIX
export function resolveMasterSheetId(search, suffix) {
    const params = new URLSearchParams(search);
    const fullId = params.get('fs') || params.get('sheetId');
    if (fullId) {
        return { id: fullId };
    }
    const shortId = params.get('s');
    if (shortId) {
        return suffix ? { id: `${shortId}${suffix}` } : { error: 'missing_suffix' };
    }
    return { error: 'missing_id' };
}
