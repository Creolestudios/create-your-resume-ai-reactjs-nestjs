import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { LazyresumeService } from "./lazyresume.service";
import { multerConfig } from "src/helpers/multer.config";
import { AuthGuard } from "@nestjs/passport";



import { PDFTODOCXPYTHON } from "src/helpers/fileconversion";

@Controller("lazyresume")
export class LazyresumeController {
  constructor(private readonly lazyresumeservice: LazyresumeService) {}

  @Get('pythonconvert')
  async pythonPdftoDoc(){

    const convertPdftoDoc = await  PDFTODOCXPYTHON("filename" , 'template_3');

    

  }

  @Post("uploadfile")
  // @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor("file", multerConfig))
  async uploadresume(
    @Req() req,
    @UploadedFile() file: Express.Multer.File
  ): Promise<any> {
    // const user_id = req.user.payload.user_id
    // const email = req.user.payload.email

    const email = "bharat.raj@creolestudios.com";
    const user_id = "a792e245-297e-4d70-9642-0fd445882157";

    return await this.lazyresumeservice.uploadresume(
      file.filename,
      user_id,
      email
    );
  }

  @Get("getexistresume")
  // @UseGuards(AuthGuard('jwt'))
  async checkResumeExist(@Req() req, @Res() res): Promise<void> {
    // const user_id = req.user.payload.user_id
    // const email = req.user.payload.email

    const email = "bharat.raj@creolestudios.com";
    const user_id = "a792e245-297e-4d70-9642-0fd445882157";
    const pdfFile = await this.lazyresumeservice.getUserResume(user_id, email);
    if (pdfFile == "NOFILE") {
      res.json({ message: "file does not extst" });
    } else {
      res.json({ message: "file exist", file: pdfFile });
    }
  }

  @Get("downloadhtmlres/:filetype/:template")
  // @UseGuards(AuthGuard('jwt'))
  async downloadHtmlRes(
    @Req() req : any,
    @Param("filetype") filetype: string,
    @Param("template") template: string
  ) {
    // const user_id = req.user.payload.user_id
    // const email = req.user.payload.email
    const email = "bharat.raj@creolestudios.com";
    const user_id = "a792e245-297e-4d70-9642-0fd445882157";
    const downloadLink = await this.lazyresumeservice.downloadHtmlRes(
      filetype,
      user_id,
      email,
      template
    );
    return downloadLink;
  }

  @Post("getresume")
  // @UseGuards(AuthGuard('jwt'))
  async getResume(@Req() req : any) {
    const jobdescription = req.body.jobdescription;
    const template = req.body.template;
    // const user_id = req.user.payload.user_id
    // const email = req.user.payload.email

    const email = "bharat.raj@creolestudios.com";
    const user_id = "a792e245-297e-4d70-9642-0fd445882157";

    return await this.lazyresumeservice.getResume(
      jobdescription,
      user_id,
      email,
      template
    );
  }
}
