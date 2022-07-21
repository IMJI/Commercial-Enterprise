DROP TABLE CE_TAXES CASCADE CONSTRAINTS;
CREATE TABLE CE_TAXES(
    TAX_ID NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) PRIMARY KEY NOT NULL,
    TAX_NAME VARCHAR2(64) NOT NULL,
    TAX_VALUE NUMBER(3, 2) NOT NULL
);

DROP TABLE CE_CATEGORIES CASCADE CONSTRAINTS;
CREATE TABLE CE_CATEGORIES(
    CAT_ID NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) PRIMARY KEY NOT NULL,
    CAT_NAME VARCHAR2(64) NOT NULL
);

DROP TABLE CE_MANAGERS CASCADE CONSTRAINTS;
CREATE TABLE CE_MANAGERS(
    MAN_ID NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) PRIMARY KEY NOT NULL,
    FIRST_NAME VARCHAR2(64) NOT NULL,
    LAST_NAME VARCHAR2(64) NOT NULL,
    PATRONYMIC VARCHAR2(64),
    PERCENT NUMBER(3, 2) NOT NULL,
    HIRE_DATE DATE NOT NULL,
    DISMISSAL_DATE DATE,
    PARENT_ID NUMBER
);

ALTER TABLE CE_MANAGERS
ADD CONSTRAINT CE_MANAGERS_PARENTS_FK
FOREIGN KEY(PARENT_ID)
REFERENCES CE_MANAGERS(MAN_ID);

DROP TABLE CE_PRODUCTS CASCADE CONSTRAINTS;
CREATE TABLE CE_PRODUCTS(
    VENDOR_CODE NUMBER(16) PRIMARY KEY NOT NULL,
    PROD_NAME VARCHAR2(64) NOT NULL,
    CAT_ID NUMBER NOT NULL,
    COLOR VARCHAR2(64),
    PROD_SIZE VARCHAR2(64),
    PROD_DESC VARCHAR2(50)
);

ALTER TABLE CE_PRODUCTS
ADD CONSTRAINT CE_PRODUCTS_CATEGORIES_FK
FOREIGN KEY(CAT_ID)
REFERENCES CE_CATEGORIES(CAT_ID);

DROP TABLE CE_PRICES CASCADE CONSTRAINTS;
CREATE TABLE CE_PRICES(
    VENDOR_CODE NUMBER(16) NOT NULL,
    DAY_FROM DATE NOT NULL,
    DAY_TO DATE,
    PROD_VALUE NUMBER(10, 2) NOT NULL,
    PRIMARY KEY (VENDOR_CODE, DAY_FROM)
);

ALTER TABLE CE_PRICES
ADD CONSTRAINT CE_PRICES_PRODUCTS_FK
FOREIGN KEY(VENDOR_CODE)
REFERENCES CE_PRODUCTS(VENDOR_CODE);

DROP TABLE CE_INCOMING CASCADE CONSTRAINTS;
CREATE TABLE CE_INCOMING(
    INC_ID NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) PRIMARY KEY NOT NULL,
    VENDOR_CODE NUMBER(16) NOT NULL,
    TAX_ID NUMBER,
    MAN_ID NUMBER NOT NULL,
    INC_DATE DATE NOT NULL,
    QUANTITY NUMBER(8) NOT NULL,
    COST NUMBER(16, 2) NOT NULL
);

ALTER TABLE CE_INCOMING
ADD CONSTRAINT CE_INCOMING_PRODUCTS_FK
FOREIGN KEY(VENDOR_CODE)
REFERENCES CE_PRODUCTS(VENDOR_CODE);

ALTER TABLE CE_INCOMING
ADD CONSTRAINT CE_INCOMING_TAXES_FK
FOREIGN KEY(TAX_ID)
REFERENCES CE_TAXES(TAX_ID);

