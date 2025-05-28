export interface Song {
    trackId: string;
    name: string;
    artist: string;
    album: string;
    addedAt: string;
  }
  
  export interface Playlist {
    _id: string;
    name: string;
    description: string;
    songs: Song[];
  }