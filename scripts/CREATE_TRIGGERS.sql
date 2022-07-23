-- Trigger for adding new blank row in CE_STOCK table after creating a new product
CREATE OR REPLACE TRIGGER CE_STOCK_NEW_PRODUCT
AFTER INSERT ON CE_PRODUCTS
FOR EACH ROW
BEGIN
    INSERT INTO CE_STOCK(VENDOR_CODE, QUANTITY) VALUES(:NEW.VENDOR_CODE, 0);
END;
/

-- Trigger for adding items to stock
CREATE OR REPLACE TRIGGER CE_STOCK_ADD_PRODUCT
AFTER INSERT ON CE_INCOMING
FOR EACH ROW
BEGIN
    UPDATE CE_STOCK
    SET QUANTITY = QUANTITY + :NEW.QUANTITY
    WHERE VENDOR_CODE = :NEW.VENDOR_CODE;
END;
/

-- Trigger for removing items from stock
CREATE OR REPLACE TRIGGER CE_STOCK_REMOVE_PRODUCT
AFTER INSERT ON CE_OUTGOING
FOR EACH ROW
BEGIN
    UPDATE CE_STOCK
    SET QUANTITY = QUANTITY - :NEW.QUANTITY
    WHERE VENDOR_CODE = :NEW.VENDOR_CODE;
END;
/

-- Trigger not allowing to sell more items than are in stock
CREATE OR REPLACE TRIGGER CE_CHECK_STOCK_PRODUCT
BEFORE INSERT ON CE_OUTGOING
FOR EACH ROW
DECLARE
    in_stock NUMBER;
    not_enough_items_in_stock EXCEPTION;
BEGIN
    SELECT ST.QUANTITY INTO in_stock FROM CE_STOCK ST
    WHERE ST.VENDOR_CODE = :NEW.VENDOR_CODE;
    IF (:NEW.QUANTITY > in_stock) THEN
        RAISE not_enough_items_in_stock;
    END IF;
    EXCEPTION
        WHEN not_enough_items_in_stock THEN
            RAISE_APPLICATION_ERROR(-20001, 'Not enough items in stock');
END;
/

-- Trigger logging new outgoings
CREATE OR REPLACE TRIGGER CE_LOGGING_OUTGOINGS
AFTER INSERT ON CE_OUTGOING
FOR EACH ROW
BEGIN
    INSERT INTO CE_LOG(MAN_ID, OUT_ID, LOG_DATE, LOG_ACTION) VALUES(:NEW.MAN_ID, :NEW.OUT_ID, SYSDATE, 'CREATE');
END;
/

-- Trigger closing previous status
CREATE OR REPLACE TRIGGER CE_CLOSE_PREV_STATUS
BEFORE INSERT ON CE_STATUSES
FOR EACH ROW
BEGIN
    UPDATE CE_STATUSES
    SET DATE_TO = SYSDATE
    WHERE OUT_ID = :NEW.OUT_ID AND DATE_TO IS NULL; 
END;
/

-- Trigger logging changing status for outgoings
CREATE OR REPLACE TRIGGER CE_LOGGING_STATUSES
AFTER INSERT ON CE_STATUSES
FOR EACH ROW
DECLARE
    manager NUMBER;
    action VARCHAR2(64);
BEGIN
    SELECT MAN_ID INTO manager FROM CE_OUTGOING
    WHERE OUT_ID = :NEW.OUT_ID;
    IF (:NEW.STATUS_NAME = 'CANCELLED') THEN
        action := 'CANCEL';
    ELSE
        action := 'CHANGE STATUS';
    END IF;
    INSERT INTO CE_LOG(MAN_ID, OUT_ID, LOG_DATE, LOG_ACTION) VALUES(manager, :NEW.OUT_ID, SYSDATE, action);
END;
/

-- Trigger for evaluating cost of outgoing
CREATE OR REPLACE TRIGGER CE_EVAL_COST
BEFORE INSERT ON CE_OUTGOING
FOR EACH ROW
DECLARE
    price NUMBER;
BEGIN
    SELECT PROD_VALUE INTO price FROM CE_PRICES
    WHERE VENDOR_CODE = :NEW.VENDOR_CODE
        AND (DATE_TO IS NULL OR DATE_TO <= SYSDATE);
    :NEW.COST := price * :NEW.QUANTITY;
END;
/

-- Trigger closing prices
CREATE OR REPLACE TRIGGER CE_CLOSE_PREV_PRICE
BEFORE INSERT ON CE_PRICES
FOR EACH ROW
BEGIN
    UPDATE CE_PRICES
    SET DATE_TO = :NEW.DATE_FROM
    WHERE VENDOR_CODE = :NEW.VENDOR_CODE AND DATE_TO IS NULL; 
END;
/
