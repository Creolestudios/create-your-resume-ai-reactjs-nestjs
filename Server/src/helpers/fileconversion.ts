// import { Word } from "pdf-officegen";
import * as JSZip from "jszip";
var mammoth = require("mammoth");
const path = require("path");
const fs = require("fs").promises;
const libre = require("libreoffice-convert");
import * as child_process  from 'child_process'

// export const convertPDFtoDOCX = async (pdfPath, docxPath) => {
//   const options = {
//     pageRanges: ["1", "3"],
//     ignoreWatermarks: true,
//     ignoreAnnotations: true,
//     imageQuality: 100,
//   };
//   const p = new Word();
//   // console.log(p);
//   const pdfpath2 = "./src/files/upload/resume.pdf";
//   const pdfBuffer = await fs.readFile(pdfpath2);

//   // console.log(pdfBuffer);
//   const h = p.convertFromPdf(pdfBuffer, options, (err, result) => {
//     console.log(result);
//     fs.writeFile("./src/files/upload/new.docx", result, (err) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log("File saved successfully");
//       }
//     });
//   });
//   return h;
// };

export const convertDOCtoPDF = async (docxBuf) => {
  libre.convertAsync = require("util").promisify(libre.convert);
  const ext = ".pdf";
  const outputPath = `src/mod${ext}`;
  let pdfBuf = await libre.convertAsync(docxBuf, ext, undefined);
  await fs.writeFile(outputPath, pdfBuf);
};

export const previewconvertDOCtoPDF = async (docxBuf, filename) => {
  const fname = path.parse(filename).name;
  libre.convertAsync = require("util").promisify(libre.convert);
  const ext = ".pdf";
  const outputPath = `./src/files/preview/${fname}${ext}`;
  let pdfBuf = await libre.convertAsync(docxBuf, ext, undefined);
  await fs.writeFile(outputPath, pdfBuf);
  return `${process.env.FILE_SERVE_PATH}/files/preview/${fname}${ext}`;
};

export const previewconvertDOCtoPDF2 = async (docxBuf, filename) => {
  try {
    const fname = path.parse(filename).name;
    libre.convertAsync = require("util").promisify(libre.convert);
    const ext = ".pdf";
    const outputPath = `./src/files/tailored/${fname}${ext}`;
    let pdfBuf = await libre.convertAsync(docxBuf, ext, undefined);
    await fs.writeFile(outputPath, pdfBuf);
    return `${process.env.FILE_SERVE_PATH}/files/tailored/${fname}${ext}`;
  } catch (error) {
    const fname = path.parse(filename).name;
    const ext = ".pdf";
    return `${process.env.FILE_SERVE_PATH}/files/preview/${fname}${ext}`;
  }
};

export const extractTextFromResumef = async (file) => {
  var options = {
    buffer: file,
  };
  const filedata = await mammoth.extractRawText(options);
  const data = filedata.value;
  return data;
};



export const PDFTODOCXPYTHON = async (filename , filepath) => {
  console.log(filename);
  console.log(filepath);
  
  return new Promise((resolve, reject) => {
    const pythonProcess = child_process.spawn('python3', ['pdftodocx.py',filename , filepath]);
    pythonProcess.stdout.on('data', (data) => {
      resolve(filename);
    });
    pythonProcess.on('close', (code) => { 
    });
  });
}


