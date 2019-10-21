import { Get, Controller, Req, Query, Res } from '@nestjs/common';

@Controller('pv')
export class AppController {
  @Get('view')
  queryMethod(@Req() req, @Res() res): string {
    let baseStr = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVR42mNgAAIAAAUAAen63NgAAAAASUVORK5CYII=';
    res.header('Content-Type', 'image/png');
    var dataBuffer = new Buffer(baseStr, 'base64'); //把base64码转成buffer对象
    console.log(res)
    res.end(dataBuffer)
    return 'Hello World!';
  }
}
