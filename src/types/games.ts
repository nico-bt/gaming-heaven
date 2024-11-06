export interface GameDetails {
  id: number
  category: number
  cover: {
    id: number
    image_id: string
    url: string
    height: number
    width: number
  }
  first_release_date: number
  genres: number[]
  involved_companies: number[]
  name: string
  platforms: number[]
  screenshots: number[]
  similar_games: number[]
  slug: string
  storyline: string
  summary: string
  tags: number[]
  url: string
  videos: number[]
  checksum: string
}

export interface Game {
  id: number
  cover: {
    id: number
    image_id: string
    url: string
    height: number
    width: number
  }
  name: string
}