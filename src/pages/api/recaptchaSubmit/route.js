import axios from 'axios';

export default async function handler(req, response) {
    if (req.method === 'POST') {
        try {
            const {gRecaptchaToken} = await req.body;
            const secretKey = process.env.GOOGLE_RECAPTCHA_V3_SECRET_KEY;
            const baseUrl = process.env.GOOGLE_RECAPTCHA_SITEVERIFY_URL;
            const url = `secret=${secretKey}&response=${gRecaptchaToken}`;

            const res = await axios.post(baseUrl, url, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                },
            });

            if (res && res.data?.success && res.data?.score > 0.5) {
                return response.json({success: true, score: res.data.score});
            } else {
                return response.json({success: false});
            }
        } catch (error) {
            console.error(error);
            return response.json({success: false});
        }
    } else {
        return response.status(405).json({error: 'Method Not Allowed'});
    }
}
