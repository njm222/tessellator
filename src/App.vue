<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/dashboard">Dashboard</router-link> |
      <router-link to="/community">Community</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Tomorrow&display=swap');

html {
  min-height: 100vh;
}
body {
  width: 100%;
  height: 100%;
  margin: 0 0 15vh 0;
  padding: 0;
  overflow-x: hidden;
  color: #FFF;
  text-align: center;
  font: 14px 'Tomorrow', sans-serif;
  letter-spacing: 2px;
  background: #121212;
  background: linear-gradient(#121212 40%, #2F3931 100%);
}

body:after {
  content:"";
  height: 100%;
  position: fixed;
  top:0;
  bottom:0;
  left:0;
  right:0;
  z-index:-1;
  background-image: url(data:image/png;base64,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);
}

#app {
  width: 100%;
  height: 100%;
}

#nav {
  padding: 30px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

a {
  color: #FFF;
  text-decoration: none;
}

a:hover, a:focus {
  font-weight: bold;
  color: #D31E1E;
  text-decoration: none;
}

.btn {
  cursor: pointer;
  display: inline-block;
  font-weight: 400;
  color: #FFF;
  text-align: center;
  vertical-align: middle;
  background-color: transparent;
  border: 1px solid transparent;
  padding: .375rem .75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: .25rem;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}

.btn.primary {
  background-color: #44644B;
  border-color: #44644B;
}

.btn.secondary {
  background-color: #3AD36B;
  border-color: #3BD36B;
}

.btn.primary:hover,
.btn.secondary:hover {
  background-color: #0069d9;
  border-color: #0062cc;
  font-weight: bolder;
}

.home-container {
  display: flex;
  justify-content: space-around;
}

.icon {
  margin: 0 10px;
  height: 18px;
  width: 18px;
  display: block;
  background-color: #b3b3b3;
  mask-size: contain;
  mask-repeat: no-repeat;
}

.icon:hover {
  background-color: #FFF;
  width: 20px;
  height: 20px;
}

.icon.next {
  mask-image: url('assets/icons/next-track-button.svg');
}

.icon.prev {
  mask-image: url('assets/icons/previous-track.svg');
}

.icon.play {
  mask-image: url('assets/icons/play-button-inside-a-circle.svg');
  height: 30px;
  width: 30px;
}

.icon.pause {
  mask-image: url('assets/icons/rounded-pause-button.svg');
  height: 30px;
  width: 30px;
}

.icon.heart {
  mask-image: url('assets/icons/heart.svg');
  height: 25px;
  width: 25px;
}

.icon.heart.on {
  background-color: #d31e1e;
}

.icon.play:hover {
  height: 35px;
  width: 35px;
}

.icon.pause:hover {
  height: 35px;
  width: 35px;
}

.icon.shuffle {
  mask-image: url('assets/icons/shuffle.svg');
  width: 20px;
  height: 20px;
}

.icon.shuffle.on {
  background-color: #42b983;
}

.icon.shuffle.on:hover {
  background-color: #3AD36B;
}

.fade-enter-active, .fade-leave-active {
  transition: all 1s ease-in-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.fadeUp-enter-active, .fadeUp-leave-active {
  transition: all 1s ease-in-out;
}
.fadeUp-enter, .fadeUp-leave-to {
  opacity: 0;
  transform: translateY(100vh);
}

.fadeLeft-enter-active, .fadeLeft-leave-active {
  transition: all 1s ease-in-out;
}
.fadeLeft-enter, .fadeLeft-leave-to {
  opacity: 0;
  transform: translateX(40vw);
}

.fadeRight-enter-active, .fadeRight-leave-active {
  transition: all 1s ease-in-out;
}
.fadeRight-enter, .fadeRight-leave-to {
  opacity: 0;
  transform: translateX(-40vw);
}
</style>
