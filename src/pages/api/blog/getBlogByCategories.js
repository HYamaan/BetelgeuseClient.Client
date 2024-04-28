import axios from 'axios';

export default async (req, res) => {
    if (req.method === 'GET') {
        try {
            const {data} = await axios.get(`${process.env.API_SERVER}/Blog/GetBlogByCategories?CategoryId=${req.query.Id}`);
            if (data && data.succeeded) {
                res.status(200).json({success: true, data: data.data});

            } else {
                res.status(404).json({success: false, message: data.message});
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
