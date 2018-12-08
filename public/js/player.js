window.onSpotifyWebPlaybackSDKReady = () => {
    const token = 'BQCMQGhgUoR7fCvpVBPvEupsCW41W4u6WrtNO5Sr5ds5Ac0PoojeFA3u8up_mMuPJ-tuB4hLwoI4UK5_XckvZblJDsK42FFle9IS9TGkOQMF9fmrWs1DrjiI_d9hfPnaUvFZq1a3tu3NUgkHuR9gZh4z1TQcEMWfw8W1U9kAnVj2YA\n';
    const player = new Spotify.Player({
        name: 'Visualizer Player',
        getOAuthToken: cb => { cb(token); }
    });

    // Error handling
    player.addListener('initialization_error', ({ message }) => { console.error(message); });
    player.addListener('authentication_error', ({ message }) => { console.error(message); });
    player.addListener('account_error', ({ message }) => { console.error(message); });
    player.addListener('playback_error', ({ message }) => { console.error(message); });

    // Playback status updates
    player.addListener('player_state_changed', state => { console.log(state); });

    // Ready
    player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        play({
            spotify_uri: 'spotify:track:0GMAjrdGex5LHbLBzexcpa',
            playerInstance: (player),
        });
    });

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
    });

    // Connect to the player!
    player.connect();

    const play = ({
                      spotify_uri,
                      playerInstance: {
                          _options: {
                              getOAuthToken,
                              id
                          }
                      }
                  }) => {
        getOAuthToken(access_token => {
            fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
                method: 'PUT',
                body: JSON.stringify({ uris: [spotify_uri] }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                },
            });
        });
    };
};
