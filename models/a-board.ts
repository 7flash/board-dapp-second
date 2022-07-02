import { ChiselEntity, unique } from "@chiselstrike/api";

export class Board extends ChiselEntity {
    @unique date: string;
}
