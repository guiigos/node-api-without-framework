import {
  index,
  show,
  create,
  update,
  remove,
} from "./controller/task.controller.mjs";
import db from "./db/config.mjs";
import body from "./middleware/body.mjs";
import query from "./middleware/query.mjs";

async function handler(request, response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");

  request.details = new URL(request.url, `${request.protocol}://${request.headers.host}/`);

  request.db = db;
  request.body = body;
  request.query = query;

  if (request.details.pathname.toLowerCase() === "/tasks") {
    if (request.method.toLowerCase() === "get") {
      if (request.details.searchParams.size) {
        return show(request, response);
      }
      return index(request, response);
    }
    if (request.method.toLowerCase() === "post"){
      return create(request, response);
    }
    if (request.method.toLowerCase() === "put"){
      return update(request, response);
    }
    if (request.method.toLowerCase() === "delete") {
      return remove(request, response);
    }
  }

  response.writeHead(404);
  response.end("Not found...");
};

export default handler;
