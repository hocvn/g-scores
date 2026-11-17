import { Injectable } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async getSubjectDistribution() {
    const subjects = [
      'toan',
      'ngu_van',
      'ngoai_ngu',
      'vat_li',
      'hoa_hoc',
      'sinh_hoc',
      'lich_su',
      'dia_li',
      'gdcd',
    ] as const;

    const result = await Promise.all(
      subjects.map(async (subject) => {
        const rows = await this.prisma.$queryRaw<
          {
            excellent: bigint;
            good: bigint;
            average: bigint;
            weak: bigint;
          }[]
        >(Prisma.sql`
          SELECT
            COUNT(*) FILTER (WHERE ${Prisma.raw(`"${subject}"`)} >= 8) AS excellent,
            COUNT(*) FILTER (
              WHERE ${Prisma.raw(`"${subject}"`)} >= 6
                AND ${Prisma.raw(`"${subject}"`)} < 8
            ) AS good,
            COUNT(*) FILTER (
              WHERE ${Prisma.raw(`"${subject}"`)} >= 4
                AND ${Prisma.raw(`"${subject}"`)} < 6
            ) AS average,
            COUNT(*) FILTER (
              WHERE ${Prisma.raw(`"${subject}"`)} < 4
            ) AS weak
          FROM scores
        `);

        const row = rows[0];

        return {
          subject,
          excellent: Number(row.excellent),
          good: Number(row.good),
          average: Number(row.average),
          weak: Number(row.weak),
        };
      }),
    );

    return result;
  }

  async getTopGroupA() {
    const rows = await this.prisma.$queryRaw<
      {
        sbd: string;
        toan: Prisma.Decimal;
        vat_li: Prisma.Decimal;
        hoa_hoc: Prisma.Decimal;
        total: Prisma.Decimal;
      }[]
    >`
      SELECT
        sbd,
        toan,
        vat_li,
        hoa_hoc,
        (toan + vat_li + hoa_hoc) AS total
      FROM scores
      WHERE
        toan IS NOT NULL
        AND vat_li IS NOT NULL
        AND hoa_hoc IS NOT NULL
      ORDER BY total DESC, sbd ASC
      LIMIT 10
    `;

    return rows.map((row) => ({
      sbd: row.sbd,
      toan: Number(row.toan),
      vat_li: Number(row.vat_li),
      hoa_hoc: Number(row.hoa_hoc),
      total: Number(row.total),
    }));
  }
}