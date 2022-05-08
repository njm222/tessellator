import { useState } from "react";
import Image from "next/image";

const Playlist = (props) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="playlist">
      <Image
        width={"100px"}
        height={"100px"}
        alt={"playlist image"}
        src={props.images[0]?.url}
      />
      <h6>{props.name}</h6>
    </div>
  );
};

export default Playlist;
