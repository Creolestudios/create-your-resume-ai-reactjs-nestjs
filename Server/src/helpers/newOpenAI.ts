import  OpenAI  from 'openai';
import { get_aiAboutUs_prompt, get_aiAcademicCourse_prompt, get_aiAchievement_prompt, get_aiDetails_prompt, get_aiEducation_prompt, get_aiExperience_prompt, get_aiHobbies_prompt, get_aiLanguages_prompt, get_aiMilitary_prompt, get_aiMilitary_prompt2, get_aiSkills_prompt, get_aiSocialAct_prompt, get_resume_details } from './prompt';


const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});
import * as dotenv from 'dotenv'
dotenv.config();


export const extractContentOpenAi = async(resume) =>{

  const prompt = get_resume_details(resume);
  const completion = await  openai.completions.create({
    model: 'gpt-3.5-turbo-instruct',
    prompt: prompt,
    max_tokens:2000,
    temperature: 0,
  });

  
  // console.log(completion.choices[0]);
  
  return completion.choices[0].text
  // console.log(completion.choices[0]);
}
export const extractSkillsOpenAi = async(jobDescription) =>{
  
  const prompt = get_aiSkills_prompt(jobDescription);
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant.",
      },

      {
        role: "assistant",
        content: prompt,
      },
    ],
    model: "gpt-3.5-turbo",
    temperature: 1,
  });

  
  var skills =  (completion.choices[0].message.content).replace(/\[|\]/g, '');
  return  skills.split(',');
  



  // const prompt = get_aiSkills_prompt(jobDescription);
  // const completion = await  openai.completions.create({
  //   model: 'gpt-3.5-turbo-instruct',
  //   prompt: prompt,
  //   max_tokens:2000,
  //   temperature: 0.7,
  // });
  // const replacebrack = (completion.choices[0].text).replace(/\[|\]/g, '');
  // const skills=replacebrack.split(',');
  // return skills
}
export const extractAboutUsOpenAi =  async (jobDescription,rawResumeText) =>{
  const prompt = get_aiAboutUs_prompt(jobDescription , rawResumeText);
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant.",
      },

      {
        role: "assistant",
        content: prompt,
      },
    ],
    model: "gpt-4",
    temperature: 1,
  });

  var aboutme =  completion.choices[0].message.content;
  aboutme = aboutme.trim();
  aboutme = aboutme.slice(1, -1);
  return aboutme; 
  
  
  // const prompt = get_aiAboutUs_prompt(jobDescription);
  // const completion = await  openai.completions.create({
  //   model: 'gpt-3.5-turbo-instruct',
  //   prompt: prompt,
  //   max_tokens:2000,
  //   temperature: 1,
  // });
  // // console.log(completion.choices[0].text);
  
  // const text = `${completion.choices[0].text}`
  // const trimmedString = text.trim();

  // // const stringWithoutQuotes = trimmedString.substring(1, text.length - 1);
  // // const replacedText =text.replace(/^"|"$/g, '')
  // const stringWithoutQuotes = trimmedString.slice(1, -1);
  // return stringWithoutQuotes
}
export const extractDetailsOpenAi =  async (resume) =>{

  const prompt = get_aiDetails_prompt(resume);
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant.",
      },

      {
        role: "assistant",
        content: prompt,
      },
    ],
    model: "gpt-3.5-turbo",
    temperature: 0,
    
  });

  console.log(completion.choices[0].message.content);
  
  const myDetails  = JSON.parse(completion.choices[0].message.content);
  console.log(myDetails);
  
  return myDetails;

  

//   const prompt = get_aiDetails_prompt(resume);
//   const completion = await  openai.completions.create({
//     model: 'gpt-3.5-turbo-instruct',
//     prompt: prompt,
//     max_tokens:2000,
//     temperature: 0,
//   });
  
//  const myDetails  = JSON.parse(completion.choices[0].text);
//  const nameindex =   (myDetails.name).indexOf('NO');
//  const emailindex =  (myDetails.email).indexOf('NO');
//  const phoneindex =  (myDetails.phone).indexOf('NO');
//  const addressindex =  (myDetails.address).indexOf('NO');
//  const designationindex = (myDetails.designation).indexOf('NO');

//  const SplitArr = []

//  var name,email,phone,address,designation = '' ;
//  if(nameindex == -1){  }

//  const obj = {
//   name : ,
//   email : ,
//   phone : ,
//   address : ,
//   designation : ,
//  }
// const obj = {
  
