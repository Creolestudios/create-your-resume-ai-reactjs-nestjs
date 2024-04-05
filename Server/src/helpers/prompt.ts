

export const get_aiSkills_prompt =  (jobdescription) =>{
  return (`

 Act as resume analyst and get skills list from this given job description - ${jobdescription}.
 give me only skills and not title for that and each skill must not be more than 3 words. 
 give skills separated by comma "," as below given format 
 strictly give in below given format:- 
 [skill,skill,skill,...]
 
 `);

//  job
//   based on this give job description -  ${jobdescription} , generate objective section for candidate resume.
  
//   strictly give in this string format : "candidate's objective description" 
//   dont give response more than 40 words 
//   In above format do not give title just give description of objective in string quotes.
}
export const get_aiAboutUs_prompt =  (jobdescription , rawResumeText) =>{
  return (`
  this is jobdescription :- ${jobdescription} and 
  this is resume data :- ${rawResumeText}.

  based on this give job description and resume data ,compare both efficiently and generate new objective section which is common based on both job description and resume data.
  
  compare years of experience of both and add that also in objective section 
  
  strictly give in this string format : "candidate's objective description" 
  dont give response more than 40 words 
  In above format do not give title just give description of objective in string quotes.
  `);
}
export const get_aiDetails_prompt =  (resume) =>{
  return (`

  Act as resume analyst and get name,designation,  email , phone or contact number , and address from this given resume - ${resume}.
  give me only name,designation,email,phone and address and not title for that .
  based on given resume generate designation of candidate based on his overall professional experience 
 
  
  strictly give in below given format and dont give additional text :- 
 
  [
  {
   "name" : name_from_resume,
   "email" : email_from_resume,
   "phone" : phone_from_resume,
   "address" : address_from_resume,
   "designation" : designation_based_on_resume
  }
 ]
  designation should not exceed more than 5 words 
  if any of field not present in resume then simply write "NO field present" for that field in that resume
 `);
}
export const get_aiExperience_prompt = (resume) => {
  return (`
    Act as resume analyst and get professional experience section from this given resume - ${resume}.
    give me only experience and not title for that. 

   
    strictly give in below given JSON format :- 
   
    [{
     "title" : title_of_experience_1,
     "date" : date_of_experience_1,
     "description" : description_of_experience_1
    },
    {
     "title" : title_of_experience_2,
     "date" : date_of_experience_2,
     "description" : description_of_experience_2
    },
    ...
   ]
    
    give description field in above format separated by ';' and rephrase description from resume to look more gramatical & good explanation
    if any of field not present in resume then simply write "NOT PRESENT" for that field in that resume
   `
   )
}
export const get_aiLanguages_prompt = (resume) => {
  return (`
    Act as resume analyst and get languages section from this given resume - ${resume}.
    give me only languages section and not title for that.


    strictly give in below given format and dont give additional text :- 
    
    [
      {
     "language" : "name_of_language",
     "fluency" :  "fluency_of_language"
    },
    {
      "language" : "name_of_language",
      "fluency" :  "fluency_of_language"
    }
  ]
    if language section is not present in given resume strictly give response as SECTION NOT FOUND 
    if any of field not present in resume then simply write "NO field present" for that field in that resume.
   `
   )
}
export const get_aiMilitary_prompt = (resume) => {
  return (`
    Act as resume analyst and get Military Experience section from this given resume - ${resume}.
    give me only Military Experience section and not title for that 
   
    strictly give in below given format :- 
   
    [{
     "title" : title_of_military_experience_1,
     "date" :  date_of_experience_1,
     "description" : description_of_experience_1
    },
    {
      "title" : title_of_military_experience_2,
      "date" :  date_of_experience_2,
      "description" : description_of_experience_2
    },
    ...
   ]
    strictly give only 5 objects in above array 
    if in above format  description is more than 5 words then rephrase that long description to shorter one with only 5 words.
    if no MILITARY SECTION is present in resume simply say "NOT section found" 
    if any of field not present in resume then simply write "NOT field present" for that field in that resume.
   `
   )
}
export const get_aiMilitary_prompt2 = (resume) => {
  return (`
    Act as resume analyst and get Military Experience section from this given below resume - ${resume}.
    give me only Military Experience section and not title for that 
    
    if no MILITARY SECTION is present in resume simply say "section NOT found" 
    if any of field not present in resume then simply write "field NOT present" for that field in that resume.
    strictly give in below given format :- 
   
    [{
     "title" : title_of_military_experience_1,
     "date" :  date_of_experience_1,
     "description" : description_of_experience_1
    },
    {
      "title" : title_of_military_experience_2,
      "date" :  date_of_experience_2,
      "description" : description_of_experience_2
    },
    ...
   ]
   give description field separated by ";"
    
    
   `
   )
}
export const get_resume_details = (resume) =>{
 return (`

 Act as resume analyst and get experience section from this given resume - ${resume}.
 give me only experience and not title for that 

 strictly give in below given format :- 

 [{
  title : title_of_experience_1,
  date : date_of_experience_1,
  description : description_of_experience_1
 },
 {
  title : title_of_experience_2,
  date : date_of_experience_2,
  description : description_of_experience_2
 },
 ...
]
  in above format for description field , give description separated by ';' 
 if any of field not present in resume then simply write "NO field present" for that field in that resume
 
 
 `);
}

