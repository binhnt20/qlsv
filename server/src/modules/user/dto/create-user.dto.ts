import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  Length,
  Matches,
} from 'class-validator';
import { passwordRegex, usernameRegex } from '../constants/regex';
import { UserGender, UserRole } from '../enums/user.enum';

export class CreateUserDto {
  @Length(6, 32)
  @Matches(usernameRegex, {
    message:
      'Username must contains at least 6 letter, no space, no special letters',
  })
  username: string;

  @Length(6, 32)
  @Matches(passwordRegex, {
    message: 'Password must contains at least 1 number and uppercase letter',
  })
  password: string;

  @IsOptional()
  fullname: string;

  @IsOptional()
  @IsEnum(UserGender)
  gender: UserGender;

  @IsOptional()
  @IsDateString()
  birthday: Date;

  @IsEnum(UserRole)
  role: UserRole;

  @IsOptional()
  @IsPhoneNumber()
  phoneNumber: string;
}
