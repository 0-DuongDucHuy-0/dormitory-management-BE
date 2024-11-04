const UserService = require("../services/UserServices");
const JwtServices = require("../services/JwtServices");

const signUp = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);

    if (!email || !password || !confirmPassword) {
      return res.status(200).json({
        status: "ERR",
        meassage: "Thiếu thông tin đăng ký",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERR",
        meassage: "Email không hợp lệ",
      });
    } else if (password != confirmPassword) {
      return res.status(200).json({
        status: "ERR",
        meassage: "Xác nhận mật khẩu không hợp lệ",
      });
    }

    const result = await UserService.signUp(req.body);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);

    if (!email || !password) {
      return res.status(200).json({
        status: "ERR",
        meassage: "Thiếu thông tin đăng ký",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERR",
        meassage: "Email không hợp lệ",
      });
    }

    const result = await UserService.signIn(req.body);
    const { refresh_token, ...newResult } = result;
    res.cookie("refresh_token", refresh_token, {
      secure: false,
      httpOnly: true,
      sameSite: "strict",
    });
    return res.status(200).json(newResult);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const signOut = async (req, res) => {
  try {
    res.clearCookie("refresh_token");
    return res.status(200).json({
      status: "OK",
      message: "Đăng xuất thành công",
    });
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateUser = async (req, res) => {
  console.log("oke");
};

const getAllUser = async (req, res) => {
  try {
    const result = await UserService.getAllUser();
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refresh_token;
    if (!token) {
      return res.status(200).json({
        status: "ERR",
        meassage: "Không tồn tại token",
      });
    }
    const response = await JwtServices.refreshTokenJwtServices(token);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  getAllUser,
  signUp,
  signIn,
  refreshToken,
  signOut,
  updateUser,
};
