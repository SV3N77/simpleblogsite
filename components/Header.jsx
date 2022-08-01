import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-orange-100 p-7">
      <div className="container mx-auto flex justify-between">
        <div className="text-3xl font-bold">Simple Blog</div>
        <div className="flex items-center gap-4">
          <Link href="/">
            <a className="rounded-lg border-2 border-orange-300 bg-orange-50 p-2 hover:bg-orange-200">
              Home
            </a>
          </Link>
          <Link href="/posts/add-post">
            <a className="rounded-lg border-2 border-orange-300 bg-orange-50 p-2 hover:bg-orange-200">
              Add Post
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
}
