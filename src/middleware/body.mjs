export default function () {
  return new Promise((resolve) => {
    let body = "";

    this.on("data", (chunk) => body += chunk);
    this.on("end", () => resolve(JSON.parse(body)));
  });
}
