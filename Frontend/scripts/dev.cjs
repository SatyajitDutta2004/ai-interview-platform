const net = require("node:net");
const { spawn } = require("node:child_process");
const path = require("node:path");

const port = 5173;
const host = "::1";

const socket = net.createConnection({ host, port });

socket.setTimeout(500);
socket.on("connect", () => {
  socket.destroy();
  console.log(`Vite is already running at http://localhost:${port}/`);
});
socket.on("timeout", startVite);
socket.on("error", startVite);

function startVite() {
  socket.destroy();
  const vitePath = path.resolve("node_modules/vite/bin/vite.js");
  const vite = spawn(process.execPath, [vitePath], {
    stdio: "inherit",
    shell: false,
  });

  vite.on("exit", (code, signal) => {
    if (signal) {
      process.kill(process.pid, signal);
    } else {
      process.exit(code ?? 0);
    }
  });
}
