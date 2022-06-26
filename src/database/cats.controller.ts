import { Controller, Get, Post, Body, Delete, Param } from "@nestjs/common";
import { CatsService } from "./cats.service";
import { Cat } from "./cat.model";
import { HttpService } from '@nestjs/axios';
import { CreateCatDto } from '../dto/create-cat-dto';
@Controller("cats")
export class CatsController {

    constructor(
        private readonly httpService: HttpService,
        private readonly catsService: CatsService) { }

    @Get()
    async getCats(): Promise<Cat[] | null> {
        return await this.catsService.findAll();
    }

    @Post()
    async create(@Body() cat: Cat): Promise<Cat> {
        return await this.catsService.create(cat);
    }
    @Post('test')
    async test(@Body() createCatDto: CreateCatDto): Promise<any> {
        console.log(createCatDto.url)
        return createCatDto.url
    }
    @Post('analysis')
    async analysis(@Body() createCatDto: CreateCatDto): Promise<any> {
        var test = /vipmv.co/

        if (test.test(createCatDto.url)) {


            var cat: Cat
            var name: string
            var urlstr: string
            var jump1: string
            await this.httpService.get(createCatDto.url).toPromise().then(res => {
                var namepatt = /<title>(.*?)<\/title>/
                var pattern = /"url_next":"(.*?)"/
                name = namepatt.exec(res.data)[1]
                // console.log(pattern.exec(res.data)[1]);
                // console.log(res.data)
                jump1 = pattern.exec(res.data)[1]
            });;
            await this.httpService.get('https://xkys.ee/dp.php?url=' + jump1).toPromise().then(res => {
                // console.log(res.data)
                var pattern = /var url = "(.*?)"/
                console.log(pattern.exec(res.data)[1]);
                urlstr = pattern.exec(res.data)[1]
                //  return pattern.exec(res.data)[1];

            })
            cat = {
                "name": name,
                "url": urlstr
            }
            return await this.catsService.create(cat);
        } else {
            var cat: Cat
            cat = {
                "name": createCatDto.name,
                "url": createCatDto.url
            }
            return await this.catsService.create(createCatDto);
        }
    }
    @Delete(':sid')
    async delete(@Param() param: any): Promise<any> {
        console.log(param.sid)
        return await this.catsService.model.deleteOne({ _id: param.sid })

    }
}