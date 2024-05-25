import isGuid from "@/lib/isGuid";
import axios from "axios";
import {AccordionType} from "@/enum/AccordionType";
import {refreshToken} from "@/lib/auth";
import Cookies from 'js-cookie';

export default async function FetchUpdateFaqTypeOrder(list, courseId, accordiontype) {
    const accessToken = Cookies.get('accessToken');
    const orderData = list.filter(faq => isGuid(faq.id)).map(faq => ({id: faq.id}));
    try {
        const response = await axios.post(`${process.env.API_SERVER}/Course/UpdateFaqTypeOrder`, {
            courseId: courseId,
            accordiontype: accordiontype,
            data: orderData
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        if (response.data.succeeded) {
            console.log('FAQ order updated successfully');
        } else {
            console.error('Failed to update FAQ order:', response.data.message);
        }
    } catch (error) {
        console.error('Error updating FAQ order:', error);
        if (error.response && error.response.status === 401) {

            await refreshToken();  // Token yenileme işlemini deneyin
            alert("Please retry change order ");

        }
    }
}
