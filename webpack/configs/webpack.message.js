const s = {
  Reset: "\x1b[0m",
  Bright: "\x1b[1m",
  Dim: "\x1b[2m",
  Underscore: "\x1b[4m",
  Blink: "\x1b[5m",
  Reverse: "\x1b[7m",
  Hidden: "\x1b[8m",

  FgBlack: "\x1b[30m",
  FgRed: "\x1b[31m",
  FgGreen: "\x1b[32m",
  FgYellow: "\x1b[33m",
  FgBlue: "\x1b[34m",
  FgMagenta: "\x1b[35m",
  FgCyan: "\x1b[36m",
  FgWhite: "\x1b[37m",

  BgBlack: "\x1b[40m",
  BgRed: "\x1b[41m",
  BgGreen: "\x1b[42m",
  BgYellow: "\x1b[43m",
  BgBlue: "\x1b[44m",
  BgMagenta: "\x1b[45m",
  BgCyan: "\x1b[46m",
  BgWhite: "\x1b[47m",
};

const displayConsoleMessage = (entrypoints) => {
  console.log(s.Reset + "\n--------------------");
  console.log(
    [s.FgGreen, s.Bright].join("") +
      `
        _______                               
.-----.|    ___|.----..---.-..--------..-----.
|     ||    ___||   _||  _  ||        ||  -__|
|__|__||___|    |__|  |___._||__|__|__||_____|
`
  );
  console.log(
    `Version ${process.env.npm_package_version} || Powered by Webpack`
  );
  console.log(
    [s.Reset, s.Underscore, s.FgGreen].join("") + `\n=== BUNDLES ===`
  );
  Object.entries(entrypoints).map(e =>
    console.log(s.Reset + `${e[0]} => ${e[1]}`)
  );
  console.log(s.Reset + "\n--------------------\n");
};

module.exports = displayConsoleMessage;
