import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service.js'

@Injectable()
export class ScoresService {
    constructor(private readonly prisma: PrismaService) {}

    async findBySbd(sbd: string) {
        const student = await this.prisma.scores.findUnique({
            where: { sbd },
        });
        
        if (!student) {
            throw new NotFoundException(
                `Student with ${sbd} not found`
            )
        }
        
        return student
    }
}