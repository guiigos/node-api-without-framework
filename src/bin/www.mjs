import { createServer } from "node:http";
import handler from "../handler.mjs";

const PORT = 3003;
const app = createServer(handler)
  .listen(PORT, () => console.log(`Server running on port ${PORT}`));

export { app, PORT };
