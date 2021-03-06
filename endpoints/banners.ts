import { responseFromJson as response, ChiselRequest } from "@chiselstrike/api";
import { Banner } from "../models/b-banner";
import { Board } from "../models/a-board";

export default async function chisel(req: ChiselRequest) {
    if (req.method == "POST") {
        const payload = await req.json();

        try {
            // const board = await Board.findOne((v) => v.date === payload.date);
    
            // if (!board) {
            //     throw 'board not found at date ' + payload.date;
            // }

            // TODO: check intersections

            if (payload.xPosition < 0 || payload.xPosition + payload.rectWidth > 10) {
                throw 'unexpected x coordinates';
            }

            if (payload.yPosition < 0 || payload.yPosition + payload.rectHeight > 25) {
                throw 'unexpected y coordinates';
            }

            // delete payload.date;

            const banner = Banner.build({
                // board: board,
                ...payload,
            });
    
            await banner.save();
    
            return response({
                ...banner,
            });
        } catch (e) {
            return response(e.toString(), 500);
        }
    } else if (req.method == "GET") {
        const date = new URLSearchParams(
            req.url.substring(req.url.indexOf('?'))
        ).get('.date');

        let banners;

        if (date) {
            // TODO: sort by actual date..
            // await Banner.cursor().filter(v => {
            //     return v.board.date == date;
            // }).sortBy("createdAt", true);

            banners = await Banner.findMany(v => {
                return v.date == date;
                // return v.board.date == date;
            });
        } else {
            banners = await Banner.findAll();
        }

        return response({
            banners
        });
    } else {
        return response("four hundred five", 405);
    }
}

// export default BBanner.crud();