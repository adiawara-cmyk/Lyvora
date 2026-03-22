const path = require("path");

process.chdir(path.join(__dirname, "..", "apps", "api"));
require("child_process").execFileSync(
  process.execPath,
  [
    require.resolve("@nestjs/cli/bin/nest.js"),
    "start",
    "--watch",
  ],
  { stdio: "inherit", env: { ...process.env, NODE_ENV: "development" } },
);
