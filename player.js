const video = document.getElementById('video');
const channelList = document.getElementById('channelList');

function loadChannels() {
  const saved = JSON.parse(localStorage.getItem('channels') || '[]');
  channelList.innerHTML = '';
  saved.forEach((ch, i) => {
    const btn = document.createElement('button');
    btn.textContent = ch.name;
    btn.onclick = () => playStream(ch.url);
    channelList.appendChild(btn);
  });
}

function addChannel() {
  const name = document.getElementById('channelName').value.trim();
  const url = document.getElementById('channelUrl').value.trim();
  if (!name || !url.endsWith('.m3u8')) {
    alert('Please enter a valid channel name and .m3u8 URL');
    return;
  }

  const channels = JSON.parse(localStorage.getItem('channels') || '[]');
  channels.push({ name, url });
  localStorage.setItem('channels', JSON.stringify(channels));
  loadChannels();

  document.getElementById('channelName').value = '';
  document.getElementById('channelUrl').value = '';
}

function playStream(url) {
  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(url);
    hls.attachMedia(video);
    hls.on(Hls.Events.ERROR, function (event, data) {
      console.error('HLS.js error:', data);
      alert('❌ Playback error. The stream may be blocked by CORS or unavailable.');
    });
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = url;
    video.addEventListener('error', () => {
      alert('❌ Native playback error. The stream may not be supported.');
    });
  } else {
    alert('❌ Your browser does not support HLS playback.');
  }
}

loadChannels();