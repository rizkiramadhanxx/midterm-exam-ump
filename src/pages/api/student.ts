import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const student = await prisma.student.findMany();

      return res.status(200).json({
        message: "get student is success",
        status: 200,
        data: student,
      });
    } catch (error) {
      return error;
    }
  }

  if (req.method === "POST") {
    try {
      const address = req.body.address;
      const major = req.body.major;
      const religion = req.body.religion;
      const name = req.body.name;
      const telephone = req.body.telephone;

      const student = await prisma.student.create({
        data: {
          address: address,
          major: major,
          telephone: telephone,
          name: name,
          religion: religion,
        },
      });

      if (student) {
        return res.status(200).json({
          message: "get student is success",
          status: 200,
          data: student,
        });
      } else {
        throw Error;
      }
    } catch (error) {
      return res.status(500).json({
        message: "error",
      });
    }
  }
}
