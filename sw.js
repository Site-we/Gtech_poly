self.addEventListener("fetch", (event) => {
    event.respondWith(
        (async () => {
            const url = new URL(event.request.url);
            const userAgent = event.request.headers.get("user-agent");
            const allowedUserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36";

            // Allow access if `?user=admin` is in the URL
            if (url.searchParams.get("user") === "admin") {
                return fetch(event.request);
            }

            // Otherwise, restrict access to the allowed WebView User-Agent
            if (userAgent !== allowedUserAgent) {
                return new Response("<h2>Access Denied</h2><p>This webpage can only be viewed inside the official app.</p>", {
                    headers: { "Content-Type": "text/html" }
                });
            }

            return fetch(event.request);
        })()
    );
});
