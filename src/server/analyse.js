const axios = require("axios");
const meaningCloud = "https://api.meaningcloud.com/sentiment-2.1";

const analyze = async (url, key) => {
    try {
        const response = await axios.get(`${meaningCloud}?key=${key}&url=${url}&lang=en`);
        const { status } = response.data;

        if (status.code === "100") {
            return handleError(status.code, "Please enter a valid URL");
        } else if (status.code === "212") {
            return handleError(status.code, status.msg);
        }

        return successResponse(response.data, status.code);
    } catch (error) {
        console.error("Error fetching data:", error.message);
        return handleError(500, "Internal Server Error. Please try again later.");
    }
};

const handleError = (code, msg) => ({
    code,
    msg
});

const successResponse = (data, code) => {
    const { score_tag, agreement, subjectivity, confidence, irony } = data;
    return {
        sample: {
            score_tag,
            agreement,
            subjectivity,
            confidence,
            irony
        },
        status: code
    };
};

module.exports = { analyze };