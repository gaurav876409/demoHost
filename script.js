(function (w, d) {
    w.luxiaChatEmbed = function (data) { // Function to initialize with user config
      let cache_version = data?.timestamp || 1,
        public_url = data.url,
        hostname = null,
        $bubble,
        $iframe,
        $embed_wrapper,
        $chat_wrapper,
        $chat_wrapper_header,
        $chat_wrapper_content,
        $chat_wrapper_close_control;
  
      let _createEl = (o) => {
        let type = o.type || "div",
          $el = document.createElement(type);
  
        for (const key of Object.keys(o)) {
          if (key != "attrs" && key != "type") $el[key] = o[key];
        }
  
        if (o.attrs) {
          for (let key of Object.keys(o.attrs)) {
            let value = o.attrs[key];
  
            if (key != key.toLowerCase())
              key = key.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
  
            $el.setAttribute(key, value);
          }
        }
  
        return $el;
      };
  
      let _fetchCSS = (url) => {
        return new Promise((resolve, reject) => {
          let link = d.createElement("link");
          link.type = "text/css";
          link.rel = "stylesheet";
          link.onload = () => {
            resolve();
            console.log("cogency-embed css has loaded!");
          };
          link.href = `${url}?v=${cache_version}`;
  
          let head_script = d.querySelector("script");
          head_script.parentNode.insertBefore(link, head_script);
        });
      };
  
      let _fetchJS = (url) => {
        return new Promise((resolve, reject) => {
          let script = d.createElement("script");
          script.src = `${url}?v=${cache_version}`;
          script.onload = resolve;
          script.onerror = (e) => reject(Error(`${url} failed to load`));
          d.head.appendChild(script);
        });
      };
  
      let _fetchScripts = (url) => {
        if (/\.css$/.test(url)) return _fetchCSS(url);
        else return _fetchJS(url);
      };
  
      let showChat = (event) => {
        event.preventDefault();
  
        createBubbleChatWrapper();
  
        let is_shown = $embed_wrapper.getAttribute("data-is-shown") == "true";
  
        $embed_wrapper.setAttribute("data-is-shown", !is_shown);
      };
  
      let createBubbleChatWrapper = () => {
        if ($chat_wrapper) return;
  
        //lets create the chat wrapper
        $chat_wrapper = _createEl({
          type: "div",
          className: `app-cogency-chat-bubble-embed-wrapper`,
          attrs: {},
        });
        $embed_wrapper.appendChild($chat_wrapper);
  
        $chat_wrapper_header = _createEl({
          type: "div",
          className: `app-cogency-chat-bubble-embed-wrapper-header`,
          attrs: {},
        });
        $chat_wrapper_content = _createEl({
          type: "div",
          className: `app-cogency-chat-bubble-embed-wrapper-content`,
          attrs: {},
        });
        $chat_wrapper.appendChild($chat_wrapper_header);
        $chat_wrapper.appendChild($chat_wrapper_content);
  
        //lets load the iframe
        $iframe = createIframe(["is_bubble=true"]);
        $chat_wrapper_content.appendChild($iframe);
  
        $chat_wrapper_close_control = _createEl({
          type: "a",
          className: `app-cogency-chat-bubble-embed-wrapper-close-control`,
          attrs: {
            href: "#",
          },
        });
        $chat_wrapper_header.appendChild($chat_wrapper_close_control);
  
        $chat_wrapper_close_control.addEventListener("click", showChat);
      };
  
      let getType = () => {
        return data?.type;
      };
  
      let createBubble = () => {
        let $bubble = _createEl({
          type: "div",
          className: "app-cogency-chat-embed-bubble",
          attrs: {},
        }),
          $icon = _createEl({
            type: "div",
            className: `bubble-icon`,
            attrs: {},
          });
  
        $bubble.appendChild($icon);
  
        $bubble.addEventListener("click", showChat);
  
        return $bubble;
      };
  
      let createIframe = () => {
        let $iframe = _createEl({
          type: "iframe",
          className: "app-cogency-chat-embed-iframe",
          innerHTML: data?.options?.text,
          attrs: {
            src: public_url,
            frameborder: 0,
            allowfullscreen: "allowfullscreen",
            scrolling: "no",
          },
        });
  
        $iframe.addEventListener("load", onIframeLoaded);
  
        return $iframe;
      };
  
      let iframeAutoResize = (height) => {
        if (height) {
          let h = ~~height + 30;
          $iframe.style.height = `${h}px`;
          $iframe.style.minHeight = `${h}px`;
        }
      };
  
      let isBubble = () => {
        return getType() === "bubble";
      };
  
      let isIframe = () => {
        return getType() === "iframe";
      };
  
      onIframeLoaded = (event) => {
        let is_bubble = isBubble();
  
        if (is_bubble) iframeAutoResize(670);
      };
  
      let loadBubble = () => {
        $bubble = createBubble();
        document.querySelector("body").appendChild($embed_wrapper);
        $embed_wrapper.appendChild($bubble);
      };
  
      let loadStandaloneIframe = ($target = $embed_wrapper, callback) => {
        $iframe = createIframe();
  
        //adding post message event listener
        window.addEventListener("message", (event) => {
          if (!event.origin.match(hostname)) return;
  
          iframeAutoResize(event.data?.height);
        });
  
        $target.appendChild($iframe);
      };
  
      let _onChannelLinkLoaded = () => {
        let parent_id = data.parent_id;
  
        $embed_wrapper = d.querySelector(`#${parent_id}`);
        console.log($embed_wrapper);
  
        if (!$embed_wrapper) return;
  
        if (isBubble()) loadBubble();
        else loadStandaloneIframe();
      };
  
      let scripts = [
        // "https://cogency.io/shared/js/vendors/axios.min.js",
        "https://cdn.jsdelivr.net/gh/gaurav876409/demoHost@main/script1.js",
        // "https://cogency.io/shared/css/app/app.embed-chat.min.css",
        "https://cdn.jsdelivr.net/gh/gaurav876409/demoHost@main/style.css",
      ];
  
      Promise.all(scripts.map(_fetchScripts))
        .then(async () => {
          console.log("embed resources loaded!");
          const chatWrapper = _createEl({
            type: "div",
            id: "cogency-embed-1721331544",
            className: `cogency-embed-wrapper`,
          });
          console.log(chatWrapper, d.body);
  
          d.body.appendChild(chatWrapper);
          _onChannelLinkLoaded();
        })
        .catch((err) => console.error(err));
    };
  })(window, document);
