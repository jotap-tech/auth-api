import express from "express";
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import cors from 'cors'


const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors())

app.post("/users", async (req, res) => {
  await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });

  res.status(201).json(req.body);
});

app.get("/users", async (req, res) => {
  const user = await prisma.user.findMany();

  res.status(200).json(user);
});

app.put("/users/:id", async (req, res) => {
  await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });

  res.status(201).json(req.body);
});

app.delete("/users/:id", async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({ message: "Usuario deletado com sucesso" });
});

app.listen(3000);
