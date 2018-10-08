window.onSpotifyWebPlaybackSDKReady = () => {
    const token = 'BQAM5VyEr_hkm_7jgF4IcaWGkGmF_O1B413f5CXPXIA3LxwIZZFIrvKpHDavaOHh2cWEnFXwRIgOLw0bioSRJU0rf15hYbWNHw4pisDhv6e7ItKEOdOuh997ffsiTcqqreubhnBvSv2l8DHyfAYZ9oKt3WKaEpcD1Fg\n';
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
            spotify_uri: 'spotify:track:798mI116dJdZ12n9CkdflI',
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
