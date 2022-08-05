import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const { method } = req; // gets request method
  const { id } = req.query; // gets the id from the query string
  const filePath = path.join(__dirname, "../../../../../files/blogposts.json"); // file path to blogposts.json
  const blogposts = JSON.parse(fs.readFileSync(filePath, "utf8")); // reads the file and parses it into a JSON object
  // switch statement to handle the different methods of the API
  switch (method) {
    case "GET": {
      const blogpost = blogposts.find((blogpost) => blogpost.id === id); // finds the blogpost with the id from the query string
      return res.json(blogpost);
    }
    case "DELETE": {
      const newBlogPosts = blogposts.filter((blogpost) => blogpost.id !== id); // filters out the blogpost with the id from the query string
      fs.writeFileSync(filePath, JSON.stringify(newBlogPosts)); // writes the new blogposts to the file
      return res.json(newBlogPosts); // returns the new blogposts
    }
    default:
      res.status(405).json({ error: `Method ${method} not allowed` }); // returns a 405 error if the method is not allowed
  }
}
