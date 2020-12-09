const { GoogleSpreadsheet } = require("google-spreadsheet");
const key = require("./key.json");

const doc = new GoogleSpreadsheet(
  "1BRuQylaePuMb65Q2q8kLZsuT5LK4hClN-cI3AGyylUo"
);

exports.getData = async () => {
  const result = [];
  await doc.useServiceAccountAuth(key);
  await doc.loadInfo();
  const sheet_data = await doc.sheetsByTitle["userdata"];
  const rows = await sheet_data.getRows();
  const compile = await rows.map((e) => {
    result.push(e._rawData);
  });
  return result;
};

exports.setData = async (name, email, password) => {
  await doc.useServiceAccountAuth(key);
  await doc.loadInfo();
  const sheet_data = await doc.sheetsByTitle["data"];
  const rows = await sheet_data.getRows();
  const add = await sheet_data.addRow({
    id: rows.length + 1,
    name: name,
    email: email,
    password: password,
  });
  return rows;
};
