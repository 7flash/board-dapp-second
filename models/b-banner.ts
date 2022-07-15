import { ChiselEntity } from "@chiselstrike/api";
import { Board } from './a-board';

export class Banner extends ChiselEntity {
    title?: string;
    description?: string;
    pictureUrl?: string;
    rectHeight: number;
    rectWidth: number;
    xPosition: number;
    yPosition: number;
    color?: string;
    date?: string;
    // board: Board;
}