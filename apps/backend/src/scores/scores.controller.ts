import { Controller, Get, Param } from '@nestjs/common'
import { ScoresService } from './scores.service.js'

@Controller('scores')
export class ScoresController {
    constructor(private readonly scoreService: ScoresService) {} 

    @Get(':sbd')
    findBySbd(@Param('sbd') sbd: string) {
        return this.scoreService.findBySbd(sbd);
    }
}