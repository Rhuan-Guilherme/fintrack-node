import { app } from "./app";

app.listen({
  port: 3333
}).then(() => {
  console.log(`Server listening at http://localhost:3333`);
})