//     name : "name_from_resume",
//     email : "email_from_resume",
//     phone : "NO PHONE",
//     address : "address_from_resume",
//     designation : "designation_based_on_resume"
   
// }

// SplitArr.push(obj);
 return myDetails; 
}
export const extractExperienceOpenAi =  async (resume) =>{
   
  const prompt = get_aiExperience_prompt(resume);
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant.",
      },

      {
        role: "assistant",
        content: prompt,
      },
    ],
    model: "gpt-4",
    temperature: 0.1,
    
  });
  
  var experience = completion.choices[0].message.content;
  console.log(experience);
  const regex = /\[[^[\]]*\]/g;
  const matches = experience.match(regex);

  // return matches;
  if(isJSONString(matches[0])){
    experience = JSON.parse(matches[0])
  }
  // console.log(experience);
  return experience;
 
 
 
 
//   const prompt = get_aiExperience_prompt(resume);
//   const completion = await  openai.completions.create({
//     model: 'gpt-3.5-turbo-instruct',
//     prompt: prompt,
//     max_tokens:2000,
//     temperature: 0,
//   });
//  const experience  = JSON.parse(completion.choices[0].text)
//   return experience;
}
export const extractLanguagesOpenAi =  async (resume) =>{

  const prompt = get_aiLanguages_prompt(resume);
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant.",
      },

      {
        role: "assistant",
        content: prompt,
      },
    ],
    model: "gpt-3.5-turbo",
    temperature: 0,
  });
  var language = completion.choices[0].message.content

  if(isJSONString(language)){
     language = JSON.parse(completion.choices[0].message.content)
  }
  console.log(language);
  return language;






  // const prompt = get_aiLanguages_prompt(resume);
  // const completion = await  openai.completions.create({
  //   model: 'gpt-3.5-turbo-instruct',
  //   prompt: prompt,
  //   max_tokens:2000,
  //   temperature: 0,
  // });
  // console.log(completion.choices[0].text);
  // console.log(JSON.parse(completion.choices[0].text));
  
//  const languages  = JSON.parse(completion.choices[0].text)
  // return languages;
}
export const extractMilitaryExpOpenAi =  async (resume) =>{
  const prompt = get_aiMilitary_prompt(resume);
  const completion = await  openai.completions.create({
    model: 'gpt-3.5-turbo-instruct',
    prompt: prompt,
    max_tokens:2000,
    temperature: 0,
  });
  console.log(completion.choices[0].text);
  
  const index =  (completion.choices[0].text).indexOf("NOT");
  console.log(typeof(index));
  
  if(index == -1){
    const experience  = JSON.parse(completion.choices[0].text)
    return experience;
  }
  return { msg : 'NO'}
}
export const extractMilitaryExpOpenAi2 =  async (resume) =>{
  const prompt = get_aiMilitary_prompt2(resume);
  const completion = await  openai.completions.create({
    model: 'gpt-3.5-turbo-instruct',
    prompt: prompt,
    max_tokens:2000,
    temperature: 0,
  });
  // console.log(completion.choices[0].text);
  return JSON.parse(completion.choices[0].text)
  const index =  (completion.choices[0].text).indexOf("NOT");
  
  if(index == -1){
    const experience  = JSON.parse(completion.choices[0].text);
    return experience;
  }
  return { msg : 'NO'}
}


//<<<<<<<<<<<<<<<<<<<<< Template-1 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


export const extractEducationOpenAi =  async (resume) => {

  const prompt = get_aiEducation_prompt(resume);
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant.",
      },

      {
        role: "assistant",
        content: prompt,
      },
    ],
    model: "gpt-4",
    temperature: 0,
    
  });
  
  var education = completion.choices[0].message.content;
  console.log(education);
  // return education;
  const regex = /\[[^[\]]*\]/g;
  var matches = [];
  matches = education.match(regex);
  console.log(matches);
  
  // return matches;
  if(matches && isJSONString(matches[0])){
    education = JSON.parse(matches[0])
  }
  console.log(education);
  return education;


  // const prompt = get_aiEducation_prompt(resume);
  // const completion = await  openai.completions.create({
  //   model: 'gpt-3.5-turbo-instruct',
  //   prompt: prompt,
  //   max_tokens:2000,
  //   temperature: 0,
  // });
  // // console.log(completion.choices[0].text);
  
  // const education  = JSON.parse(completion.choices[0].text)
  // return education;
}


export const extractAchievementOpenAi =  async (resume) => {
  const prompt = get_aiAchievement_prompt(resume);
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant.",
      },

      {
        role: "assistant",
        content: prompt,
      },
    ],
    model: "gpt-3.5-turbo",
    temperature: 0,
    
  });
  var achievement = completion.choices[0].message.content;
  const  achievements =  (achievement).split(';');
  return achievements

