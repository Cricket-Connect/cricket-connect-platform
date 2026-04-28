// Simulate the exact logic from the client
const hostname = "zany-eureka-7vppjyg4w7x3g4r-5173.app.github.dev";
const protocol = "https:";

let baseURL = "http://localhost:5000/api";

if (hostname.includes(".app.github.dev")) {
  const backendHost = hostname.replace(
    /-\d+\.app\.github\.dev$/,
    "-5000.app.github.dev"
  );
  baseURL = `https://${backendHost}/api`;
}

console.log("Original hostname:", hostname);
console.log("Backend host:", hostname.replace(/-\d+\.app\.github\.dev$/, "-5000.app.github.dev"));
console.log("Final API URL:", baseURL);
