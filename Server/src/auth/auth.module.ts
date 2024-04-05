// auth.module.ts
import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { GoogleStrategy } from "./strategies/google.strategy";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LinkedInStrategy } from "./strategies/linkedin.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";
import * as dotenv from "dotenv";
dotenv.config();
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "7d" },
    }),
  ],
  providers: [AuthService, GoogleStrategy, LinkedInStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtStrategy],
})
export class AuthModule {}
