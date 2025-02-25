// const conn = require("../config/mysql");

const { Users, Profiless } = require("../models");

// const bcrypt = require("bcrypt");

class UserController {
  //SOAL 1: buatlah script untuk menyimpan 5 data users sekaligus
  async store(req, res) {
    try {
      const data = [
        {
          name: "mary1",
          email: "mary1@gmail.com",
          password: "123456",
          role: "admin",
        },
        {
          name: "mary2",
          email: "mary2@gmail.com",
          password: "123456",
          role: "user",
        },
        {
          name: "mary3",
          email: "mary3@gmail.com",
          password: "123456",
          role: "user",
        },
        {
          name: "mary4",
          email: "mary4@gmail.com",
          password: "123456",
          role: "user",
        },
        {
          name: "mary5",
          email: "mary5@gmail.com",
          password: "123456",
          role: "user",
        },
      ];
      const results = await Users.bulkCreate(data);

      //SOAL 2: buatlah script untuk menghitung jumlah data yang ada di tabel users
      const amount = await Users.count();

      res.status(201).json({
        message: "User created successfully",
        JumlahData: amount,
        results,
      });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  }

  //SOAL 3: buatlah script untuk membuat pagination data users dengan menampilkan 2 data di setiap page-nya
  async pagination(req, res) {
    // const page = Number.parseInt(req.query.page);
    // const paramQuerySQL = {};
    // let limit;
    // let offset;

    // // pagination
    // if (page !== "" && typeof page !== "undefined") {
    //   if (page.size !== "" && typeof page.size !== "undefined") {
    //     limit = page.size;
    //     paramQuerySQL.limit = limit;
    //   }

    //   if (page.number !== "" && typeof page.number !== "undefined") {
    //     offset = page.number * limit - limit;
    //     paramQuerySQL.offset = offset;
    //   }
    // } else {
    //   limit = 5; // limit 5 item
    //   offset = 0;
    //   paramQuerySQL.limit = limit;
    //   paramQuerySQL.offset = offset;
    // }

    // try {
    //   const data = await Users.findAll(paramQuerySQL);
    //   const totalPost = await Users.count();
    //   const totalPages = Math.ceil(totalPost / limit);
    //   return res.status(200).json({
    //     data,
    //     totalPost,
    //     totalPages,
    //   });
    // } catch (err) {
    //   res.status(500).json({
    //     message: err,
    //   });
    // }

    const pageAsNumber = Number.parseInt(req.query.page);
    const sizeAsNumber = Number.parseInt(req.query.size);

    let page = 0;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
      page = pageAsNumber;
    }

    let size = 2;
    if (
      !Number.isNaN(sizeAsNumber) &&
      !(sizeAsNumber > 10) &&
      !(sizeAsNumber < 1)
    ) {
      size = sizeAsNumber;
    }

    const usersWithCount = await Users.findAndCountAll({
      limit: size,
      offset: page * size,
    });

    res.send({
      content: usersWithCount.rows,
      totalPages: Math.ceil(usersWithCount.count / Number.parseInt(size)),
    });
  }

  //SOAL 4: buatlah tabel profile yang berelasi dengan tabel users, isi tabel profile dengan attribut alamat, nomorHp
  async oneToOne(req, res) {
    try {
      const results = await Users.findOne({
        where: {
          id: req.params.id,
        },
        include: [
          {
            model: Profiless,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt", "password", "email", "role"],
        },
      });

      res.status(201).json({
        message: "one to one relation successfully",
        results,
      });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  }
}

module.exports = new UserController();
