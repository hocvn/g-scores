import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module.js';
import { ScoresModule } from './scores/scores.module.js';

@Module({
  imports: [PrismaModule, ScoresModule],
})
export class AppModule {}