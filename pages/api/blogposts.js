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
  const form = new formidable.IncomingForm({
    encoding: "utf-8",
    keepExtensions: true,
    uploadDir: path.join(__dirname, "../../../../public/images"),
  });

  // switch statement to handle the different methods of the API
  switch (method) {
    case "GET": {
      return res.json(blogposts);
    }
    case "POST":
      {
        form.parse(req, (err, fields, files) => {
          // parses form data and files
          if (err) {
            return res.json({ error: err }); // returns error if there is one
          }
          const { title, content } = fields; // gets title, content, from fields object
          const image = files.image.newFilename; // gets image from files object
          const newBlogpost = {
            id: Math.random().toString(36).slice(2),
            title,
            content,
            image, // gets image path and removes public from the beginning of the path
          }; // creates new blogpost object with title, content, and image
          blogposts.push(newBlogpost); // adds new blogpost to blogposts array
          fs.writeFileSync(filePath, JSON.stringify(blogposts)); // writes blogposts array to blogposts.json
          return res.json(newBlogpost); // returns new blogpost
        });
      }
      break;
    default:
      res.json({ error: `Method ${method} not allowed` });
  }
}
