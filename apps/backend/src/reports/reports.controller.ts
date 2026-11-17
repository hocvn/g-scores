import { Controller, Get } from '@nestjs/common';
import { ReportsService } from './reports.service.js';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('subject-distribution')
  getSubjectDistribution() {
    return this.reportsService.getSubjectDistribution();
  }

  @Get('top-group-a')
  getTopGroupA() {
    return this.reportsService.getTopGroupA();
  }
}