import axios from 'axios';

export default async (req, res) => {
    if (req.method === 'POST') {
        try {
            const {data} = await axios.post(`${process.env.API_SERVER}/Account/reset-password`, req.body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Origin': process.env.LOCAL_URL
                }
            });
            console.log("data", data);
            if (data && data.succeeded) {
                res.status(200).json({success: true});
            } else {
                res.status(400).json({success: false, message: data.message});
            }
        } catch (error) {
            console.error('Register API error:', error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    } else {
        // Yanlış HTTP metodu kullanımı
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
