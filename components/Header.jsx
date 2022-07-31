import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-orange-100 p-7">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-3xl font-bold">Simple Blog</div>
        <Link href="/posts/add-post">
          <a className="bg-orange-50 p-2">Add Post</a>
        </Link>
      </div>
    </header>
  );
}
