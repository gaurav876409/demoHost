(function (w, d) {
    w.luxiaChatEmbed = function () {
        let script = d.currentScript || d.querySelector("script[data-url]");
        if (!script) {
            console.error("LuxiaChat: Script tag with required attributes not found.");
            return;
        }

        let data = getScriptAttributes(script);

        let cache_version = Date.now(),
            public_url = data.url,
            hostname = new URL(public_url).origin,
            $bubble,
            $iframe,
            $embed_wrapper,
            $chat_wrapper,
            $chat_wrapper_header,
            $chat_wrapper_content,
            $chat_wrapper_close_control;

        function getScriptAttributes(script) {
            return {
                parent_id: script.getAttribute("data-parent-id"),
                url: script.getAttribute("data-url"),
                type: script.getAttribute("data-type") || "bubble",
                text: script.getAttribute("data-text") || "Start Chat",
            };
        }

        function _createEl(o) {
            let type = o.type || "div",
                $el = document.createElement(type);

            for (const key of Object.keys(o)) {
                if (key !== "attrs" && key !== "type") $el[key] = o[key];
            }

            if (o.attrs) {
                for (let key of Object.keys(o.attrs)) {
                    let value = o.attrs[key];
                    key = key.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
                    $el.setAttribute(key, value);
                }
            }

            return $el;
        }

        function createBubble() {
            let $bubble = _createEl({
                type: "div",
                className: "app-cogency-chat-embed-bubble",
                attrs: {},
            });

            let $icon = _createEl({
                type: "div",
                className: "bubble-icon",
                attrs: {},
            });

            $bubble.appendChild($icon);
            $bubble.addEventListener("click", showChat);

            return $bubble;
        }

        function showChat(event) {
            event.preventDefault();
            createBubbleChatWrapper();
            let is_shown = $embed_wrapper.getAttribute("data-is-shown") === "true";
            $embed_wrapper.setAttribute("data-is-shown", !is_shown);
        }

        function createBubbleChatWrapper() {
            if ($chat_wrapper) return;

            $chat_wrapper = _createEl({
                type: "div",
                className: "app-cogency-chat-bubble-embed-wrapper",
            });

            $embed_wrapper.appendChild($chat_wrapper);

            $chat_wrapper_header = _createEl({
                type: "div",
                className: "app-cogency-chat-bubble-embed-wrapper-header",
            });

            $chat_wrapper_content = _createEl({
                type: "div",
                className: "app-cogency-chat-bubble-embed-wrapper-content",
            });

            $chat_wrapper.appendChild($chat_wrapper_header);
            $chat_wrapper.appendChild($chat_wrapper_content);

            $iframe = createIframe();
            $chat_wrapper_content.appendChild($iframe);

            $chat_wrapper_close_control = _createEl({
                type: "a",
                className: "app-cogency-chat-bubble-embed-wrapper-close-control",
                attrs: { href: "#" },
            });

            $chat_wrapper_header.appendChild($chat_wrapper_close_control);
            $chat_wrapper_close_control.addEventListener("click", showChat);
        }

        function createIframe() {
            let $iframe = _createEl({
                type: "iframe",
                className: "app-cogency-chat-embed-iframe",
                attrs: {
                    src: public_url,
                    frameborder: 0,
                    allowfullscreen: "allowfullscreen",
                    scrolling: "no",
                },
            });

            $iframe.addEventListener("load", () => iframeAutoResize(670));
            $iframe.addEventListener("error", (event) => console.error("Error loading iframe:", event));

            return $iframe;
        }

        function iframeAutoResize(height) {
            if (height) {
                let h = ~~height + 30;
                $iframe.style.height = `${h}px`;
                $iframe.style.minHeight = `${h}px`;
            }
        }

        function loadBubble() {
            $bubble = createBubble();
            document.body.appendChild($embed_wrapper);
            $embed_wrapper.appendChild($bubble);
        }

        function _onChannelLinkLoaded() {
            let parent_id = data.parent_id;
            $embed_wrapper = d.querySelector(`#${parent_id}`);

            if (!$embed_wrapper) {
                console.error(`Element with id ${parent_id} not found.`);
                return;
            }

            if (data.type === "bubble") loadBubble();
            else $embed_wrapper.appendChild(createIframe());
        }

        let scripts = [
            "https://cdn.jsdelivr.net/gh/gaurav876409/demoHost@main/script1.js",
            "https://cdn.jsdelivr.net/gh/gaurav876409/demoHost@main/style.css",
        ];

        Promise.all(scripts.map((url) => {
            if (url.endsWith(".css")) return new Promise((resolve) => {
                let link = d.createElement("link");
                link.rel = "stylesheet";
                link.href = `${url}?v=${cache_version}`;
                link.onload = resolve;
                d.head.appendChild(link);
            });
            else return new Promise((resolve, reject) => {
                let script = d.createElement("script");
                script.src = `${url}?v=${cache_version}`;
                script.onload = resolve;
                script.onerror = () => reject(Error(`${url} failed to load`));
                d.head.appendChild(script);
            });
        }))
            .then(() => {
                console.log("Embed resources loaded!");
                $embed_wrapper = _createEl({
                    type: "div",
                    id: "cogency-embed-wrapper",
                    className: "cogency-embed-wrapper",
                });

                d.body.appendChild($embed_wrapper);
                _onChannelLinkLoaded();
            })
            .catch((err) => console.error("Error loading embed resources:", err));
    };
})(window, document);
