import { Injectable, PipeTransform } from '@nestjs/common';
import { UserRepoService } from '../../user/user-repo/user-repo.service';
import { UserModel } from '../../database/models/user.model';

@Injectable()
export class MapToUserPipe implements PipeTransform {
  constructor(private userRepo: UserRepoService) {}

  transform(value: number): Promise<UserModel> {
    return this.userRepo.findOrFail(value);
  }
}
