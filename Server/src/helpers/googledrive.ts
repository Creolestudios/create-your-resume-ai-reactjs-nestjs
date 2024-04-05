import { extname } from "path";
import { google } from "googleapis";
import { updateresumedetails } from "./firestore";
import { Readable } from "stream";
import { previewconvertDOCtoPDF } from "./fileconversion";
const fs = require("fs");
import * as dotenv from "dotenv";
dotenv.config();

const client_email = process.env.GOOGLE_DRIVE_SERVICE_EMAIL;
const private_key = process.env.GOOGLE_DRIVE_PRIVATE_KEY!.replace(/\\n/g, "\n");
const SCOPES = ["https://www.googleapis.com/auth/drive.file"];

//------------- new strategy ---------------

const jwtClient = new google.auth.JWT(client_email, null!, private_key, SCOPES);
jwtClient.authorize();

const drive = google.drive({ version: "v3", auth: jwtClient });

// ------------ old strategy ---------------
// const oauth2Client = new google.auth.OAuth2(
//   process.env.DRIVE_CLIENT_ID,
//   process.env.DRIVE_CLIENT_SECRET,
//   process.env.DRIVE_REDIRECT_URI
// );
// oauth2Client.setCredentials({ refresh_token: process.env.DRIVE_REFRESH_TOKEN });
// const drive = google.drive({
//   version: 'v3',
//   auth: oauth2Client,
// });

export const savetodrive = async (filename, userid, email) => {
  try {
    const fileMetadata = {
      name: filename, // Name of the file you want to upload
      parents: ["1f-1aP8fYFCHDxh4t4atVfe6brDpn0kc0"],
    };
    const ext = extname(filename);
    var media;
    if (ext == ".pdf") {
      media = {
        mimeType: "application/pdf",
        body: fs.createReadStream(`./src/files/upload/${filename}`),
      };
    } else if (ext == ".doc" || ext == ".docx") {
      media = {
        mimeType: "application/msword",
        body: fs.createReadStream(`./src/files/upload/${filename}`),
      };
    }
    const fileResponse = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: "id",
    });
    const updateuserdata = await updateresumedetails(filename, email);
    console.log("File uploaded successfully. File ID:", fileResponse.data.id);
  } catch (error) {
    console.error("Error uploading file:", error.message);
  }
};
export const getfromdrivedoc = async (resumeid: string, folder_id) => {
  folder_id = "1f-1aP8fYFCHDxh4t4atVfe6brDpn0kc0";
  const get = await drive.files.list({
    q: ` '${folder_id}' in parents and name='${resumeid}'`,
    fields: "files(id, name)",
  });

  var dest = fs.createWriteStream(`./src/files/preview/${resumeid}`);
  const savefile = await drive.files.get(
    {
      fileId: get.data.files[0].id,
      alt: "media",
    },
    { responseType: "stream" }
  );
  const pdffile = await new Promise<string>((resolve, reject) => {
    savefile.data
      .on("end", () => {
        console.log("drive download Complete.");
        const docBuffer = fs.readFileSync(`./src/files/preview/${resumeid}`);
        const pdffile = previewconvertDOCtoPDF(docBuffer, resumeid);
        resolve(pdffile);
        //  return pdffile
      })
      .on("error", (err) => {
        console.log("Error", err);
        reject(err);
      })
      .pipe(dest);
  });

  return pdffile;
};
export const getfromdrive = async (resumeid: string, folder_id) => {
  folder_id = "1f-1aP8fYFCHDxh4t4atVfe6brDpn0kc0";
  const get = await drive.files.list({
    q: ` '${folder_id}' in parents and name='${resumeid}'`,
    fields: "files(id, name)",
  });
  await drive.permissions.create({
    fileId: get.data.files[0].id,
    requestBody: {
      role: "reader",
      type: "anyone",
    },
  });
  // const returndata = await drive.files.get({
  //   fileId: get.data.files[0].id,
  //   // alt: 'media',
  //   fields: 'webViewLink , webContentLink'
  // })
  var dest = fs.createWriteStream(`./src/files/preview/${resumeid}`);
  const savefile = await drive.files.get(
    {
      fileId: get.data.files[0].id,
      alt: "media",
    },
    { responseType: "stream" }
  );
  savefile.data
    .on("end", () => {
      console.log("File download complete.");
    })
    .on("error", (err) => {
      console.log("Error", err);
    })
    .pipe(dest);
  return `${process.env.FILE_SERVE_PATH}/files/preview/${resumeid}`;
};
export const getfromdrivedata = async (resumeid: string) => {
  const folder_id = "1f-1aP8fYFCHDxh4t4atVfe6brDpn0kc0";
  const get = await drive.files.list({
    q: `  '${folder_id}' in parents and name='${resumeid}'`,
    fields: "files(id, name)",
  });

  await drive.permissions.create({
    fileId: get.data.files[0].id,
    requestBody: {
      role: "reader",
      type: "anyone",
    },
  });
  const returndata = await drive.files.get(
    {
      fileId: get.data.files[0].id,
      alt: "media",
      // fields: 'webViewLink , webContentLink'
    },
    { responseType: "stream" }
  );
  return streamToBuffer(returndata.data);
};
export const getfromdrivedatademo = async (resumeid: string, folder_id) => {
  folder_id = "1f-1aP8fYFCHDxh4t4atVfe6brDpn0kc0";
  const get = await drive.files.list({
    q: `  '${folder_id}' in parents and name='${resumeid}'`,
    fields: "files(id, name)",
  });
  const returndata = await drive.files.get(
    {
      fileId: get.data.files[0].id,
      alt: "media",
    },
    { responseType: "stream" }
  );
  return streamToBuffer(returndata.data);
};
const streamToBuffer = async (stream: Readable) => {
  const chunks: Uint8Array[] = [];
  return new Promise((resolve, reject) => {
    stream.on("data", (chunk: Uint8Array) => chunks.push(chunk));
    stream.on("error", (error) => reject(error));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
  });
};
