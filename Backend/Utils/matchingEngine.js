import itemModel from "../Models/item.model.js";
import { sendMail } from "./sendMail.js";




export const runMatchingEngine = async (item) => {
    try {
        const CONFIDENCE_THRESHOLD = 0.7;
        console.log(item)
        const { type, location, date, description } = item;

        const oppositeType = type === 'LOST' ? 'FOUND' : "LOST";
        console.log(type)
        const nearbyItems = await itemModel.find(
            {
                type: oppositeType,
                location: {
                    $nearSphere: {
                        $geometry: { type: 'Point', coordinates: location.coordinates },
                        $maxDistance: 5000
                    }
                }
            }
        );

        console.log("Near BY Items", nearbyItems)
        for (let candidate of nearbyItems) {
            console.log('In For of Loop !');
            let score = 0;

            // Location score (already filtered by distance)
            score += 0.5;

            // Type/category match
            if (item.category === candidate.category) score += 0.2;
            console.log(score)
            // Date similarity (within ±7 days)
            const diffDays = Math.abs(new Date(item.Date) - new Date(candidate.Date)) / (1000 * 60 * 60 * 24);
            if (diffDays <= 7) score += 0.3;

            if (score >= CONFIDENCE_THRESHOLD) {
                console.log('Email !')
                const info = await sendMail(candidate.email, item.email);
                console.log(info)
            }
        }



    } catch (error) {

    }
}