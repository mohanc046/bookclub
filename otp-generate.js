// const confirmOTP = async (mobileNo, otp) => {
// 	const axios = require('axios');

// 	const mobile = mobileNo;
// 	const authkey = '44926Ajipu4nxyj3J628cdd86P1';

//     const options = {
//         method: 'GET',
//         url: `https://api.msg91.com/api/v5/otp/verify?otp=${otp}&authkey=${authkey}&mobile=${mobile}`
//     };

// 	const req = await axios(options);

// 	return req.data;
// };

const resendOTP = async (mobileNo) => {

	const axios = require('axios');

    const authkey = '44926Ajipu4nxyj3J628cdd86P1';

    const retryType = "text"

    const options = {
        "method": "GET",
        url: `https://api.msg91.com/api/v5/otp/retry?authkey=${authkey}&retrytype=${retryType}&mobile=${mobileNo}`,
    };

    const response = await axios(options);

    return response.data;
};

(async () => {
    let value = await resendOTP('919677922963');

    console.log(value, "-------value");
})()


