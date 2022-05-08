import { useEffect, useState } from "react";
import { getUserPlaylists } from "@/spotifyClient";
import Playlist from "./Playlist";

export default function Playlists() {
  const [myPlaylists, setMyPlaylists] = useState([]);

  useEffect(() => {
    (async () => {
      const playlists = await getUserPlaylists();
      setMyPlaylists(playlists.items);
    })();
  }, [setMyPlaylists]);

  return (
    <div className="myPlaylists">
      {myPlaylists.map((playlist) => (
        <Playlist key={playlist.id} {...playlist} />
      ))}
    </div>
  );
}
