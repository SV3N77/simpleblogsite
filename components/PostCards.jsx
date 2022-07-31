import Image from "next/image";
export default function PostCards() {
  return (
    <div className="mt-5 flex h-64 gap-4 rounded-md bg-amber-50 p-4 shadow-md">
      <div className="relative aspect-[3/4] h-full">
        <Image src="/images/MountFuji.png" alt="Mount Fuji" layout="fill" />
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-2xl">Title</div>
        <div className="grow">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </div>
      </div>
    </div>
  );
}
