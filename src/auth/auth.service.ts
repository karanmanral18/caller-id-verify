import { UserRepoService } from '@/user/user-repo/user-repo.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashEncryptService } from './hash-encrypt/hash-encrypt.service';

@Injectable()
export class AuthService {
  constructor(
    private userRepoService: UserRepoService,
    private jwtService: JwtService,
    private hashService: HashEncryptService,
  ) {}

  async validateUser(phone: string, password: string): Promise<any> {
    const user = await this.userRepoService.findUserByPhone(phone);
    // console.log(this.hashService.comparePassword(password, user.password));
    const isValidPassword = await this.hashService.comparePassword(
      password,
      user.password,
    );
    if (user && isValidPassword) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, phone: user.phone, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: any) {
    const registeredUser = await this.userRepoService.createNewUser(user);
    return registeredUser;
  }
}
