# create-your-resume-ai-reactjs-nestjs
Got an old resume and need to apply urgently? Just upload your existing resume, copy the job description where you are applying, sit back and relax till this application will tailor a job specific resume for you which you can download in PDF or docx. 



## LazyResumes (Tailor CV as per need)

## Table of Contents

1. [Introduction](#1-introduction)
2. [Project Overview](#2-project-overview)
3. [Getting Started](#3-getting-started)
4. [Code Structure](#4-code-structure)
5. [Dependencies](#5-dependencies)
6. [Deployment](#6-deployment)
7. [Usage](#7-usage)


## 1. Introduction

Welcome to our innovative web application designed to revolutionize the resume customization process. Say goodbye to manual tweaking – upload your CV, provide the job description, and let our tool dynamically adjust sections like education, experience, and skills for a perfect fit every time.


## 2. Project Overview

Introducing our cutting-edge web application: effortlessly tailor your resume to specific job descriptions with just a few clicks. Simply upload your CV in PDF or DOCX format, input the desired job description, and watch as our tool optimizes sections such as education, experience, skills, and more. Streamline your job application process and stand out from the crowd with personalized resumes tailored to each opportunity.


## 3. Getting Started

To get started with the Lazyresumes App, follow these steps:

### Prerequisites

Make sure you have the following installed:

- A modern web browser (e.g., Chrome, Firefox, Safari)
- An internet connection (for fetching external dependencies)
- Node.js and npm installed 

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Creolestudios/create-your-resume-ai-reactjs-nestjs.git
   ```

2. **Navigate to the Project Directory:**

   ```bash
   cd create-your-resume-ai-reactjs-nestjs
   ```

3. **Client and Server Setup**

   * Create and Add credentials in .env file 

   ```
    PORT=3000

    # Google Cred
    Google_clientID=
    Google_clientSecret=
    Google_callbackURL=

    JWT_SECRET=YOUR_JWT_SECRET
    OPENAI_API_KEY=
    FILE_SERVE_PATH=

    
    GOOGLE_DRIVE_PRIVATE_KEY=
    GOOGLE_DRIVE_SERVICE_EMAIL=

   ```

   ## Client Setup

   ```
   npm install 

   npm start 

   ```


   ## Server Setup


   ```
   npm install 

   npm run start:dev

   ```




## 4. Code Structure

The project follows a modular and organized structure to enhance readability, maintainability, and scalability. Key components include:

- **ReactJs** The main structure of the web page designed using React Framework.
- **NodeJs** Backend Logic written in nodejs, Logic for handling user interactions, getting transcript , and giving summary as Situations, Challenges, Risks, Impacts and Solutions.
- **OpenAI** Using OpenAI api key to get summary of Situations, Challenges, Risks, Impacts and Solutions from transcript.

## 5. Dependencies

- **LangChain** NLP based library which provides easy integration of openai with our data 
- **OpenAI** Provides different text based models like gpt-3.5,gpt-4,text-ada-embedding



## 6. Deployment

The LazyResume App is deployed and accessible online. You can use the following link to access the application: [LazyResumes](http://lazyresumes.com/)

## 7. Usage

1. **Login Using Google or LinkedIn:**
   - Need to login either using google signin or linkedin signin

2. **Upload CV or resumes:**
   - click on upload cv button and upload CV/resume.

3. **Add Job Description:**
   - then add job descriptions which suits your needs .

4. **Click on Tailor Resume:**
   - Click on tailor my resume button which will redirect us to next page.

5. **Select Templates to convert:**
   - Select any of 3 templates to convert to.

6. **Download selected template:**
   - After converting template we can download that template as pdf or docx format.
