export default {
  name: 'bilibili-workshop',
  displayName: 'B站工房',
  description: '在UP主主页和视频页添加工房入口',
  author: 'your-name',

  entry: async () => {
    console.log('[B站工房] 组件加载成功');

    const uid =
      window.__INITIAL_STATE__?.videoData?.owner?.mid ||
      window.__INITIAL_STATE__?.space?.info?.mid;

    if (!uid) return;

    insertButton(uid);
  },
};

function insertButton(uid) {
  const timer = setInterval(() => {
    const shareBtn =
      document.querySelector('.video-share') ||
      document.querySelector('.h-action');

    if (!shareBtn) return;

    clearInterval(timer);

    const btn = document.createElement('button');
    btn.innerText = 'B站工房';
    btn.style.cssText = `
      margin-left: 8px;
      padding: 6px 10px;
      background: #fb7299;
      color: #fff;
      border-radius: 4px;
      cursor: pointer;
      border: none;
    `;

    btn.onclick = () => openWorkshop(uid);

    shareBtn.parentElement.appendChild(btn);
  }, 500);
}

function openWorkshop(uid) {
  let modal = document.getElementById('be-workshop-modal');
  if (modal) return modal.remove();

  modal = document.createElement('div');
  modal.id = 'be-workshop-modal';
  modal.innerHTML = `
    <iframe src="https://m.bilibili.com/space/${uid}/workshop"></iframe>
  `;

  const style = document.createElement('style');
  style.innerHTML = `
    #be-workshop-modal {
      position: fixed;
      right: 40px;
      bottom: 40px;
      width: 375px;
      height: 667px;
      z-index: 999999;
      background: #000;
      border-radius: 30px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0,0,0,.4);
    }
    #be-workshop-modal iframe {
      width: 100%;
      height: 100%;
      border: none;
      background: #fff;
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(modal);
}