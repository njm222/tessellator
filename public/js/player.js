window.onSpotifyWebPlaybackSDKReady = () => {
    const token = 'BQD4hrMBpO5rDMXza2ObCHi3Xj_qEsc6_3d2PIQfIkPCnj0dDEphn4cezktnBnqvyBb0J57diblxAOhdmwoTaiWgxyDOJKx6ITSlTOsv2uzIoMnmU6Tpp1M0hITi_I737Tuk_gDeZRwFguAqrp9tsSSqzqbrO5T1drA\n';
    const player = new Spotify.Player({
        name: 'Web Playback Player',
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
            spotify_uri: 'spotify:track:5dWHtjiNIQqsLfkNfQbrI9',
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
