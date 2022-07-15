import { responseFromJson as response } from "@chiselstrike/api";
import { Banner } from "../models/b-banner";
export default async function chisel(req) {
    if (req.method == "POST") {
        const payload = await req.json();
        try {
            if (payload.xPosition < 0 || payload.xPosition + payload.rectWidth > 10) {
                throw 'unexpected x coordinates';
            }
            if (payload.yPosition < 0 || payload.yPosition + payload.rectHeight > 25) {
                throw 'unexpected y coordinates';
            }
            const banner = Banner.build({
                ...payload
            });
            await banner.save();
            return response({
                ...banner
            });
        } catch (e) {
            return response(e.toString(), 500);
        }
    } else if (req.method == "GET") {
        const date = new URLSearchParams(req.url.substring(req.url.indexOf('?'))).get('.date');
        let banners;
        if (date) {
            banners = await Banner.findMany((v)=>{
                return v.date == date;
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
};
