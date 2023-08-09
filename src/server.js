import http from "node:http";

const server = http.createServer((req, res) => {
  const { method, url } = req;

  return res.writeHead(404).end();
})

server.listen(3333);