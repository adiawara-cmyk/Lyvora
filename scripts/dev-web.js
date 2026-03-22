const { spawn } = require("child_process");
const path = require("path");

const cwd = path.join(__dirname, "..", "apps", "web");
const child = spawn("node", ["node_modules/next/dist/bin/next", "dev", "--port", "3000"], {
  cwd,
  stdio: "inherit",
  env: { ...process.env, NODE_ENV: "development" },
});

child.on("exit", (code) => process.exit(code || 0));
