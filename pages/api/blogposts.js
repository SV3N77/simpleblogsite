// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const { method, url } = req; // gets request method and url
  const filePath = path.join(__dirname, "../../../../files/blogposts.json"); // file path to blogposts.json
  const blogposts = JSON.parse(fs.readFileSync(filePath, "utf8"));
  // switch statement to handle the different methods of the API
  switch (method) {
    case "GET": {
      return res.json(blogposts);
    }
    case "POST": {
      const newBlogPost = {
        id: Math.random().toString(36).slice(2),
        ...JSON.parse(req.body),
      };
      fs.writeFileSync(filePath, JSON.stringify([...blogposts, newBlogPost]));
      return res.json(newBlogPost);
    }

    default:
      res.status(405).json({ error: `Method ${method} not allowed` });
  }
}
