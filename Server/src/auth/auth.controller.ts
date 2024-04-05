// auth.controller.ts
import { Controller, Get, Query, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request, Response } from "express";

@Controller("auth")
export class AuthController {
  /// signIn With Google Implementation
  @Get("google")
  @UseGuards(AuthGuard("google"))
  async googleAuth() {}

  @Get("google/callback")
  @UseGuards(AuthGuard("google"))
  googleAuthCallback(@Req() req: any, @Res() res: Response) {
    const { jwtToken } = req.user as { jwtToken: string };
    res.redirect(`${process.env.FRONTEND_URL}?query=${jwtToken}`);
  }

  /// signIn with LinkedIn Implementation
  @Get("linkedin")
  @UseGuards(AuthGuard("linkedin"))
  async linkedInLogin() {}

  @Get("linkedin/callback")
  @UseGuards(AuthGuard("linkedin"))
  async linkedInCallback(@Req() req: any, @Res() res: Response) {
    const { jwtToken } = req.user as { jwtToken: string };
    res.redirect(`${process.env.FRONTEND_URL}?query=${jwtToken}`);
  }
}
