// auth.service.ts
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  async generateJwtToken(payload: any): Promise<string> {
    return this.jwtService.sign(payload);
  }
}
