import Image from "next/future/image";
import Button from "./Button";

export default function EditForm({ postId, title, content, image }) {
  return (
    <form className="flex h-72 overflow-hidden rounded-md bg-amber-50 shadow-md">
      {image ? (
        <Image
          className="aspect-[4/3] bg-cover"
          src={`/images/${image}`}
          alt={image}
          width={400}
          height={300}
          priority
        />
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
          <Button>Update Post</Button>
        </div>
      </div>
    </form>
  );
}
