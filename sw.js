self.addEventListener("fetch", (event) => {
    event.respondWith(
        (async () => {
            const userAgent = event.request.headers.get("user-agent");
            const allowedUserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36";
            
            if (userAgent !== allowedUserAgent) {
                return new Response("<h2>Access Denied</h2><p>This webpage can only be viewed inside the Gtech-poly Unofficial app.</p>", {
                    headers: { "Content-Type": "text/html" }
                });
            }
            
            return fetch(event.request);
        })()
    );
});
