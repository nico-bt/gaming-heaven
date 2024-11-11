// Obs:
// The url is the source of truth
// query is extracted from url and need to be passed as a prop to the SearchGame component
// from the page using the app router

import Link from "next/link"
import { Game } from "@/types/games"
import Input from "./Input"
import { searchGames } from "@/lib/games"
import { Suspense } from "react"
import { LoaderCircle } from "lucide-react"

export default function SearchGame({ query }: { query: string }) {
  return (
    <div className="relative z-10">
      <Input />

      <Suspense key={query} fallback={<Loading />}>
        <Results query={query} />
      </Suspense>
    </div>
  )
}

async function Results({ query }: { query: string }) {
  const games = query ? await searchGames(query) : []

  return (
    <ul className="hidden peer-focus:flex hover:flex flex-col gap-1 border absolute top-10 w-full bg-white shadow-lg z-10 rounded-bl-[20px] rounded-br-[20px] p-2 border-pink-600">
      {games.length > 0 && games.map((item) => <ResultsItem item={item} key={item.id} />)}

      {games.length === 0 && <li className="p-2 text-center">No results</li>}
    </ul>
  )
}

function ResultsItem({ item }: { item: Game }) {
  return (
    <li className="hover:bg-gray-100">
      <Link className="flex gap-2 items-center p-2" href={`/games/${item.id}`}>
        <img
          className="h-8 w-8 object-cover"
          src={
            item.cover
              ? `https://images.igdb.com/igdb/image/upload/t_cover_small/${item?.cover?.image_id}.jpg`
              : "/No-Image-Placeholder.svg"
          }
          alt={`${item.name} cover`}
        />
        <p>{item.name}</p>
      </Link>
    </li>
  )
}

function Loading() {
  return (
    <ul className="hidden peer-focus:flex flex-col gap-1 border absolute top-10 w-full bg-white shadow-lg z-10 rounded-bl-[20px] rounded-br-[20px] p-2 border-pink-600">
      <li className="p-2">
        <LoaderCircle className="animate-spin mx-auto" />
      </li>
    </ul>
  )
}
