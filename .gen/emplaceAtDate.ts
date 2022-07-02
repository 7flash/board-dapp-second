import { responseFromJson as response } from "@chiselstrike/api";
import { BBanner } from "../models/BBanner";
import { ABoard } from "../../models/ABoard";
export default async function chisel(req) {
    if (req.method !== "PUT") {
        return response("four hundred five", 405);
    }
    const { date  } = await req.json();
    try {
        const board = await ABoard.findOne((v)=>v.date === date
        );
        const banner = BBanner.build({
            board: board
        });
        await banner.save();
        return response({
            ...banner
        });
    } catch (e) {
        return response(e, 500);
    }
};
