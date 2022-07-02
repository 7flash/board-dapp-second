import { ChiselEntity } from "@chiselstrike/api";
import { BBoard } from './BBoard';

export class ABanner extends ChiselEntity {
    title?: string;
    description?: string;
    board: BBoard;
}
