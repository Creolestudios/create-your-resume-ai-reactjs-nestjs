import { Injectable, InternalServerErrorException } from "@nestjs/common";
import {
  getfromdrive,
  getfromdrivedata,
  getfromdrivedoc,
  savetodrive,
} from "src/helpers/googledrive";
import * as path from "path";
import { PDFTODOCXPYTHON, extractTextFromResumef } from "src/helpers/fileconversion";
import { getmyresumeid } from "src/helpers/firestore";
import {
  extractAboutUsOpenAi,
  extractAcademicCourseOpenAi,
  extractAchievementOpenAi,
  extractDetailsOpenAi,
  extractEducationOpenAi,
  extractExperienceOpenAi,
  extractHobbiesOpenAi,
  extractLanguagesOpenAi,
  extractMilitaryExpOpenAi,
  extractMilitaryExpOpenAi2,
  extractSkillsOpenAi,
  extractSocialActivityOpenAi,
} from "../helpers/newOpenAI";
import {
  getTemplate1Resume,
  getTemplate2Resume,
  getTemplate3Resume,
} from "src/helpers/htmlconvert";
const pdf = require("pdf-parse");

@Injectable()
export class LazyresumeService {
  async uploadresume(filename, userid, email) {
    try {
      return await savetodrive(filename, userid, email);
    } catch (error) {
      console.error("Error:", error);
      throw new InternalServerErrorException("An error occurred");
    }
  }

  async getUserResume(user_id: string, email: string) {
    const check = await getmyresumeid(user_id, email);
    if (check) {
      if (check.resume_id != "") {
        const ext = path.extname(check.resume_id);
        if (ext == ".pdf") {
          const getfile = await getfromdrive(check.resume_id, check.folder_id);
          return getfile;
        } else if (ext == ".doc" || ext == ".docx") {
          const getfile = await getfromdrivedoc(
            check.resume_id,
            check.folder_id
          );
          return getfile;
        }
      } else {
        return "NOFILE";
      }
    } else {
      return "NOFILE";
    }
  }

  async downloadHtmlRes(
    filetype: string,
    user_id: string,
    email: string,
    template: any
  ) {
    const userdata = await getmyresumeid(user_id, email);
    const getfilename = path.parse(userdata.resume_id).name;

    if (filetype == "pdf") {
      if (template == "template_1") {
        return `${process.env.FILE_SERVE_PATH}/files/download/template_1/${getfilename}.pdf`;
      } else if (template == "template_2") {
        return `${process.env.FILE_SERVE_PATH}/files/download/template_2/${getfilename}.pdf`;
      } else if (template == "template_3") {
        return `${process.env.FILE_SERVE_PATH}/files/download/template_3/${getfilename}.pdf`;
      } else {
        return "NO FILE";
      }
    } else if (filetype == "doc") {
      if (template == "template_1") {
        return `${process.env.FILE_SERVE_PATH}/files/download/template_1/${getfilename}.docx`;
      } else if (template == "template_2") {
        return `${process.env.FILE_SERVE_PATH}/files/download/template_2/${getfilename}.docx`;
      } else if (template == "template_3") {
        return `${process.env.FILE_SERVE_PATH}/files/download/template_3/${getfilename}.docx`;
      } else {
        return "NO FILE";
      }
    }
  }

