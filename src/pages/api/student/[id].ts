import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // if (req.method !== "GET" || "PUT" || "DELETE") {
  //   res.status(500).json({ message: "error bang mau kemana" });
  // }

  if (req.method === "GET") {
    try {
      const id = req.query.id as unknown as string;

      const student = await prisma.student.findFirst({
        where: {
          id: parseInt(id),
        },
      });

      res.status(200).json({
        message: "Success to get data",
        status: 200,
        data: student,
      });
    } catch (error) {
      return res.status(500).json({
        message: "error",
      });
    }
  }

  if (req.method === "DELETE") {
    try {
      const id = req.query.id as unknown as string;

      const student = await prisma.student.delete({
        where: {
          id: parseInt(id),
        },
      });

      if (student) {
        res
          .status(200)
          .json({ message: "Success to delete data", status: 200 });
      } else {
        throw Error;
      }
    } catch (error) {
      return res.status(500).json({
        message: "error",
      });
    }
  }

  if (req.method === "PUT") {
    const id = req.query.id as unknown as string;

    try {
      const address = req.body.address;
      const major = req.body.major;
      const religion = req.body.religion;
      const name = req.body.name;
      const telephone = req.body.telephone;

      const student = await prisma.student.update({
        where: {
          id: parseInt(id),
        },
        data: {
          address: address,
          major: major,
          telephone: telephone,
          name: name,
          religion: religion,
        },
      });

      return res.status(200).json({
        message: "get student is success",
        status: 200,
        data: student,
      });
    } catch (error) {
      return res.status(500).json({
        message: "error",
      });
    }
  }
}
