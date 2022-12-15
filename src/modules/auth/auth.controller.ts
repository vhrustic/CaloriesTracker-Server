import {
Body,
Controller,
Get,
HttpCode,
HttpStatus,
Post,
Request,
UseGuards
} from '@nestjs/common';
import { UserDto } from '../user/dto/user.dto';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async userLogin(
    @Body() userLoginDto: UserLoginDto,
  ): Promise<LoginResponseDto> {
    const userEntity = await this.authService.validateUser(userLoginDto);
    const token = await this.authService.createToken(userEntity);

    return new LoginResponseDto(new UserDto(userEntity), token);
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  getCurrentUser(@Request() req): UserDto {
    return req.user;
  }
}
