import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

async function seed() {
  await prisma.transaction.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  const userId = "a991b288-012e-40f9-933f-bb12ff104aaa";

  await prisma.user.create({
    data: {
      id: userId,
      name: "teste",
      email: "teste@email.com",
      password_hash: await hash("teste", 6),
    },
  });

  await prisma.category.create({
    data: {
      id: "1f4e8b3b-54c1-4e3f-9f10-7f0f47d5e6c8",
      name: "Aluguel",
      type: "OUTCOME",
    },
  });

  await prisma.category.create({
    data: {
      id: "2a8c3d22-0ec7-4c34-a80a-dc4c2f7f291b",
      name: "Freelance",
      type: "INCOME",
    },
  });

  await prisma.category.create({
    data: {
      id: "d1b7b4c3-e90a-44e0-86c3-3c4a48e43826",
      name: "Supermercado",
      type: "OUTCOME",
    },
  });

  const salaryCategory = await prisma.category.create({
    data: {
      id: "6bc0a9bb-79ed-45e0-91cd-8d49a0eb1102",
      name: "Salário",
      type: "INCOME",
      userId,
    },
  });

  const groceriesCategory = await prisma.category.create({
    data: {
      id: "3ed83b9f-51a2-49ad-a811-9d9c189118b5",
      name: "Mercado",
      type: "OUTCOME",
      userId,
    },
  });

  await prisma.transaction.createMany({
    data: [
      {
        id: "5a422146-fdb7-40ff-8617-df8b2667f4bf",
        userId,
        categoryId: salaryCategory.id,
        amount: 5000.0,
        type: "INCOME",
        description: "Salário do mês",
      },
      {
        id: "75908bed-f5bc-459c-8b7b-320b995e75e9",
        userId,
        categoryId: groceriesCategory.id,
        amount: 250.5,
        type: "OUTCOME",
        description: "Compras no supermercado",
      },
    ],
  });
}

seed().then(() => {
  console.log("🌱 Seeded database");
});
