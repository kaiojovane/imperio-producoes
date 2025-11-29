export interface ArtistStats {
  shows: number;
  streams: string;
  followers: string;
}

export interface Album {
  year: number;
  title: string;
  cover: string;
}

export interface Artist {
  id: number;
  name: string;
  genre: string;
  image: string;
  location: string;
  description: string;
  instagram: string;
  youtube: string;
  videoID: string;
  spotifyID: string;
  stats: ArtistStats;
  albums: Album[];
  instagramFeed: string[];
}
