// fs = full sheet id (used as-is), sheetId = legacy full id,
// s = short id + suffix (suffix looked up by the short id in suffixMap, else the default suffix)

// "prefix1:suffix1,prefix2:suffix2" -> { prefix1: suffix1, prefix2: suffix2 }
export function parseSuffixMap(raw) {
    const map = {};
    (raw || '').split(',').forEach((entry) => {
        const [prefix, suffix] = entry.split(':').map((part) => part.trim());
        if (prefix && suffix) {
            map[prefix] = suffix;
        }
    });
    return map;
}

export function resolveMasterSheetId(search, suffix, suffixMap = {}) {
    const params = new URLSearchParams(search);
    const fullId = params.get('fs') || params.get('sheetId');
    if (fullId) {
        return { id: fullId };
    }
    const shortId = params.get('s');
    if (shortId) {
        const resolvedSuffix = suffixMap[shortId] || suffix;
        return resolvedSuffix ? { id: `${shortId}${resolvedSuffix}` } : { error: 'missing_suffix' };
    }
    return { error: 'missing_id' };
}
