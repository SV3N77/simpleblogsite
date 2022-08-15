import Image from "next/future/image";
import Button from "./Button";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function editPost({ id, formData }) {
  await fetch(`/api/blogposts/${id}`, {
    method: "POST",
    body: formData,
  });
}

export default function EditForm({
  postId,
  title,
  content,
  image,
  doneEditing,
}) {
  const queryClient = useQueryClient();
  const [currentImage, setCurrentImage] = useState(image || null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const editBlogPost = useMutation(editPost, {
    onSuccess: () => {
      queryClient.invalidateQueries("blogposts");
    },
  });

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
    editBlogPost.mutate({
      id: postId,
      formData,
    });
    doneEditing();
  }

  return (
    <form
      className="flex h-72 overflow-hidden rounded-md bg-amber-50 shadow-md"
      onSubmit={handleSubmit}
    >
      {image ? (
        <div className="relative aspect-[4/3] ">
          <Image
            className="h-full w-auto bg-cover"
            src={createObjectURL ? createObjectURL : `/images/${image}`}
            alt={currentImage ? currentImage.name : ""}
            width={384}
            height={288}
            priority
          />
          <div className="absolute left-1/2 bottom-2 -translate-x-1/2 bg-gray-700/50 p-2 text-xs text-white">
            <div className="font-bold uppercase tracking-wide ">
              Select Image
            </div>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              accept="image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/webp"
            />
          </div>
        </div>
      ) : null}
      <div className="flex w-full flex-col gap-2 p-5">
        <label
          className="mb-1 block text-xs font-bold uppercase tracking-wide text-gray-700"
          htmlFor="title"
        >
          Title
        </label>
        <input
          className="appearance-none rounded-md border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
          id="title"
          name="title"
          type="text"
          defaultValue={title}
          placeholder="Title"
        />
        <label
          className="mb-1 block text-xs font-bold uppercase tracking-wide text-gray-700"
          htmlFor="content"
        >
          Content
        </label>
        <textarea
          className="resize-none appearance-none rounded-md border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
          id="content"
          name="content"
          type="text"
          defaultValue={content}
          rows={6}
          placeholder="Content"
        />
        <div className="flex justify-center text-xs">
          <Button type="submit">Update Post</Button>
        </div>
      </div>
    </form>
  );
}
