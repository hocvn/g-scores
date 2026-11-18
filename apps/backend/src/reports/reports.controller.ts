import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseEnumPipe,
  Query,
} from "@nestjs/common";

import { ReportsService } from "./reports.service.js";
import { ReportSubject } from "./types/report-subject.js";

@Controller("reports")
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get("subject-distribution")
  getSubjectDistribution() {
    return this.reportsService.getSubjectDistribution();
  }

  @Get("top-group-a")
  getTopGroupA() {
    return this.reportsService.getTopGroupA();
  }

  @Get("score-spectrum")
  getScoreSpectrum(
    @Query(
      "subject",
      new DefaultValuePipe(ReportSubject.TOAN),
      new ParseEnumPipe(ReportSubject),
    )
    subject: ReportSubject,
  ) {
    return this.reportsService.getScoreSpectrum(subject);
  }
}