//---------------------------------------------------------------------
export const get_aiEducation_prompt = (resume) =>{
  return (
    `
    act as resume analyst and get education section in give resume -  ${resume}.
    give me education section only and not title for that. 
    if not education section is found then simply say "no section found" 
    follow this below json format : 
    [{
      "title" : "course_of_education",
      "date" : "date_of_eduation",
      "college" : "college/institute_name",
      "marks" : "cgpa/percentage/cpi"
     },
     {
      "title" : "course_of_education",
      "date" : "date_of_eduation",
      "college" : "college/institute_name",
      "marks" : "cgpa/percentage/cpi"
     }
    ]

    do not generate any random response for any of above fields other than given resume 

    if no field is present in any above title,date,college,marks in given resume simply say "NO FIELD PRESENT"

    
    `
  )
}


export const get_aiAchievement_prompt = (resume) =>{
  return (
    `${resume} 

    from given above resume get me achievements done by candidate if any.
    give me only Achievements section and not title for that  
    give list of achievements separated by ";" 
    if there is no achievement is present  in given resume simply say "SECTION NOT FOUND"
    `
  )
}


export const get_aiAcademicCourse_prompt = (resume) =>{
  return (
    `
      Act as resume analyst and extract academic courses  section from given resume - ${resume}
      give only  course section but do not give title for that.
      give  course separated by ";".
      strictly check if no  section is found simply say "SECTION NOT FOUND" but dont genetrate by your own.     
    `
  )
}



export const get_aiSocialAct_prompt = (resume) => {
  return (
    `Act as resume analyst and extract any  volunteering  done by candidate from given resume - ${resume}
    give list separated by ';'
     check if no  section is found strictly give response as "SECTION NOT FOUND"
     `
  )
}

export const get_aiHobbies_prompt = (resume) => {
  return (
    `Act as resume analyst and extract hobbies section of  candidate mentioned in the given below resume & strictly check if no hobbies section  is mentioned in above resume then simply say "SECTION NOT FOUND" but do not generate hobbies on own - ${resume}
    give list  separated by ";" & do not give title for that.

    `
  )
}



// ------------------------OLD-------------------------

export const get_job_experience = (text) =>{
  return (
  `Act as resume analyst and  consider this ${text}  as resume and give me what is written professional experience or job experience.give only description and not title of professional experience.
  
  follow this below format for answer :
  [job experience title-1]: description of job experience title
  [job experience title-2]: description of job experience title
  [job experience title-3]: description of job experience title...
`);
}

export const get_job_experience_modified = (text) =>{
  return (
  `${text} take this above  as job experience and without modifying title , repharase the job experience details to more professional and enhanced text with detail of every single array element. dont change meaning but give description with good vocabulary and in details 

  follow this below format for answer :
  job experience title-1: description of job experience title
  job experience title-2: description of job experience title
  job experience title-3: description of job experience title...

`);
}


export const get_skills_prompt = (text) =>{
  return (
  `Act as resume analyst and  consider this ${text}  as resume and give me what is written under skills section. give that entire  skills section as given input.if keyword skills is mentioned exclude it 
`);
}

export const get_newskills_prompt = (text) =>{
  return (
  `  Act as resume analyst and  consider this ${text} text as job description and based on this give technical skills of user required.strictly  give atleast 10  skills as array of elements as ["skill1" , "skill2" , ...]    
`);
}


export const modified_jd_prompt = (jobdescription , getTextToChange) =>{
  return (
  ` ${jobdescription} consider this job description, extract skills mentioned from this job description. then take this skills format ${getTextToChange} and job description & give new skills format based on given job description. but format should be same as given.    
`);
}



export const check_about = (text) =>{
  return (
  `Act as resume analyst and  consider this ${text} text as candidate resume and tell me if any about section or any objective section or profile section of that candidate is present in resume or not. give response for only that section please strictly follow this format for response, if present ["ispresent" : "YES"] & if not present ["ispresent" : "NO"].  
  `);
}


export const get_oldabout_prompt = (text) =>{
  return (
    `Act as resume analyst and  consider this ${text} text as candidate resume and give me what is written under about/objective section . give that entire text  under about/objective section as given input strictly in this string format:
    about title : description of about section  . 
    `);
}



export const get_Newabout_prompt = (text) =>{
  return (
    `Act as resume analyst and  consider this ${text} as job description and based on this generate  objective or about section.strictly give answer in single paragraph with 8-10  words only.
    
    follow this format for answer :
    about section title : details of about section 
    `);
}

export const get_Newabout_prompt2 = (text) =>{
  return (
    `Act as resume analyst and  consider this ${text} text as candidate resume and based on this give technical objective of user.strictly give answer in string format only  
    `);
}