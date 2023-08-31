import React, { MouseEvent, useEffect, useRef } from "react";
import { convertURItoURL } from "core";
import { LoaderDots, PlayerControls, ProgressBar, TrackDetails } from "ui";

import { ImageWrapper } from "../../../helpers/ImageWrapper";
import { useAnalyser } from "../../../utils/analyserContext";
import { usePlayer } from "../../../utils/playerContext";
import { useCheckSavedTrack } from "../../../utils/spotify";
import { mutations } from "../../../utils/store";
import { useMouseActivity } from "../controls/mouseActivityContext";

export function Player() {
  const { audioAnalyser, analyserOptions } = useAnalyser();
  const {
    player,
    play,
    pause,
    next,
    prev,
    save,
    shuffle,
    removeSaved,
    seek,
    spotifyAnalyser,
  } = usePlayer();
  const { mouseActive } = useMouseActivity();
  const { data: isSaved } = useCheckSavedTrack(
    player?.track_window.current_track.id
  );
  const initialTime = useRef(0);
  const timerRef = useRef<NodeJS.Timeout>();
  const progressBarRef = useRef<HTMLDivElement>(null);

  function handleSeek({ clientX }: MouseEvent<HTMLElement>) {
    if (!progressBarRef.current) return;
    const barProperties = progressBarRef.current?.getBoundingClientRect();
    const percentageOfBarClicked =
      (clientX - barProperties.left) / barProperties.width;
    seek(percentageOfBarClicked * player?.duration);
    clearInterval(timerRef.current);

    (
      progressBarRef.current.getElementsByClassName(
        "progressBar"
      )[0] as HTMLDivElement
    ).style.width = (percentageOfBarClicked * 100).toString() + "%";
  }

  useEffect(() => {
    clearInterval(timerRef.current);

    if (player?.paused) {
      return;
    }

    initialTime.current = new Date().getTime();
    timerRef.current = setInterval(() => {
      const currentTime = new Date().getTime();
      const delay = currentTime - initialTime.current;
      initialTime.current = currentTime;
      mutations.position += delay;
      if (progressBarRef.current) {
        // update progress bar
        (
          progressBarRef.current.getElementsByClassName(
            "progressBar"
          )[0] as HTMLDivElement
        ).style.width = (mutations.position * 100) / player?.duration + "%";
      }
    }, 10);
  }, [player]);

  // resolves autoplay podcast issue
  useEffect(() => {
    if (!player.paused && !audioAnalyser.source) pause();
  }, [audioAnalyser.source, player, pause]);

  function handlePlay() {
    play();
    if (audioAnalyser.source) {
      return;
    }
    audioAnalyser.setup(analyserOptions);
  }

  // if (!spotifyAnalyser.tatums)
  //   return (
  //     <div
  //       className={`playerContainer ${
  //         !mouseActive && !player?.paused && "hidden"
  //       }`}
  //     >
  //       <h5 className="loading">loading player</h5>
  //     </div>
  //   );

  return (
    <div
      className={`playerContainer ${
        !mouseActive && !player?.paused && "hidden"
      }`}
    >
      <div className="playerLeft">
        <ImageWrapper
          alt="album art"
          height="75"
          src={player?.track_window.current_track.album.images[0].url}
          width="75"
        />
      </div>
      <div className="playerCenter">
        {spotifyAnalyser.tatums ? (
          <PlayerControls
            isPaused={player?.paused}
            isSaved={isSaved}
            isShuffle={player?.shuffle}
            onNext={next}
            onPause={pause}
            onPlay={handlePlay}
            onPrev={prev}
            onSave={() =>
              isSaved
                ? removeSaved(player?.track_window.current_track.id)
                : save(player?.track_window.current_track.id)
            }
            onShuffle={() => shuffle(!player?.shuffle)}
          />
        ) : (
          <div className="playerLoader">
            <p className="loading text">loading player</p>
            <LoaderDots dotVariant={6} />
          </div>
        )}
        <ProgressBar onSeek={handleSeek} ref={progressBarRef} />
      </div>
      <div className="playerRight">
        <TrackDetails
          trackArtists={player?.track_window.current_track.artists.map(
            ({ name, uri }) => ({ name, link: convertURItoURL(uri) })
          )}
          trackLink={convertURItoURL(player?.track_window.current_track.uri)}
          trackName={player?.track_window.current_track.name}
        />
      </div>
    </div>
  );
}
