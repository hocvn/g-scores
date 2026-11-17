import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module.js';
import { ScoresModule } from './scores/scores.module.js';
import { ReportsModule } from './reports/reports.module.js';

@Module({
  imports: [PrismaModule, ScoresModule, ReportsModule],
})
export class AppModule {}