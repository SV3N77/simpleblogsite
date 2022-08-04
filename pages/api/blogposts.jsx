// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const { method, url } = req;
  const { pathname } = new URL(url, "http://localhost:3000"); // url from localhost:3000 joined with the url from the request
  const filePath = path.join(__dirname, "../../../../files/blogposts.json"); // file path to blogposts.json

  //
  switch (method) {
    case "GET":
      if (pathname === "/api/blogposts") {
        const blogposts = JSON.parse(fs.readFileSync(filePath, "utf8"));
        res.status(200).json(blogposts);
      }
      break;
    case "POST":
      if (pathname === "/api/blogposts") {
        const blogposts = JSON.parse(fs.readFileSync(filePath, "utf8"));
        // req.body.id = Math.random().toString(36).slice(2);
        blogposts.push(req.body);
        fs.writeFileSync(filePath, JSON.stringify(blogposts), (err) => {
          if (err) {
            res.status(500).json(err);
          } else {
            res.status(201).json(blogposts);
          }
        });
      }
      break;
    default:
      res.status(405).json({ error: `Method ${method} not allowed` });
  }
}
