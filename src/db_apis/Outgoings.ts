import * as oracledb from 'oracledb';
import { OutgoingQuery } from '../controllers/api/Outgoings';
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
    private static baseQuery : string = `
        select o.out_id, m.man_id, m.first_name, m.last_name, m.patronymic, p.vendor_code, p.prod_name, c.cat_id, c.cat_name, s.status_name, t.tax_id, t.tax_name, cost, quantity
        from ce_outgoing o, ce_managers m, ce_products p, ce_categories c, ce_statuses s, ce_taxes t
        where o.man_id =  m.man_id
            and o.vendor_code = p.vendor_code
            and p.cat_id = c.cat_id
            and o.out_id = s.out_id
            and (s.date_to is null or s.status_name = 'CANCELLED')
            and o.tax_id = t.tax_id
    `;

    public static async Find(context : OutgoingQuery) : Promise<OutgoingModel[]> {
        let query : string = this.baseQuery;
        let binds : oracledb.BindParameters = {};

        if (context.id) {
            binds.out_id = context.id;
            query += `\nand o.out_id = :out_id`;
        }

        const result : oracledb.Result<OutgoingModel> = await Database.Execute(query, binds);
        return result.rows;
    }
}

export default Outgoings;
export { Outgoings, OutgoingModel }