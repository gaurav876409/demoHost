(function (w, d) {
    function getScriptAttributes(script) {
        return {
            parent_id: script.getAttribute("data-parent-id"),
            url: script.getAttribute("data-url"),
            type: script.getAttribute("data-type") || "bubble",
            text: script.getAttribute("data-text") || "Start Chat",
        };
    }

    function loadExternalResource(url, type = "js") {
        return new Promise((resolve, reject) => {
            let el;
            if (type === "css") {
                el = d.createElement("link");
                el.rel = "stylesheet";
                el.href = url;
                el.onload = resolve;
            } else {
                el = d.createElement("script");
                el.src = url;
                el.onload = resolve;
            }
            el.onerror = () => reject(Error(`${url} failed to load`));
            d.head.appendChild(el);
        });
    }

    function initializeChat(data) {
        if (!data.url || !data.parent_id) {
            console.error("Missing required data attributes.");
            return;
        }

        let parent = d.getElementById(data.parent_id);
        if (!parent) {
            console.error(`Element with ID '${data.parent_id}' not found.`);
            return;
        }

        let chatBubble = d.createElement("div");
        chatBubble.className = "chat-bubble";
        chatBubble.textContent = data.text;
        chatBubble.onclick = function () {
            let iframe = d.createElement("iframe");
            iframe.src = data.url;
            iframe.className = "chat-iframe";
            parent.appendChild(iframe);
        };
        
        parent.appendChild(chatBubble);
    }

    let currentScript = d.currentScript || d.querySelector("script[data-url]");
    if (currentScript) {
        let data = getScriptAttributes(currentScript);
        Promise.all([
            loadExternalResource("https://cdn.jsdelivr.net/gh/gaurav876409/demoHost@main/style.css", "css"),
            loadExternalResource("https://cdn.jsdelivr.net/gh/gaurav876409/demoHost@main/script1.js")
        ]).then(() => {
            initializeChat(data);
        }).catch(err => console.error("Error loading chat resources:", err));
    }
})(window, document);