//   const prompt = get_aiAchievement_prompt(resume);
//   const completion = await  openai.completions.create({
//     model: 'gpt-3.5-turbo-instruct',
//     prompt: prompt,
//     max_tokens:2000,
//     temperature: 0,
//   });
// //  const education  = JSON.parse(completion.choices[0].text)
//   const achievement =  (completion.choices[0].text).split(';');
  
//   return achievement;
}


export const extractAcademicCourseOpenAi =  async (resume) => {

  const prompt = get_aiAcademicCourse_prompt(resume);
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant.",
      },

      {
        role: "assistant",
        content: prompt,
      },
    ],
    model: "gpt-3.5-turbo",
    temperature: 1,
    
  });
  const academic =  (completion.choices[0].message.content).split(';');
  console.log(academic);
  
  return academic;
//   const prompt = get_aiAcademicCourse_prompt(resume);
//   const completion = await  openai.completions.create({
//     model: 'gpt-3.5-turbo-instruct',
//     prompt: prompt,
//     // max_tokens:2000,
//     temperature: 0,
//   });
// //  const education  = JSON.parse(completion.choices[0].text)
// const academic =  (completion.choices[0].text).split(';');  
// return academic;
}

export const extractAcademicCourseOpenAi22 =  async (resume) => {

  const prompt = get_aiAcademicCourse_prompt(resume);
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant.",
      },

      {
        role: "assistant",
        content: prompt,
      },
    ],
    model: "gpt-3.5-turbo",
    temperature: 1,
    
  });
  const academic =  (completion.choices[0].message.content).split(';');
  console.log(academic);
  
  return academic;
//   const prompt = get_aiAcademicCourse_prompt(resume);
//   const completion = await  openai.completions.create({
//     model: 'gpt-3.5-turbo-instruct',
//     prompt: prompt,
//     // max_tokens:2000,
//     temperature: 0,
//   });
// //  const education  = JSON.parse(completion.choices[0].text)
// const academic =  (completion.choices[0].text).split(';');  
// return academic;
}

//<<<<<<<<<<<<<<<<<<<<<<<<< Template-3 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export const extractSocialActivityOpenAi = async (resume) => {
  // console.log(resume);
  
  const prompt = get_aiSocialAct_prompt(resume);
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant.",
      },

      {
        role: "assistant",
        content: prompt,
      },
    ],
    model: "gpt-4",
    temperature: 0,
  });

  // console.log(completion.choices[0].message.content);
  const check =  (completion.choices[0].message.content).indexOf('SECTION NOT FOUND')
  var socialactivity = (completion.choices[0].message.content).split(';');
  // console.log(socialactivity[0]);
  
  return socialactivity;



  // if(isJSONString(socialactivity)){
  //   socialactivity = JSON.parse(completion.choices[0].message.content)
  // }
  
  // console.log(completion.choices[0].message.content);


//   const prompt = get_aiSocialAct_prompt(resume);
//   const completion = await  openai.completions.create({
//     model: 'gpt-3.5-turbo-instruct',
//     prompt: prompt,
//     max_tokens:2000,
//     temperature: 0,
//   });
// //  const education  = JSON.parse(completion.choices[0].text)
// const socialAct =  (completion.choices[0].text).split(';');  
// return socialAct;
}

export const extractHobbiesOpenAi = async (resume) => {

  const prompt = get_aiHobbies_prompt(resume);
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant.",
      },

      {
        role: "assistant",
        content: prompt,
      },
    ],
    model: "gpt-4",
    temperature: 0,
  });
  const Hobbies =  (completion.choices[0].message.content).split(';');  
  // console.log(completion.choices[0].message.content);
  // const check =  (completion.choices[0].message.content).indexOf('SECTION NOT FOUND')
  // var socialactivity = (completion.choices[0].message.content).split(';');
  // console.log(socialactivity[0]);
  
  return Hobbies;
  // console.log(resume);
  
//   const prompt = get_aiHobbies_prompt(resume);
//   const completion = await  openai.completions.create({
//     model: 'gpt-3.5-turbo-instruct',
//     prompt: prompt,
//     max_tokens:2000,
//     temperature: 0,
//   });
// //  const education  = JSON.parse(completion.choices[0].text)
// const Hobbies =  (completion.choices[0].text).split(';');  
// return Hobbies;
}


function isJSONString(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (error) {
    return false;
  }
}
