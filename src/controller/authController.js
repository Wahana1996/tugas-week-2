const { Users } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("dotenv").config().parsed;

class AuthController {
  //ini adalah function untuk mengurangi redundent (pengulangan pemanggilan method)
  generateToken = async (payload) => {
    const accessToken = jwt.sign(payload, env.JWT_ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign(payload, env.JWT_REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });

    return { accessToken, refreshToken };
  };

  // async register(req, res) { => disebut deklarasi function, yang bawah variabel function.
  // jika pakai class maka jika ingin memanggil function lain haruslah menggunakan variabel function
  register = async (req, res) => {
    try {
      //check email
      const foundEmail = await Users.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (foundEmail) {
        return res.status(200).send({
          success: false,
          message: "Already register, please login",
        });
      }
      const user = await Users.create({
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
        role: req.body.role,
      });

      //kalau gagal register
      if (!user) {
        throw new Error("Register failed");
      }

      //   const accesToken = jwt.sign(
      //     {
      //       id: user.id,
      //       role: req.body.role,
      //     },
      //     "132jdajdhat&5dsm$sdfr5$*&shG",
      //     {
      //       expiresIn: "15m",
      //     }
      //   );

      //   const refreshToken = jwt.sign(
      //     {
      //       id: user.id,
      //       role: req.body.role,
      //     },
      //     "9*&gDSgjjdajNDAeqgsk",
      //     {
      //       expiresIn: "1d",
      //     }
      //   );

      const { accessToken, refreshToken } = await this.generateToken({
        id: user.id,
        // role: user.role,
      });
      //   console.log(user);
      res.status(200).json({
        message: "Registered successfully",
        accessToken: accessToken,
        refreshToken: refreshToken,
        user,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  };

  // async login(req, res) {
  login = async (req, res) => {
    try {
      const user = await Users.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (!user) {
        throw new Error("Email not found");
      }

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!validPassword) {
        throw new Error("Password is wrong");
      }

      const { accessToken, refreshToken } = await this.generateToken({
        id: user.id,
        // role: user.role,
      });

      //   const accessToken = jwt.sign(
      //     { id: user.id, role: user.role },
      //     "132jdajdhat&5dsm$sdfr5$*&shG",
      //     {
      //       expiresIn: "15m",
      //     }
      //   );

      //   const refreshToken = jwt.sign(
      //     { id: user.id, role: user.role },
      //     "9*&gDSgjjdajNDAeqgsk",
      //     { expiresIn: "1d" }
      //   );

      res.json({
        message: "Login successfully",
        accessToken: accessToken,
        refreshToken: refreshToken,
        user,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  };

  // async refreshToken(req, res) {
  refreshToken = async (req, res) => {
    try {
      const parRefreshToken = req.body.refreshToken;

      if (!parRefreshToken) {
        throw new Error("Refresh token required");
      }

      //verifikasi
      const user = jwt.verify(parRefreshToken, "9*&gDSgjjdajNDAeqgsk");

      //   const accessToken = jwt.sign(
      //     { id: user.id, role: user.role },
      //     "132jdajdhat&5dsm$sdfr5$*&shG",
      //     {
      //       expiresIn: "15m",
      //     }
      //   );

      const { accessToken, refreshToken } = await this.generateToken({
        id: user.id,
        // role: user.role,
      });
      res.json({
        message: "Refresh token success",
        accessToken: accessToken,
        refreshToken: refreshToken,
        user,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  };
}

module.exports = new AuthController();
