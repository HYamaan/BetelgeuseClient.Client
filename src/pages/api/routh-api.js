// pages/api/some-api-route.js
import authMiddleware from '../../middleware/authMiddleware';

const handler = async (request, response) => {
    // Kullanıcı bilgilerine erişim
    const user = request.locals.user;

    // API mantığını buraya ekleyin, kullanıcı bilgilerini kullanabilirsiniz
    response.status(200).json({message: `Merhaba ${user.username}!`});
};


export default authMiddleware(handler);
