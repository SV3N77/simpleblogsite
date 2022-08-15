import fs from "fs";
import path from "path";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  const { method } = req; // gets request method
  const { id } = req.query; // gets the id from the query string
  const filePath = path.join(__dirname, "../../../../../files/blogposts.json"); // file path to blogposts.json
  const blogposts = JSON.parse(fs.readFileSync(filePath, "utf8")); // reads the file and parses it into a JSON object
  const form = new formidable.IncomingForm({
    encoding: "utf-8",
    keepExtensions: true,
    uploadDir: path.join(__dirname, "../../../../../public/images"), // sets upload directory // keeps file extension
  }); // creates new form object
  // switch statement to handle the different methods of the API
  switch (method) {
    case "GET": {
      const blogpost = blogposts.find((blogpost) => blogpost.id === id); // finds the blogpost with the id from the query string
      return res.json(blogpost);
    }
    case "POST":
      {
        const blogPost = blogposts.find((blogpost) => blogpost.id === id); // finds the blogpost with the id from the query string
        // fs.unlinkSync(
        //   path.join(__dirname, "../../../../../public/images", blogPost.image) // deletes the image from the public/images folder")
        // ); // deletes the image from the public/images folder
        form.parse(req, (err, fields, files) => {
          // parses form data and files
          if (err) {
            return res.status(400).json({ error: err }); // returns error if there is one
          }
          const { title, content } = fields; // gets title, content, from fields object
          if (files.image.size === 0) {
            return res.status(400).json("No image");
          }
          const image = files.image.newFilename; // gets image from files object
          const newBlogpost = {
            id: blogPost.id,
            title,
            content,
            image, // gets image path and removes public from the beginning of the path
          }; // creates new blogpost object with title, content, and image
          blogposts.splice(blogposts.indexOf(blogPost), 1, newBlogpost); // replaces the blogpost with the new blogpost
          fs.writeFileSync(filePath, JSON.stringify(blogposts)); // writes blogposts array to blogposts.json
          return res.json(newBlogpost); // returns new blogpost
        });
      }
      break;
    case "DELETE": {
      const blogPost = blogposts.find((blogpost) => blogpost.id === id); // finds the blogpost with the id from the query string
      const newBlogPosts = blogposts.filter((blogpost) => blogpost.id !== id); // filters out the blogpost with the id from the query string
      if (blogPost.image) {
        fs.unlinkSync(
          path.join(__dirname, "../../../../../public/images", blogPost.image) // deletes the image from the public/images folder")
        ); // deletes the image from the public/images folder
      }
      fs.writeFileSync(filePath, JSON.stringify(newBlogPosts)); // writes the new blogposts to the file
      return res.json(newBlogPosts); // returns the new blogposts
    }
    default:
      res.json({ error: `Method ${method} not allowed` }); // returns a 405 error if the method is not allowed
  }
}
