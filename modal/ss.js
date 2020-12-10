const { GoogleSpreadsheet } = require("google-spreadsheet");
const key = require("./key.json");
const { v4: uuidv4 } = require("uuid");

const doc = new GoogleSpreadsheet(
  "1BRuQylaePuMb65Q2q8kLZsuT5LK4hClN-cI3AGyylUo"
);

//READ USER
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

//ADD USER
exports.setData = async (name, email, password) => {
  await doc.useServiceAccountAuth(key);
  await doc.loadInfo();
  const sheet_data = await doc.sheetsByTitle["userdata"];
  const rows = await sheet_data.getRows();
  const add = await sheet_data.addRow({
    id: rows.length + 1,
    name: name,
    email: email,
    password: password,
  });
  return rows;
};

//EDIT DATA USER
exports.editData = async (id, name, email, password) => {
  const e = (await id) - 1;
  await doc.useServiceAccountAuth(key);
  await doc.loadInfo();
  const sheet = await doc.sheetsByTitle["userdata"];
  // read rows
  const rows = await sheet.getRows(); // can pass in { limit, offset }

  // read/write row values
  // console.log(rows[0].name); // 'Larry Page'
  rows[e].email = email; // update a value
  rows[e].name = name; // update a value
  rows[e].password = password; // update a value
  await rows[e].save(); // save updates
  // await rows[1].delete(); // delete a row
  console.log(rows[e].name + " " + rows[e].email);
};

//READ USER
exports.getComment = async () => {
  const result = [];
  await doc.useServiceAccountAuth(key);
  await doc.loadInfo();
  const sheet_data = await doc.sheetsByTitle["comment"];
  const rows = await sheet_data.getRows();
  const compile = await rows.map((e) => {
    result.push(e._rawData);
  });
  return result;
};

//SET COMENTAR
exports.setComment = async (comment_username, comment_body) => {
  await doc.useServiceAccountAuth(key);
  await doc.loadInfo();
  const sheet = await doc.sheetsByTitle["comment"];
  // read rows
  const rows = await sheet.getRows();
  const addComment = await sheet.addRow({
    id: rows.length + 1,
    comment_id: uuidv4(),
    comment_body: comment_body,
    comment_username: comment_username,
  });
};
