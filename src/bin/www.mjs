import { createServer } from "node:http";
import handler from "../handler.mjs";

const app = createServer(handler)
  .listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));

export { app };
