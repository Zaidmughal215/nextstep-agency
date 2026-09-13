/** Keep .nojekyll after static export so GitHub Pages serves _next/ correctly. */
const fs = require("fs");
const path = require("path");
const f = path.join(__dirname, "..", "out", ".nojekyll");
try {
  fs.writeFileSync(f, "");
  console.log("wrote out/.nojekyll");
} catch (e) {
  console.warn("nojekyll skip:", e.message);
}
