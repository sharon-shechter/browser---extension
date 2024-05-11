chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "improveEnglish",
        title: "Improve English",
        contexts: ["selection"]
    });
    chrome.contextMenus.create({
        id: "improveEnglishCreative",
        title: "Improve English - Creative",
        contexts: ["selection"]
    });
    chrome.contextMenus.create({
        id: "addCommentsToCode",
        title: "Add comments to code",
        contexts: ["selection"]
    });
    chrome.contextMenus.create({
        id: "summarizeText",
        title: "Summarize to a single paragraph",
        contexts: ["selection"]
    });
    chrome.contextMenus.create({
        id: "aiQuiz",
        title: "AI Quiz",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (["improveEnglish", "improveEnglishCreative", "addCommentsToCode", "summarizeText", "aiQuiz"].includes(info.menuItemId)) {
        chrome.tabs.sendMessage(tab.id, {
            action: "processText",
            menuItemId: info.menuItemId,
            text: info.selectionText
        });
    }
});
