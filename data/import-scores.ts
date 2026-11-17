
import { createReadStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { fileURLToPath } from "node:url";
import pg from "pg";
import { from as copyFrom } from "pg-copy-streams";

const { Client } = pg;

const csvPath = fileURLToPath(
  new URL("./diem_thi_thpt_2024.csv", import.meta.url)
);

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is missing");
  }

  await client.connect();

  try {
    console.log("Connected to PostgreSQL");

    await client.query("BEGIN");

    await client.query(`
      CREATE TEMP TABLE scores_import
      (LIKE scores INCLUDING DEFAULTS)
      ON COMMIT DROP
    `);

    const copyStream = client.query(
      copyFrom(`
        COPY scores_import (
          sbd,
          toan,
          ngu_van,
          ngoai_ngu,
          vat_li,
          hoa_hoc,
          sinh_hoc,
          lich_su,
          dia_li,
          gdcd,
          ma_ngoai_ngu
        )
        FROM STDIN
        WITH (FORMAT CSV, HEADER TRUE, NULL '')
      `)
    );

    console.log("Reading CSV...");

    await pipeline(
      createReadStream(csvPath),
      copyStream
    );

    console.log("Updating database...");

    const result = await client.query(`
      INSERT INTO scores (
        sbd,
        toan,
        ngu_van,
        ngoai_ngu,
        vat_li,
        hoa_hoc,
        sinh_hoc,
        lich_su,
        dia_li,
        gdcd,
        ma_ngoai_ngu
      )
      SELECT
        sbd,
        toan,
        ngu_van,
        ngoai_ngu,
        vat_li,
        hoa_hoc,
        sinh_hoc,
        lich_su,
        dia_li,
        gdcd,
        ma_ngoai_ngu
      FROM scores_import
      ON CONFLICT (sbd)
      DO UPDATE SET
        toan = EXCLUDED.toan,
        ngu_van = EXCLUDED.ngu_van,
        ngoai_ngu = EXCLUDED.ngoai_ngu,
        vat_li = EXCLUDED.vat_li,
        hoa_hoc = EXCLUDED.hoa_hoc,
        sinh_hoc = EXCLUDED.sinh_hoc,
        lich_su = EXCLUDED.lich_su,
        dia_li = EXCLUDED.dia_li,
        gdcd = EXCLUDED.gdcd,
        ma_ngoai_ngu = EXCLUDED.ma_ngoai_ngu
    `);

    await client.query("COMMIT");

    console.log(
      `Import completed: ${result.rowCount} records processed`
    );
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error("Import failed:", error);
  process.exitCode = 1;
});
