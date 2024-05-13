import axios from 'axios';
import {parse} from 'cookie';

export default async (req, res) => {
    if (req.method === 'GET') {
        try {
            console.log("req.body", req);
            const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
            const accessToken = cookies.accessToken; // Access token'ı cookie'den al
            console.log("accessToken", accessToken);

            const {data} = await axios.get(`${process.env.API_SERVER}/Course/GetPricing?courseId=${req.body}`, {
                headers: {
                    'Authorization': 'Bearer ' + ""
                }
            });
            if (data && data.succeeded) {
                res.status(200).json({success: true, data: data.data});

            } else {
                res.status(400).json({success: false, message: data.message});
            }
        } catch (error) {
            console.error('Register API error:', error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    } else {
        // Yanlış HTTP metodu kullanımı
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
