// 指定された要素内に「フォローする」というテキストを持つ <span> があるかどうかをチェックし、要素を非表示にする
function hideFollowElements(feedUnit) {
    if (feedUnit.innerHTML.includes('フォローする') || feedUnit.innerHTML.includes('広告') || feedUnit.innerHTML.includes('参加する') || feedUnit.innerHTML.includes('おすすめのグループがあります')) {
        feedUnit.style.display = 'none';
        return;
    }

    // hide リール
    const spans = feedUnit.getElementsByTagName('span');
    for (let i = 0; i < spans.length; i++) {
        if (spans[i].textContent.trim() === 'リール') {
            feedUnit.style.display = 'none';
            return;
        }
    }
}

// 初期ロード時に既存の要素をチェック
document.querySelectorAll('[data-pagelet^="FeedUnit_"]').forEach(hideFollowElements);
document.querySelectorAll('div[data-pagelet="Stories"]').forEach(it => it.style.display = 'none');


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

