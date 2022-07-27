import * as oracledb from 'oracledb';
import { OutgoingQuery } from '../controllers/api/Outgoings';
import Database from '../services/Database';
import { QueryStringToSQLList, Sort } from '../services/utils/Web';

type OutgoingModel = {
    OUT_ID : number;
    VENDOR_CODE : number;
    TAX_ID : number;
    MAN_ID : number;
    QUANTITY : number;
    COST : number;
}

class Outgoings {
    private static findQuery : string = `
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
        let query : string = this.findQuery;
        let binds : oracledb.BindParameters = {};

        if (context.id) {
            binds.out_id = context.id;
            query += `\nand o.out_id = :out_id`;
        }
        if (context.vendor_code) {
            binds.vendor_code = QueryStringToSQLList(context.vendor_code);
            query += `\nand o.vendor_code in (:vendor_code)`;
        }

        if (context.manager) {
            binds.manager = context.manager;
            query += `\nand o.man_id in (${context.manager})`;
        }
        if (context.category) {
            //binds.category = QueryStringToSQLList(context.category);
            let categories : string = QueryStringToSQLList(context.category);
            //console.log(QueryStringToSQLList(context.category));
            query += `\nand c.cat_name in (${categories})`;
        }
        // If from or to will be empty?
        if (context.quantity) {
            binds.quantity_from = context.quantity.split(':')[0];
            binds.quantity_to = context.quantity.split(':')[1];
            query += `\nand (o.quantity >= :quantity_from and o.quantity <= :quantity_to)`;
        }
        if (context.cost) {
            binds.cost_from = context.cost.split(':')[0];
            binds.cost_to = context.cost.split(':')[1];
            query += `\nand (o.cost >= :cost_from and o.cost <= :cost_to)`;
        }
        // if (context.sort === undefined && context.sort !== []) {
        //     query += '\norder by o.out_id asc';
        // } else {
        //     query += '\norder by ';
        //     for (let i = 0; i < context.sort.length; i++) {
        //         const sorting : Sort = context.sort[i];
        //         if (i > 0) query += ', ';
        //         query += `${sorting.Column} ${sorting.Order}`;
        //     }
        //     /* if (!sortableColumns.includes(column)) {
        //         throw new Error('Invalid "sort" column');
        //     } */            
        // }
        if (context.skip) {
            binds.row_offset = context.skip;
            query += '\noffset :row_offset rows';
        }
        let limit = (+context.limit > 0) ? context.limit : 20;
        binds.row_limit = limit;
        query += '\nfetch next :row_limit rows only';
        const result : oracledb.Result<OutgoingModel> = await Database.Execute(query, binds);
        return result.rows;
    }

    private static countQuery : string = `
        select count(o.out_id) as ROWS_COUNT
        from ce_outgoing o, ce_managers m, ce_products p, ce_categories c, ce_statuses s, ce_taxes t
        where o.man_id =  m.man_id
            and o.vendor_code = p.vendor_code
            and p.cat_id = c.cat_id
            and o.out_id = s.out_id
            and (s.date_to is null or s.status_name = 'CANCELLED')
            and o.tax_id = t.tax_id
    `;

    public static async Count(context : OutgoingQuery) : Promise<number> {
        let query : string = this.countQuery;
        let binds : oracledb.BindParameters = {};

        const result : oracledb.Result<number> = await Database.Execute(query, binds);
        return result.rows[0]['ROWS_COUNT'];
    }
}

export default Outgoings;
export { Outgoings, OutgoingModel }