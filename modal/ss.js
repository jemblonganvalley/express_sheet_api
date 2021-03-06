const { GoogleSpreadsheet } = require("google-spreadsheet");
const key = require("./key.json");
const { v4: uuidv4 } = require("uuid");
const e = require("express");
const { unHashing } = require("../middleware/hashing");
const doc = new GoogleSpreadsheet(
  "1BRuQylaePuMb65Q2q8kLZsuT5LK4hClN-cI3AGyylUo"
);
const QRCode = require("qrcode");

//READ USER
exports.getData = async () => {
  const result = [];
  await doc.useServiceAccountAuth(key);
  await doc.loadInfo();
  const sheet_data = await doc.sheetsByTitle["userdata"];
  const rows = await sheet_data.getRows();
  const compile = await rows.map((e) => {
    const rd = {
      id: e._rawData[0],
      name: e._rawData[1],
      email: e._rawData[2],
      password: e._rawData[3],
      phone: e._rawData[4],
    };
    result.push(rd);
  });
  return result;
};

//ADD USER / R E G I S T E R
exports.setData = async (name, email, password, phone) => {
  const em = [];
  await doc.useServiceAccountAuth(key);
  await doc.loadInfo();
  const sheet_data = await doc.sheetsByTitle["userdata"];
  const rows = await sheet_data.getRows();
  const checkEmail = rows.map((e) => {
    em.push(e._rawData[2]);
  });
  if (em.includes(email)) {
    return false;
  } else {
    const add = await sheet_data.addRow({
      id: rows.length + 1,
      name: name,
      email: email,
      password: password,
      phone: phone,
    });
    return rows;
  }
};

//EDIT DATA USER
exports.editData = async (id, name, email, password, phone) => {
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
  rows[e].phone = phone; // update a value
  await rows[e].save(); // save updates
  // await rows[1].delete(); // delete a row
  console.log(rows[e].name + " " + rows[e].email);
};

//READ COMMENT
exports.getComment = async () => {
  const result = [];
  await doc.useServiceAccountAuth(key);
  await doc.loadInfo();
  const sheet_data = await doc.sheetsByTitle["comment"];
  const rows = await sheet_data.getRows();
  const compile = await rows.map((e) => {
    const cm = {
      id: e._rawData[0],
      comment_id: e._rawData[1],
      comment_username: e._rawData[2],
      comment_body: e._rawData[3],
      comment_like: e._rawData[4],
    };
    result.push(cm);
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

//LOGIN
exports.login = async (email, password) => {
  const em = [];
  const pass = [];
  await doc.useServiceAccountAuth(key);
  await doc.loadInfo();
  const sheet_data = await doc.sheetsByTitle["userdata"];
  const cell = await sheet_data.getRows();
  // store username
  await cell.map((e, i) => {
    em.push(e._rawData[2]);
    pass.push(e._rawData[3]);
  });
  // if (em.includes(email) && pass.includes(password)) {
  //   return true;
  // } else {
  //   return false;
  // }

  //check apakah email ada
  if (em.indexOf(email) >= 0) {
    const emailIndex = em.indexOf(email);
    if (unHashing(password, pass[emailIndex])) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

//ABSENS
exports.setAbsens = async (data) => {
  const abs = [];
  const nm = [];
  await doc.useServiceAccountAuth(key);
  await doc.loadInfo();
  const sheet = await doc.sheetsByTitle["absens"];
  // read rows
  const rows = await sheet.getRows();

  let ps = await rows.map((e) => {
    abs.push(e._rawData[0]);
    nm.push(e._rawData[1]);
  });

  const idx = await abs.indexOf(data);
  rows[idx].hadir = "hadir";

  await rows[idx].save();
  return nm[idx];
  // const addComment = await sheet.addRow({
  //   id: rows.length + 1,
  //   data : data
  // });
};

//ABSENS
exports.addAbesns = async (data) => {
  const abs = [];
  await doc.useServiceAccountAuth(key);
  await doc.loadInfo();
  const sheet = await doc.sheetsByTitle["addAbsens"];
  // read rows
  const rows = await sheet.getRows();
  const addComment = await sheet.addRow({
    id: rows.length + 1,
    data: data,
  });

  return await data;
};

const generteQrCode = async (dt) => {
  return await QRCode.toDataURL(dt)
    .then((url) => {
      return url;
    })
    .catch((err) => {
      console.error(err);
    });
};

//GENERATE QR CODE satuan
exports.genQrCode = async (dtx) => {
  await doc.useServiceAccountAuth(key);
  await doc.loadInfo();
  const sheet = await doc.sheetsByTitle["qrcode"];
  // read rows
  const rows = await sheet.getRows();

  return await generteQrCode(rows[dtx - 1]._rawData[1]);

  // return rows[1]._rawData[1];

  // const rr = await rows.map((e, i) => {
  //   setTimeout(() => {
  //     generteQrCode(e._rawData[1])
  //       .then((result) => {
  //         rows[i].qrcode = result;
  //         rows[i].save();
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }, 2000);
  // });
};
