import Image from "next/future/image";
import Button from "./Button";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { storage } from "../firebase/firebase.client";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

async function editPost({ id, title, content, image }) {
  const storageRef = ref(storage, `images/${image.name}`);
  const metadata = {
    contentType: image.type,
  };
  const uploadResult = await uploadBytes(storageRef, image, metadata);
  const imageDownloadURL = await getDownloadURL(uploadResult.ref);

  const editedPost = {
    title,
    content,
    image: imageDownloadURL,
  };

  await fetch(`/api/blogposts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editedPost),
  });
}

export default function EditForm({
  postId,
  title,
  content,
  image,
  onEditFinish,
}) {
  const queryClient = useQueryClient();
  const [currentImage, setCurrentImage] = useState(image || null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const editBlogPost = useMutation(editPost, {
    onSuccess: () => {
      queryClient.invalidateQueries("blogposts");
      onEditFinish();
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
      title: formData.get("title"),
      content: formData.get("content"),
      image: formData.get("image"),
    });
  }

  return editBlogPost.isLoading ? (
    <div className="flex h-72 overflow-hidden rounded-md bg-amber-50 shadow-md">
      <div className="flex w-full animate-pulse space-x-4">
        <div className="h-[288px] w-[384px] bg-slate-200"></div>
        <div className="flex-1 space-y-6 py-5 px-2">
          <div className="h-12 rounded bg-slate-200"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 h-5 rounded bg-slate-200"></div>
              <div className="col-span-1 h-5 rounded bg-slate-200"></div>
            </div>
            <div className="h-5 rounded bg-slate-200"></div>
            <div className="h-5 rounded bg-slate-200"></div>
            <div className="h-10 rounded bg-slate-200"></div>
            <div className="h-5 rounded bg-slate-200"></div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <form
      className="relative flex h-72 overflow-hidden rounded-md bg-amber-50 shadow-md"
      onSubmit={handleSubmit}
    >
      <div className="relative aspect-[4/3] ">
        <Image
          className="h-full w-auto bg-cover"
          src={createObjectURL ? createObjectURL : `${image}`}
          alt={currentImage ? currentImage.name : ""}
          width={384}
          height={288}
          priority
        />
        <div className="absolute left-1/2 bottom-2 -translate-x-1/2 bg-gray-700/50 p-2 text-xs text-white">
          <div className="font-bold uppercase tracking-wide ">Select Image</div>
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleImageChange}
            accept="image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/webp"
            required
          />
        </div>
      </div>

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
      <div className="absolute right-2 top-2">
        <button
          className="text-gray-400 hover:text-gray-600"
          onClick={onEditFinish}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
    </form>
  );
}
