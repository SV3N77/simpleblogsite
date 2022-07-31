import Image from "next/image";

export default function PostForm() {
  return (
    <form className="flex gap-16">
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
      <div className="text-md">
        <div className="relative aspect-[4/3]">
          <Image src="/images/MountFuji.png" alt="Mount Fuji" layout="fill" />
        </div>
        <div className="font-bold uppercase tracking-wide text-gray-700">
          Select Image
        </div>
        <input type="file" name="myImage" />
      </div>
    </form>
  );
}
