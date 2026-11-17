CREATE TABLE IF NOT EXISTS scores (
    sbd VARCHAR(20) PRIMARY KEY,
    toan NUMERIC(4,2) CHECK (toan BETWEEN 0 AND 10),
    ngu_van NUMERIC(4,2) CHECK (ngu_van BETWEEN 0 AND 10),
    ngoai_ngu NUMERIC(4,2) CHECK (ngoai_ngu BETWEEN 0 AND 10),
    vat_li NUMERIC(4,2) CHECK (vat_li BETWEEN 0 AND 10),
    hoa_hoc NUMERIC(4,2) CHECK (hoa_hoc BETWEEN 0 AND 10),
    sinh_hoc NUMERIC(4,2) CHECK (sinh_hoc BETWEEN 0 AND 10),
    lich_su NUMERIC(4,2) CHECK (lich_su BETWEEN 0 AND 10),
    dia_li NUMERIC(4,2) CHECK (dia_li BETWEEN 0 AND 10),
    gdcd NUMERIC(4,2) CHECK (gdcd BETWEEN 0 AND 10),
    ma_ngoai_ngu VARCHAR(10)
);