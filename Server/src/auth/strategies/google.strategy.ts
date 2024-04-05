// google.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { findorcreateuser } from 'src/helpers/firestore';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly authService: AuthService

  ) {
    super({
      clientID: process.env.Google_clientID,
      clientSecret: process.env.Google_clientSecret,
      callbackURL: process.env.Google_callbackURL,
      scope: ['email', 'profile'],
      prompt: 'select_account',
      proxy:true
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const user = {
      user_id :  uuidv4(),
      profile_id: profile.id,
      provider: profile.provider,
      name: profile.displayName,
      email: profile.emails?.[0].value,
      profilephoto: profile.photos?.[0].value,
      resume_id : null,
      resume_folder_id : null
    };
    
    const userCheck = await findorcreateuser(user);
    const jwtToken = await this.authService.generateJwtToken(userCheck);
    done(null, { jwtToken });
  }
}
