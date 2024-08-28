// import express validator
const { body } = require("express-validator");

// import prisma
const prisma = require("../../prisma/client");

// definikan validasi untuk refister
const validateRegister = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid")
    .custom(async (value) => {
      if (!value) {
        throw new Error("Email is required");
      }
      const user = await prisma.user.findUnique({ where: { email: value } });
      if (user) {
        throw new Error("Email already exixts");
      }
      return true;
    }),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

// definisikan validasi untuk login
const validateLogin = [
  body("email").notEmpty().withMessage("Email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

module.exports = { validateRegister, validateLogin };

// catatan
// notEmpty => kolom wajib diisi
// isEmail => kolom wajib memiliki format email
// custom => untuk memeriksa unique menggunakan prisma
// isLength => kolom minimal 6 karakter
