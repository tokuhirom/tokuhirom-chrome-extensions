// 指定された要素内に「フォローする」というテキストを持つ <span> があるかどうかをチェックし、要素を非表示にする
function hideFollowElements(feedUnit) {
  const spans = feedUnit.getElementsByTagName('span');
  for (let span of spans) {
    if (span.innerHTML.includes('フォローする') || span.innerHTML.includes('広告') || span.innerHTML.includes('参加する')) {
      feedUnit.style.display = 'none';
      break;
    }
  }
}

// 初期ロード時に既存の要素をチェック
document.querySelectorAll('[data-pagelet^="FeedUnit_"]').forEach(hideFollowElements);

// MutationObserverを設定して、新しい要素が追加されたときにチェック
const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(node => {
      if (node.nodeType === 1 && node.matches('[data-pagelet^="FeedUnit_"]')) {
        hideFollowElements(node);
      }
    });
  });
});

// body要素を監視
observer.observe(document.body, { childList: true, subtree: true });

