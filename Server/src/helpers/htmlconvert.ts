import { render } from "ejs";
import puppeteer from "puppeteer";
import * as path from "path";
import * as fs from "fs/promises";
// const templeatePath = 'src/helpers/htmlTemplates/template_1.ejs'
var convertapi = require('convertapi')('AuGWN4XFLslRHcWRr');
export const getResumeFromHtml = async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();

  const templatePath = "src/helpers/htmlTemplates/template_1.ejs";
  const filepath = path.resolve(__dirname, "..", "..", "src/files/download/");
  const filename = generateUniqueId() + "-" + new Date().getTime() + ".pdf";
  const outputPath = filepath + "/" + filename;

  const dynamicData = {
    username: "bharat",
  };

  // Render the EJS template with dynamic data
  const templateContent = await fs.readFile(templatePath, "utf-8");
  // const compiledTemplate = ejs.compile(templateContent);
  // const renderedHTML = compiledTemplate(dynamicData);
  const renderedHTML = render(templateContent, dynamicData);
  // Set the rendered HTML content for the page
  await page.setContent(renderedHTML);
  // Generate the PDF
  await page.pdf({ path: outputPath, format: "A4", printBackground: true });
  // Close the browser
  await browser.close();

  return `${process.env.FILE_SERVE_PATH}/files/downloads/${filename}`;
};

export const getTemplate1Resume = async (
  resumefilename,
  aboutUs,
  myDetails,
  experience,
  skills,
  education,
  achievement,
  academic
) => {
  const ext = [".pdf"];

  for (let i = 0; i < ext.length; i++) {
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();

    const templatePath = "src/helpers/htmlTemplates/template_1.ejs";
    const filepath = path.resolve(
      __dirname,
      "..",
      "..",
      "src/files/download/template_1"
    );
    const filename = generateUniqueId() + "-" + new Date().getTime() + ".pdf";
    const outputPath = filepath + "/" + resumefilename + ext[i];

    const dynamicData = {
      aboutUs,
      myDetails,
      experience,
      skills,
      education,
      achievement,
      academic,
    };
    const footerTemplate = `
    <div style="text-align: center; font-size: 12px;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>
  `;

    // Render the EJS template with dynamic data
    const templateContent = await fs.readFile(templatePath, "utf-8");
    // const compiledTemplate = ejs.compile(templateContent);
    // const renderedHTML = compiledTemplate(dynamicData);
    const renderedHTML = render(templateContent, dynamicData);
    // Set the rendered HTML content for the page
    await page.setContent(renderedHTML);
    // Generate the PDF
    await page.pdf({ path: outputPath, format: "A4", printBackground: true , 
    margin: {                   // Optional: Page margins.
      top: '15mm',
      right: '10mm',
      bottom: '10mm',
      left: '10mm',
    },
    footerTemplate
  });
    // Close the browser
    await browser.close();
  }

  const pdffilepath = path.resolve(
    __dirname,
    "..",
    "..",
    "src/files/download/template_1"
  );
  //   convertapi.convert('docx', { 
  //     File: pdffilepath + "/" + resumefilename+'.pdf'
  // }, 'pdf').then(function(result) {
  //       result.saveFiles(pdffilepath + "/" + resumefilename+'.docx');
  //     });

  return `${process.env.FILE_SERVE_PATH}/files/download/template_1/${resumefilename}.pdf`;
};

export const getTemplate2Resume = async (
  resumefilename,
  skills,
  aboutMe,
  extractDetails,
  experience,
  languages
) => {
  const ext = [".pdf"];

  for (let i = 0; i < ext.length; i++) {
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();

    const templatePath = "src/helpers/htmlTemplates/template_2.ejs";
    const filepath = path.resolve(
      __dirname,
      "..",
      "..",
      "src/files/download/template_2"
    );
    const filename = generateUniqueId() + "-" + new Date().getTime() + ".pdf";
    const outputPath = filepath + "/" + resumefilename + ext[i];

    const dynamicData = {
      skills,
      aboutMe,
      extractDetails,
      experience,
      languages,
    };

    // Render the EJS template with dynamic data
    const templateContent = await fs.readFile(templatePath, "utf-8");
    // const compiledTemplate = ejs.compile(templateContent);
    // const renderedHTML = compiledTemplate(dynamicData);
    const renderedHTML = render(templateContent, dynamicData);
    // Set the rendered HTML content for the page
    await page.setContent(renderedHTML);
    // Generate the PDF
    await page.pdf({ path: outputPath, format: "A4", printBackground: true ,
    margin: {                   // Optional: Page margins.
      top: '15mm',
      right: '10mm',
      bottom: '10mm',
      left: '10mm',
    },
  });
    // Close the browser
    await browser.close();
  }

  const pdffilepath = path.resolve(
    __dirname,
    "..",
    "..",
    "src/files/download/template_2"
  );
  //   convertapi.convert('docx', { 
  //     File: pdffilepath + "/" + resumefilename+'.pdf'
  // }, 'pdf').then(function(result) {
  //       result.saveFiles(pdffilepath + "/" + resumefilename+'.docx');
  //     });

  return `${process.env.FILE_SERVE_PATH}/files/download/template_2/${resumefilename}.pdf`;
};

export const getTemplate3Resume = async (
  resumefilename,
  details,
  skills,
  language,
  experience,
  education,
  hobbies,
  socialActivity
) => {

  const ext = [".pdf"];
  for (let i = 0; i < ext.length; i++) {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();

  const templatePath = "src/helpers/htmlTemplates/template_3.ejs";

  const filepath = path.resolve(
    __dirname,
    "..",
    "..",
    "src/files/download/template_3"
  );


  const imagePath = process.env.FILE_SERVE_PATH + "/files";
  const filename = generateUniqueId() + "-" + new Date().getTime() + ".pdf";
  const outputPath = filepath + "/" + resumefilename + ext[i];

  const dynamicData = {
    imagePath,
    details,
    skills,
    language,
    experience,
    education,
    hobbies,
    socialActivity
  };

  // Render the EJS template with dynamic data
  const templateContent = await fs.readFile(templatePath, "utf-8");
  // const compiledTemplate = ejs.compile(templateContent);
  // const renderedHTML = compiledTemplate(dynamicData);
  const renderedHTML = render(templateContent, dynamicData);
  // Set the rendered HTML content for the page
  await page.setContent(renderedHTML);
  // Generate the PDF
  await page.pdf({ path: outputPath, format: "A4", printBackground: true ,

  margin: {                   // Optional: Page margins.
    top: '15mm',
    right: '10mm',
    bottom: '10mm',
    left: '10mm',
  },

});
  // Close the browser
  await browser.close();
 }
 const pdffilepath = path.resolve(
  __dirname,
  "..",
  "..",
  "src/files/download/template_3"
);
//   convertapi.convert('docx', { 
//     File: pdffilepath + "/" + resumefilename+'.pdf'
// }, 'pdf').then(function(result) {
//       result.saveFiles(pdffilepath + "/" + resumefilename+'.docx');
//     });




  return `${process.env.FILE_SERVE_PATH}/files/download/template_3/${resumefilename}.pdf`;
};

function generateUniqueId() {
  const timestamp = new Date().getTime().toString();
  const randomPart = Math.random().toString().substr(2, 5); // Generate a random number and take a substring

  const uniqueId = timestamp + randomPart;
  return uniqueId;
}
