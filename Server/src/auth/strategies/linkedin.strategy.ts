import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-linkedin-oauth2';
import { v4 as uuidv4 } from 'uuid';
import { AuthService } from '../auth.service';
import { VerifyCallback } from 'jsonwebtoken';
import { findorcreateuser } from 'src/helpers/firestore';



@Injectable()
export class LinkedInStrategy extends PassportStrategy(Strategy, 'linkedin') {
  constructor(private readonly authService: AuthService, ) {
    super({
  clientID: process.env.Linkedin_clientID,
  clientSecret: process.env.Linkedin_clientSecret,
  callbackURL: process.env.Linkedin_callbackURL,
  scope: ['r_emailaddress', 'r_liteprofile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any ,done: VerifyCallback,): Promise<any> {
    const user = {
          user_id :  uuidv4(),
          profile_id: profile.id,
          provider : profile.provider,
          name: profile.displayName,
          email: profile.emails[0].value,
          resume_id : null , 
          resume_folder_id : null
      };
      const userCheck = await findorcreateuser(user);
      const jwtToken = await this.authService.generateJwtToken(userCheck);
      done(null, { jwtToken });
  }
}
