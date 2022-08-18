import { db } from "../../../firebase/firebase.server";

export default async function handler(req, res) {
  const { method } = req; // gets request method
  const { id } = req.query; // gets the id from the query string
  // firebase firestore database
  const blogpostsRef = db.collection("blogposts");
  const blogpostRef = blogpostsRef.doc(id);

  // switch statement to handle the different methods of the API
  switch (method) {
    case "GET": {
      const docSnap = await blogpostRef.get();
      if (docSnap.exists) {
        return res.json({ id: docSnap.id, ...docSnap.data() });
      } else {
        return res.json({ error: `Blogpost with id ${id} not found` });
      }
    }
    case "PUT": {
      const { title, content, image } = req.body;
      const updatedBlogpost = {
        title,
        content,
      };
      if (image) {
        updatedBlogpost.image = image;
      }
      await blogpostRef.update({ ...updatedBlogpost });
      return res.json(updatedBlogpost);
    }
    case "DELETE": {
      const docSnap = await blogpostRef.get();
      if (docSnap.exists) {
        await blogpostRef.delete();
        return res.json({ id: docSnap.id, ...docSnap.data() });
      }
      return res.json({ error: `Blogpost with id ${id} not found` });
    }
    default:
      res.json({ error: `Method ${method} not allowed` }); // returns a 405 error if the method is not allowed
  }
}
