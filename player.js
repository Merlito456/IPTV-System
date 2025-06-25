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