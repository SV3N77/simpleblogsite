// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from "fs";
import path from "path";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  const { method } = req; // gets request method and url
  const filePath = path.join(__dirname, "../../../../files/blogposts.json"); // file path to blogposts.json
  const blogposts = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const form = new formidable.IncomingForm({ keepExtensions: true }); // creates new form object
  form.uploadDir = path.join(__dirname, "../../../../public/images"); // sets upload directory // keeps file extension
  // switch statement to handle the different methods of the API
  switch (method) {
    case "GET": {
      return res.json(blogposts);
    }
    case "POST": {
      form.parse(req, (err, fields, files) => {
        // parses form data and files
        if (err) {
          return res.status(400).json({ error: err }); // returns error if there is one
        }
        const { title, content } = fields; // gets title, content, from fields object
        const image = files.image.newFilename; // gets image from files object
        console.log(image); // logs image object
        const newBlogpost = {
          id: Math.random().toString(36).slice(2),
          title,
          content,
          image, // gets image path and removes public from the beginning of the path
        }; // creates new blogpost object with title, content, and image
        blogposts.push(newBlogpost); // adds new blogpost to blogposts array
        fs.writeFileSync(filePath, JSON.stringify(blogposts)); // writes blogposts array to blogposts.json
        return res.status(201).json(newBlogpost); // returns new blogpost
      });
    }
    default:
      res.status(405).json({ error: `Method ${method} not allowed` });
  }
}