ALTER TABLE CE_INCOMING
ADD CONSTRAINT CE_INCOMING_MANAGERS_FK
FOREIGN KEY(MAN_ID)
REFERENCES CE_MANAGERS(MAN_ID);

DROP TABLE CE_OUTGOING CASCADE CONSTRAINTS;
CREATE TABLE CE_OUTGOING(
    OUT_ID NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) PRIMARY KEY NOT NULL,
    VENDOR_CODE NUMBER(16) NOT NULL,
    TAX_ID NUMBER,
    MAN_ID NUMBER NOT NULL,
    -- OUT_DATE DATE NOT NULL,
    QUANTITY NUMBER(8) NOT NULL,
    COST NUMBER(16, 2) NOT NULL
);

ALTER TABLE CE_OUTGOING
ADD CONSTRAINT CE_OUTGOING_PRODUCTS_FK
FOREIGN KEY(VENDOR_CODE)
REFERENCES CE_PRODUCTS(VENDOR_CODE);

ALTER TABLE CE_OUTGOING
ADD CONSTRAINT CE_OUTGOING_TAXES_FK
FOREIGN KEY(TAX_ID)
REFERENCES CE_TAXES(TAX_ID);

ALTER TABLE CE_OUTGOING
ADD CONSTRAINT CE_OUTGOING_MANAGERS_FK
FOREIGN KEY(MAN_ID)
REFERENCES CE_MANAGERS(MAN_ID);


DROP TABLE CE_STATUSES CASCADE CONSTRAINTS;
CREATE TABLE CE_STATUSES(
    OUT_ID NUMBER NOT NULL,
    DATE_FROM DATE NOT NULL,
    DATE_TO DATE,
    STATUS_NAME VARCHAR2(64) NOT NULL,
    PRIMARY KEY(OUT_ID, DATE_FROM)
);

ALTER TABLE CE_STATUSES
ADD CONSTRAINT CE_STATUSES_OUTGOINGS_FK
FOREIGN KEY(OUT_ID)
REFERENCES CE_OUTGOING(OUT_ID);

DROP TABLE CE_USERS CASCADE CONSTRAINTS;
CREATE TABLE CE_USERS (
   USR_ID NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) PRIMARY KEY NOT NULL,
   MAN_ID NUMBER,
   USR_ROLE VARCHAR2(16) NOT NULL,
   USR_PASSWORD VARCHAR2(256) NOT NULL,
   CONSTRAINT CE_CHECK_ROLE CHECK (USR_ROLE in ('MANAGER', 'ADMIN'))
);

ALTER TABLE CE_USERS
ADD CONSTRAINT CE_USERS_MANAGERS_FK
FOREIGN KEY(MAN_ID)
REFERENCES CE_MANAGERS(MAN_ID);

DROP TABLE CE_LOG CASCADE CONSTRAINTS;
CREATE TABLE CE_LOG(
    MAN_ID NUMBER NOT NULL,
    OUT_ID NUMBER NOT NULL,
    LOG_DATE DATE NOT NULL,
    LOG_ACTION VARCHAR2(64) NOT NULL
);

ALTER TABLE CE_LOG
ADD CONSTRAINT CE_LOG_MANAGERS_FK
FOREIGN KEY(MAN_ID)
REFERENCES CE_MANAGERS(MAN_ID);

ALTER TABLE CE_LOG
ADD CONSTRAINT CE_LOG_OUTGOINGS_FK
FOREIGN KEY(OUT_ID)
REFERENCES CE_OUTGOING(OUT_ID);

DROP TABLE CE_STOCK CASCADE CONSTRAINTS;
CREATE TABLE CE_STOCK(
    VENDOR_CODE NUMBER NOT NULL,
    QUANTITY NUMBER(8) NOT NULL
);

ALTER TABLE CE_STOCK
ADD CONSTRAINT CE_STOCK_PRODUCTS_FK
FOREIGN KEY(VENDOR_CODE)
REFERENCES CE_PRODUCTS(VENDOR_CODE);
