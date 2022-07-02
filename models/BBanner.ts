import { ChiselEntity } from "@chiselstrike/api";
import { ABoard } from './ABoard';

export class BBanner extends ChiselEntity {
    title?: string;
    description?: string;
    board: ABoard;
}
