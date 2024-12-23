const StaffServices = require("../services/StaffServices");

const createStaff = async (req, res) => {
    try {
        const data = req.body;
        const response = await StaffServices.createStaff(data);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
}

const approveDormRequest = async (req, res) => {
    try {
        const student_id = req.params.id;
        const approved = req.body.approved;
        const room_id = req.body.room_id;
        // kiểm tra xem có được duyệt hay ko ?
        if (approved) {
            // nếu chưa chọn phòng
            if (!room_id) {
                return res.status(200).json({
                    status: "ERR",
                    message: "Chưa chọn phòng",
                });
            } else {
                const response = await StaffServices.approveDormRequest(student_id, room_id);
                return res.status(200).json(response);
            }
        } else {
            return res.status(200).json({
                status: "SUCCESS",
                message: "Yêu cầu vào ký túc xá đã bị từ chối",
            });
        }
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
}

const updateStaff = async (req, res) => {
    try {
        const staff_id = req.params.id;
        const data = req.body;
        const response = await StaffServices.updateStaff(staff_id, data);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
}

const getAllStaff = async (req, res) => {
    try {
        const result = await StaffServices.getAllStaff();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(404).json({
            message: e,
        });
    }
}

const getDetailStaff = async (req, res) => {
    try {
        const staff_id = req.params.id;
        const result = await StaffServices.getDetailStaff(staff_id);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
}

module.exports = {
    approveDormRequest,
    updateStaff,
    getAllStaff,
    getDetailStaff,
    createStaff
}