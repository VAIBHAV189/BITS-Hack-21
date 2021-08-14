function authenticate() {
return gapi.auth2.getAuthInstance()
    .signIn({scope: "https://www.googleapis.com/auth/adsense https://www.googleapis.com/auth/adsense.readonly"})
    .then(function() { console.log("Sign-in successful"); },
            function(err) { console.error("Error signing in", err); });
}
function loadClient() {
gapi.client.setApiKey("YOUR_API_KEY");
return gapi.client.load("https://adsense.googleapis.com/$discovery/rest?version=v2")
    .then(function() { console.log("GAPI client loaded for API"); },
            function(err) { console.error("Error loading GAPI client for API", err); });
}
// Make sure the client is loaded and sign-in is complete before calling this method.
function execute() {
return gapi.client.adsense.accounts.payments.list({
    "parent": "accounts/pub-4180229060344500"
})
    .then(function(response) {
            // Handle the results here (response.result has the parsed body).
            console.log("Response", response);
            },
            function(err) { console.error("Execute error", err); });
}
gapi.load("client:auth2", function() {
gapi.auth2.init({client_id: "805748317470-o684skg1ud5jclpnq78l43bke1bu1qrk.apps.googleusercontent.com"});
});

