import { IsNull, LessThanOrEqual, MoreThan } from "typeorm";
import { Outgoing } from "../models/Models";
import Status from "../models/status/Status";
import StatusDTO from "../models/status/StatusDTO";
import StatusMapper from "../models/status/StatusMapper";

class StatusService {
    public async findLatest(outgoingId: number): Promise<Status> {
        const result = Status.findOne({
            where: {
                outgoingId,
                dateTo: IsNull()
            }
        });
        return result;
    }

    public async findActualOn(outgoingId: number, date: Date): Promise<Status> {
        const result = Status.findOne({
            where: [
                {
                    outgoingId,
                    dateFrom: LessThanOrEqual(date),
                    dateTo: MoreThan(date)
                },
                {
                    outgoingId,
                    dateFrom: LessThanOrEqual(date),
                    dateTo: IsNull()
                }
            ]
        });
        return result;
    }

    public async findAll(outgoingId: number): Promise<Status[]> {
        const result = Status.find({
            where: {
                outgoingId
            }
        });
        return result;
    }

    public async create(dto: StatusDTO): Promise<Status> {
        const status = StatusMapper.toDomain(dto);
        await Status.save(status);

        return status;
    }

    public async update(outgoingId: number): Promise<Status> {
        throw new Error('Not inmplemented');
    }

    public async cancel(outgoingId: number): Promise<Status> {
        throw new Error('Not inmplemented');
    }

    private async closePrevious(outgoingId: number): Promise<Status> {
        throw new Error('Not inmplemented');
    }
}

export default new StatusService();