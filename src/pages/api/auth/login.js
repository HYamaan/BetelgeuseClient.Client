import axios from 'axios';
import cookie from 'cookie';

export default async (req, res) => {
    if (req.method === 'POST') {
        try {
            const {data} = await axios.post(`${process.env.API_SERVER}/Auth/login`, req.body);

            if (data && data.succeeded) {
                const accessTokenExpirationDate = new Date(data.data.accessTokenExpiration);
                const refreshTokenExpirationDate = new Date(data.data.refreshTokenExpiration);

                const accessTokenMaxAgeSeconds = Math.floor((accessTokenExpirationDate - Date.now()) / 1000);
                const refreshTokenMaxAgeSeconds = Math.floor((refreshTokenExpirationDate - Date.now()) / 1000);

                res.setHeader('Set-Cookie', [
                    cookie.serialize('refreshToken', data.data.refreshToken, {
                        secure: false,
                        maxAge: refreshTokenMaxAgeSeconds,
                        path: '/',
                        sameSite: 'Strict'
                    }),
                    cookie.serialize('accessToken', data.data.accessToken, {
                        secure: false,
                        maxAge: accessTokenMaxAgeSeconds,
                        path: '/',
                        sameSite: 'Strict'
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
