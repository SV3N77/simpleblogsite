// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Timestamp } from "firebase-admin/firestore";
import { db } from "../../firebase/firebase.server";

export default async function handler(req, res) {
  const { method } = req; // gets request method and url
  // firebase firestore database
  const blogpostsRef = db.collection("blogposts");
  const snapShot = await blogpostsRef.orderBy("timestamp", "desc").get();
  const blogposts = snapShot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });

  // switch statement to handle the different methods of the API
  switch (method) {
    case "GET": {
      return res.json(blogposts);
    }
    case "POST": {
      const { title, content, image } = req.body;
      const timestamp = Timestamp.fromDate(new Date()).toDate();
      const newBlogpost = {
        title,
        content,
        image,
        timestamp,
      };
      const docRef = await blogpostsRef.add(newBlogpost);
      console.log("Document written with ID: ", docRef.id);
      return res.json(newBlogpost);
    }
    default:
      res.json({ error: `Method ${method} not allowed` });
  }
}
