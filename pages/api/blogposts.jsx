// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const { method, url } = req;
  const { pathname } = new URL(url, "http://localhost:3000");
  const filePath = path.join(__dirname, "../../../../files/blogposts.json");

  if (method === "GET") {
    if (pathname === "/api/blogposts") {
      const blogposts = JSON.parse(fs.readFileSync(filePath, "utf8"));
      res.status(200).json(blogposts);
    }
  }

  if (method === "POST") {
    if (pathname === "/api/blogposts") {
      const blogposts = JSON.parse(fs.readFileSync(filePath, "utf8"));
      const newPost = req.body;
      newPost.id = Math.random().toString(36).slice(2);
      blogposts.push(newPost);
      fs.writeFileSync(filePath, JSON.stringify(blogposts));
      res.status(200).json(newPost);
    }
  }
}
