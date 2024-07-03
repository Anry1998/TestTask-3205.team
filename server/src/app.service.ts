import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GetUserDto } from './dto/get-user.dto';

const DB = [{
  email: 'jim@gmail.com',
  number: '221122'
  }, {
  email: 'jam@gmail.com',
  number: '830347'
  }, {
  email: 'john@gmail.com',
  number: '221122'
  }, {
  email: 'jams@gmail.com',
  number: '349425'
  }, {
  email: 'jams@gmail.com',
  number: '141424'
  }, {
  email: 'jill@gmail.com',
  number: '822287'
  }, {
  email: 'jill@gmail.com',
  number: '822286'
}]

@Injectable()
export class AppService {

   getUsers(dto: GetUserDto): Promise<GetUserDto[]>  {

    return new Promise<GetUserDto[]>((resolve, reject) => {
      setTimeout(() => {
        let result = []

        if(dto.number){
          for(let i =0; i<DB.length; i++){
            if(DB[i]["email"] == dto.email && DB[i]["number"] == dto.number) {
                result.push(DB[i])
            }
          }
          if (result.length < 1) {
            reject(new HttpException(`Информация по запросу отсутствует`, HttpStatus.BAD_REQUEST)) 
          }
          resolve(result) 
        }

        if(!dto.number) {
          for(let i =0; i<DB.length; i++){
            if(DB[i]["email"] == dto.email) {
                result.push(DB[i])
            }
          }
        }

        if (result.length < 1) {
          reject(new HttpException(`Информация по запросу отсутствует`, HttpStatus.BAD_REQUEST)) 
        }
      
        resolve(result)
      }, 3000)
    })
  }
}
