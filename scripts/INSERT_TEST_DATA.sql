INSERT INTO CE_TAXES(TAX_NAME, TAX_VALUE) VALUES('Test', 0.01);
INSERT INTO CE_CATEGORIES(CAT_NAME) VALUES('Test');
INSERT INTO CE_MANAGERS(FIRST_NAME, LAST_NAME, PERCENT, HIRE_DATE) VALUES('Test', 'Test', 0.05, SYSDATE);
INSERT INTO CE_PRODUCTS(VENDOR_CODE, PROD_NAME, CAT_ID) VALUES(100000, 'Test', 1);
INSERT INTO CE_PRICES(VENDOR_CODE, DATE_FROM, PROD_VALUE) VALUES(100000, SYSDATE, 1000);
INSERT INTO CE_INCOMING(VENDOR_CODE, TAX_ID, MAN_ID, INC_DATE, QUANTITY, COST) VALUES(100000, 1, 1, SYSDATE, 30, 20000);
INSERT INTO CE_OUTGOING(VENDOR_CODE, TAX_ID, MAN_ID, QUANTITY, COST) VALUES(100000, 1, 1, 10, 16000);
INSERT INTO CE_OUTGOING(VENDOR_CODE, TAX_ID, MAN_ID, QUANTITY, COST) VALUES(100000, 1, 1, 15, 16000);
INSERT INTO CE_STATUSES(OUT_ID, DATE_FROM, STATUS_NAME) VALUES(2, SYSDATE, 'Test');
