const { Profiless } = require("../models");

class ProfileController {
  async store(req, res) {
    try {
      const data = [
        {
          alamat: "duri",
          nomorHp: 81200001511,
          userId: 1,
        },
        {
          alamat: "sungai pinang",
          nomorHp: 81203002111,
          userId: 5,
        },
        {
          alamat: "ROhil",
          nomorHp: 81202302111,
          userId: 7,
        },
      ];
      const results = await Profiless.bulkCreate(data);

      res.status(201).json({
        message: "User created successfully",

        results,
      });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  }
}

module.exports = new ProfileController();
