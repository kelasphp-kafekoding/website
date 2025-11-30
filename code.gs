const SHEET_NAME = 'comentar';

/* Helper untuk output JSON dengan CORS headers */
function jsonResponse(obj) {
  const output = ContentService.createTextOutput(JSON.stringify(obj));
  output.setMimeType(ContentService.MimeType.JSON);
  
  return output
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    .setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, Authorization")
    .setHeader("Cache-Control", "no-cache");
}

/* ============================
   FIX CORS & 405 PRE-FLIGHT
   ============================ */
function doOptions(e) {
  const output = ContentService.createTextOutput("");
  output.setMimeType(ContentService.MimeType.TEXT_PLAIN);
  
  return output.setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    .setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, Authorization")
    .setHeader("Content-Type", "application/json")
    .setHeader("Cache-Control", "no-cache");
}

/* ============================
            GET
   ============================ */
function doGet(e) {
  try {
    console.log('doGet called');
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet) throw new Error(`Sheet "${SHEET_NAME}" tidak ditemukan`);

    const values = sheet.getDataRange().getValues();
    console.log('Sheet values:', values);
    
    const [, ...rows] = values;

    const comentar = rows
      .filter(r => r[0])
      .map(([id, name, status, message, date, color]) => ({
        id: String(id || ''),
        name: String(name || ''),
        status: String(status || ''),
        message: String(message || ''),
        date: String(date || ''),
        color: String(color || '#3b82f6')
      }));

    console.log('Returning comentar:', comentar);
    return jsonResponse({
      status: 200,
      message: 'Berhasil mengambil data',
      comentar
    });

  } catch (err) {
    console.log('Error in doGet:', err);
    return jsonResponse({
      status: 500,
      message: 'Error: ' + err,
      comentar: []
    });
  }
}

/* ============================
            POST (100% FIX)
   ============================ */
function doPost(e) {
  try {
    let payload = null;

    console.log('doPost called with e:', JSON.stringify(e, null, 2));
    console.log('e.postData:', e.postData);
    console.log('e.postData.contents:', e.postData?.contents);
    console.log('e.contentLength:', e.contentLength);

    /* 1. Coba parse JSON dari raw body */
    if (e.postData && e.postData.contents) {
      try {
        payload = JSON.parse(e.postData.contents);
        console.log('Parsed JSON from postData:', payload);
      } catch (err) {
        console.log('Failed to parse JSON:', err);
        payload = null;
      }
    }

    /* 2. Jika bukan JSON → ambil dari form.urlencoded atau FormData */
    if (!payload && e.parameter && Object.keys(e.parameter).length > 0) {
      payload = {};
      for (let key in e.parameter) payload[key] = e.parameter[key];
      console.log('Got payload from parameters:', payload);
    }

    /* 3. Kalau tetap kosong */
    if (!payload) throw new Error("POST data kosong / tidak terbaca.");

    /* Field normalize */
    const id = payload.id || Utilities.getUuid();
    const name = payload.name || payload.nama || "";
    const message = payload.message || payload.pesan || "";
    const status = payload.status || "";
    const date = payload.date || new Date().toISOString();
    const color = payload.color || "#3b82f6";

    if (!name || !message)
      throw new Error("Field name & message wajib diisi.");

    /* Simpan ke Sheet */
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet) throw new Error(`Sheet "${SHEET_NAME}" tidak ditemukan`);

    sheet.appendRow([id, name, status, message, date, color]);

    return jsonResponse({
      status: 200,
      message: "Data berhasil ditambahkan"
    });

  } catch (err) {
    return jsonResponse({
      status: 500,
      message: "Error: " + err
    });
  }
}
