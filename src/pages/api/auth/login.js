import axios from 'axios';
import cookie from 'cookie';

export default async (req, res) => {
    if (req.method === 'POST') {
        try {
            const {data} = await axios.post(`${process.env.API_SERVER}/Auth/login`, req.body);

            if (data && data.succeeded) {
                res.setHeader('Set-Cookie', [
                    cookie.serialize('refreshToken', data.data.refreshToken, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== 'development', // Geliştirme dışındaki ortamlarda secure olmalı
                        maxAge: 60 * 60 * 24 * 7, // 1 hafta süreyle geçerli
                        path: '/'
                    }),
                    cookie.serialize('accessToken', data.data.accessToken, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== 'development', // Geliştirme dışındaki ortamlarda secure olmalı
                        maxAge: 60 * 60 * 24 * 1, // 1 gün süreyle geçerli
                        path: '/'
                    })
                ]);
                res.status(200).json({success: true});
            } else {
                res.status(401).json({success: false, message: "Authentication failed"});
            }
        } catch (error) {
            console.error('Login API error:', error);
            res.status(500).json({success: false, message: 'Internal server error'});
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
