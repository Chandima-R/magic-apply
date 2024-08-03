// import prisma from "@/server/prisma-client";
// import * as process from "process";
// import bcrypt from "bcrypt";

// export async function main() {
//   const hashPassword = await bcrypt.hash(
//     "$2y$10$WHMP7JFJ4Tev9YK6voxi0ONUes1WotsES.fi3mKvdRqT5VULlq3aG",
//     10
//   );

//   await prisma.user.create({
//     data: {
//       firstname: "chandima",
//       lastname: "rathnayake",
//       email: "chandimar.online@gmail.com",
//       hashedPassword: hashPassword,
//     },
//   });
// }
// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async () => {
//     await prisma.$disconnect();
//     process.exit(1);
//   });
