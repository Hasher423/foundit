import itemModel from "../Models/item.model.js";
import { sendMail } from "./sendMail.js";




export const runMatchingEngine = async (item) => {
    try {
        const CONFIDENCE_THRESHOLD = 0.7;
        console.log(item)
        const { type, location, date, description } = item;

        const oppositeType = type === 'LOST' ? 'FOUND' : "LOST";
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
            score += 0.3;

            // Type/category match
            if(item.type != candidate.type) score +=0.1;
            if (item.category === candidate.category) score += 0.1;
            if(item.title == item.title) score += 0.4
            console.log(score)
            // Date similarity (within ±7 days)
            const diffDays = Math.abs(new Date(item.Date) - new Date(candidate.Date)) / (1000 * 60 * 60 * 24);
            if (diffDays <= 7) score += 0.1;

            if (score >= CONFIDENCE_THRESHOLD) {
                console.log('Email !')
                const info = await sendMail(candidate.email, item.email);
                console.log(info)
            }
        }



    } catch (error) {
        console.log(error)
    }
}