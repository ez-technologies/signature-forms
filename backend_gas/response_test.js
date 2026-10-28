// Manual test: set RESPONSE_SHEET_ID and TAB_NAME to a spreadsheet you own, then run testAnswer from the editor.
// It appends one row to that tab (creating the tab if needed).
function testAnswer() {
  const RESPONSE_SHEET_ID = 'YOUR_RESPONSE_SPREADSHEET_ID';
  const TAB_NAME = 'test_tab';

  const payload = {
    quizSheetId: 'test_quiz',
    responseSheetId: RESPONSE_SHEET_ID,
    responseTabName: TAB_NAME,
    userAnswers: { Q1: 'answer 1', Q2: 'answer 2' },
    metadata: {
      userAgent: 'manual test',
      Timestamp: new Date().toISOString(),
      latitude: null,
      longitude: null,
      accuracy: null,
      locationStatus: 'not_supported',
    },
  };

  const result = doPost({ postData: { contents: JSON.stringify(payload) } });
  Logger.log(result.getContent());
}
