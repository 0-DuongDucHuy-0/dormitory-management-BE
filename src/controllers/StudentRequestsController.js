const StudentRequestsServices = require("../services/StudentRequestsServices");

const createRequest = async (req, res) => {
    try {
        const student_id = req.params.id;
        const { request_type, description } = req.body;
        if (
            !request_type ||
            !description
        ) {
            return res.status(200).json({
                status: "ERR",
                meassage: "Thiếu thông tin tọa yêu cầu",
            });
        }
        const result = await StudentRequestsServices.createRequest(student_id, req.body);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(404).json({
            message: error.message,
        });
    }
}

module.exports = {
    createRequest
};