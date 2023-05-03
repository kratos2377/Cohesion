import Link from 'next/link'

export default function NotFound() {
  return (
   
      <div className="p-8 text-center text-gray-500">
        <p>404 — Not Found</p>
        <Link href="/home">
          <a className="text-primary-500 mt-2 block hover:underline">
            Go back home
          </a>
        </Link>
      </div>

  )
}
