import { Outgoing } from "../Models";

class StatusDTO {
    outgoing?: Outgoing;
    dateFrom?: Date;
    dateTo?: Date;
    status?: string;
}

export default StatusDTO;