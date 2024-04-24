import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const id = req.query.id as unknown as string;

      const student = await prisma.student.findFirst({
        where: {
          id: parseInt(id),
        },
      });

      if (student) {
        res
          .status(200)
          .json({
            message: "Success to delete data",
            status: 200,
            data: student,
          });
      }
      else {
        throw Error
      }
    } catch (error) {
      return res.status(500).json({
        message: 'error',
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
}
