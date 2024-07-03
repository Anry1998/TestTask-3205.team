import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { GetUserDto } from './dto/get-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/getusers')
  getUsers(@Body() dto: GetUserDto) {
    return this.appService.getUsers(dto);
  }
}
