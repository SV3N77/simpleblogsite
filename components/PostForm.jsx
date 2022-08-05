import Image from "next/future/image";
import { useState } from "react";
import Button from "./Button";
import { useRouter } from "next/router";

export default function PostForm() {
  const router = useRouter();
  const [currentImage, setCurrentImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  // blog post data sent to api
  async function postBlogPost({ title, content }) {
    const newBlogPost = {
      title,
      content,
    };
    await fetch("/api/blogposts", {
      method: "POST",
      body: JSON.stringify(newBlogPost),
    });
  }

  function handleImageChange(e) {
    if (e.target.files && e.target.files[0]) {
      const i = e.target.files[0];
      setCurrentImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    postBlogPost(data);
    router.push("/");
  }

  return (
    <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
      <div className="flex gap-10">
        <div className="flex grow flex-col gap-10">
          <div className="w-full px-3">
            <label
              className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="w-full appearance-none rounded-md border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
              id="title"
              name="title"
              type="text"
              placeholder="Title"
            />
          </div>
          <div className="w-full px-3 ">
            <label
              className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
              htmlFor="content"
            >
              Content
            </label>
            <textarea
              className="w-full resize-none appearance-none rounded-md border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
              id="content"
              name="content"
              type="text"
              rows={10}
              placeholder="Content"
            />
          </div>
        </div>
        <div className="text-md flex flex-col gap-3">
          <div className="aspect-[4/3] bg-cover">
            <Image
              src={
                createObjectURL ? createObjectURL : "/images/placeholder.png"
              }
              alt={currentImage ? currentImage.name : ""}
              width={400}
              height={300}
              priority
            />
          </div>
          <div>
            <div className="font-bold uppercase tracking-wide text-gray-700">
              Select Image
            </div>
            <input type="file" name="myImage" onChange={handleImageChange} />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Button type="submit">Add Post</Button>
      </div>
    </form>
  );
}