  // get tailored resume
  async getResume(
    jobDescription: string,
    user_id: string,
    email: string,
    template: string
  ) {
    const getFileFirestore = await getmyresumeid(user_id, email);
    const filename = path.parse(getFileFirestore.resume_id).name;
    // console.log(filename);

    var getfile;
    var extractTextFromResume;
    if (getFileFirestore) {
      const ext = path.extname(getFileFirestore.resume_id);
      if (ext == ".doc" || ext == ".docx") {
        getfile = await getfromdrivedata(getFileFirestore.resume_id);
        
        extractTextFromResume = await extractTextFromResumef(getfile);
      } else if (ext == ".pdf") {
        getfile = await getfromdrivedata(getFileFirestore.resume_id);
        getfile = await pdf(getfile);
        extractTextFromResume = await getfile.text;
      }
    }

    const rawResumeText = await extractTextFromResume.replace(
      /^\s*[\r\n]/gm,
      ""
    );
    // return rawResumeText;

    if (template == "template_2") {


        /// get aboutUs
        const extractAboutUs = await extractAboutUsOpenAi(jobDescription , rawResumeText);
        // return extractAboutUs


      /// get languages
      const extractLanguages = await extractLanguagesOpenAi(rawResumeText);
      // return extractLanguages

    

      /// get Military Experience
      // const extractMilitaryExp = await extractMilitaryExpOpenAi(rawResumeText);
      // return extractMilitaryExp

      

      /// get skills
      const extractSkills = await extractSkillsOpenAi(jobDescription);
      // return extractSkills

      

      ///get Details
      const extractDetails = await extractDetailsOpenAi(rawResumeText);
      // return extractDetails

      ///get Experience
      const extractExperience = await extractExperienceOpenAi(rawResumeText);
      // return extractExperience

      const getMyResume = await getTemplate2Resume(
        filename,
        extractSkills,
        extractAboutUs,
        extractDetails,
        extractExperience,
        extractLanguages
      );
      // const convertPdftoDoc = await  PDFTODOCXPYTHON(filename , 'template_2');
      // console.log(convertPdftoDoc);
      return getMyResume;
    }

    if (template == "template_1") {

       /// get Education
       const extractEducation = await extractEducationOpenAi(rawResumeText);
      //  return extractEducation;
      
      
       /// get Academic Course
       const extractAcademicCourse = await extractAcademicCourseOpenAi(
        rawResumeText
      );
      // return extractAcademicCourse;
      // console.log(extractAcademicCourse);

       /// get Achievements
       const extractAchievements = await extractAchievementOpenAi(rawResumeText);
      //  return extractAchievements


     

      /// get Experience
      const extractExperience = await extractExperienceOpenAi(rawResumeText);
      // return extractExperience;

      /// get AboutMe
      const extractAboutUs = await extractAboutUsOpenAi(jobDescription , rawResumeText);
      //  return extractAboutUs;

     

     

      ///get Details
      const extractDetails = await extractDetailsOpenAi(rawResumeText);
      // return extractDetails;

      /// get Skills
      const extractSkills = await extractSkillsOpenAi(jobDescription);
      // return extractSkills;

      const getMyResume = await getTemplate1Resume(
        filename,
        extractAboutUs,
        extractDetails,
        extractExperience,
        extractSkills,
        extractEducation,
        extractAchievements,
        extractAcademicCourse
      );
      // const convertPdftoDoc = await  PDFTODOCXPYTHON(filename , 'template_1');
      // console.log(convertPdftoDoc);
      return getMyResume;

      // return 'http://192.168.1.135:3000/files/download/169641444973576547-1696414449735.pdf'
    }

    if (template == "template_3") {

       ///get Details
       const extractDetails = await extractDetailsOpenAi(rawResumeText);
      //  return extractDetails;

       /// get languages
       const extractLanguages = await extractLanguagesOpenAi(rawResumeText);
      //  return extractLanguages

      /// get Education
      const extractEducation = await extractEducationOpenAi(rawResumeText);
      // return extractEducation;

      ///get Experience
      const extractExperience = await extractExperienceOpenAi(rawResumeText);
      //  return extractExperience

       /// get Skills
       const extractSkills = await extractSkillsOpenAi(jobDescription);
      //  return extractSkills;

      /// get SocialActivities
      const extractSocialActivity = await extractSocialActivityOpenAi(
        rawResumeText
      );
      // return extractSocialActivity;

     


      

      /// get Hobbies
      const extractHobbies = await extractHobbiesOpenAi(rawResumeText);
      // return extractHobbies;

    

      

      /// get Military Experience
      // const extractMilitaryExp = await extractMilitaryExpOpenAi2(rawResumeText);
      // return extractMilitaryExp


      const getMyResume = await getTemplate3Resume(
        filename,
        extractDetails,
        extractSkills,
        extractLanguages,
        extractExperience,
        extractEducation,
        extractHobbies,
        extractSocialActivity
      );

      // const convertPdftoDoc = await  PDFTODOCXPYTHON(filename , 'template_3');

      // console.log(convertPdftoDoc);
        
      return getMyResume;
    }
  }



  
}
