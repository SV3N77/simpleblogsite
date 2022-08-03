import Image from "next/future/image";
import Button from "./Button";

export default function PostForm() {
  function handleSubmit(e) {
    e.preventDefault();

    console.log("submit");
  }
  return (
    <form className="flex flex-col gap-10">
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
              type="text"
              rows={10}
              placeholder="Content"
            />
          </div>
        </div>
        <div className="text-md flex flex-col gap-3">
          <div className="aspect-[4/3]">
            <Image
              src="/images/mount-fuji.png"
              alt="Mount Fuji"
              width={400}
              height={300}
            />
          </div>
          <div>
            <div className="font-bold uppercase tracking-wide text-gray-700">
              Select Image
            </div>
            <input type="file" name="myImage" />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Button type="submit">Add Post</Button>
      </div>
    </form>
  );
}
