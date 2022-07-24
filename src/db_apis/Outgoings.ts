import * as oracledb from 'oracledb';
import Database from '../services/Database';

type OutgoingModel = {
    OUT_ID : number;
    VENDOR_CODE : number;
    TAX_ID : number;
    MAN_ID : number;
    QUANTITY : number;
    COST : number;
}

class Outgoings {
    private static baseQuery : string = `SELECT * FROM CE_OUTGOING`;

    public static async Find(context : object) : Promise<OutgoingModel[]> {
        let query : string = this.baseQuery;
        let binds : oracledb.BindParameters = {};
        const result : oracledb.Result<OutgoingModel> = await Database.Execute(query, binds);
        return result.rows;
    }
}

export default Outgoings;
export { Outgoings, OutgoingModel }