const pool = require("../models/db");

const createStudent = async (studentId, newStudent) => {
  const {
    full_name,
    dob,
    gender,
    ethnicity,
    religion,
    major,
    class: studentClass,
    phone,
    approved = false,
  } = newStudent;

  return new Promise(async (resolve, reject) => {
    const query = `INSERT INTO students (user_id, full_name, dob,	gender,	ethnicity, religion,	major,	class,	phone,	approved) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    await pool.query(
      query,
      [
        studentId,
        full_name,
        dob,
        gender,
        ethnicity,
        religion,
        major,
        studentClass,
        phone,
        approved,
      ],
      (err, data) => {
        if (err) {
          return reject({
            status: "ERROR",
            message: "Tạo student không thành công",
            error: err,
          });
        }

        resolve({
          status: "OK",
          message: "SUCCESS",
          data: data,
        });
      }
    );
  });
};

const uplateStudent = async (studentId, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const UserQuery = `SELECT * FROM students WHERE student_id = ? LIMIT 1`;

      // lấy ra thông tin
      const results = await new Promise((resolveQuery, rejectQuery) => {
        pool.query(UserQuery, [studentId], (err, results) => {
          if (err) {
            return rejectQuery({
              status: "ERROR",
              message: "Lỗi không tồn tại ủe",
              error: err,
            });
          }
          resolveQuery(results);
        });
      });

      console.log("results", results);

      if (results === null) {
        resolve({
          status: "OK",
          message: "Người dùng không tồn tại",
        });
      }

      console.log("results", results);
      // const updateUserQuery = `UPDATE users SET ? WHERE user_id = ?`;
      // let updateData = "";
      // if (data.password) {
      //   updateData += " password = " + data.password;
      // }
      // if (data.role) {
      //   updateData += `, role = "` + data.role + `" `;
      // }
      const updateUserQuery = "UPDATE students SET ? WHERE student_id = ?";
      let updateData = {};
      if (data.phone) {
        updateData.phone = hash_phone;
      }
      if (data.room_id) {
        updateData.room_id = data.room_id;
      }


      console.log("updateData", updateData);

      const updateUser = await new Promise((resolveQuery, rejectQuery) => {
        pool.query(updateUserQuery, [updateData, studentId], (err, results) => {
          if (err) {
            return rejectQuery({
              status: "ERROR",
              message: "Update thất bại",
              error: err,
            });
          }
          resolveQuery(results);
        });
      });

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updateUser,
      });
    } catch (e) {
      reject(e);
    }
  });
}

const getAllStudent = async () => {
  return new Promise(async (resolve, reject) => {
    const query = "SELECT * FROM students";

    await pool.query(query, (err, data) => {
      if (err) {
        return reject({
          status: "ERROR",
          message: "Failed to fetch users",
          error: err,
        });
      }

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: data,
      });
    });
  });
}

module.exports = {
  createStudent,
  uplateStudent,
  getAllStudent
};