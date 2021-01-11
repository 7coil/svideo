# svideo for Scratch

Convert video into MIT Scratch!

## Using

If cloning from GitHub, build, then use `node ./dist/cli.js` to access the command line interface.
You (should) be able to also use `npm i -g 7coil/svideo` and then use `svideo` to access the CLI as well (untested).

### Embedding

(Not fully working 😢)
`npm i -g 7coil/svideo`

```ts
import { App } from "svideo";

(async () => {
  new App();

  await app.setFile("wooper.mp4");
  app.setSubtitlesFile("wooper.en.vtt");
  app.setOutputFile("wooper.sb3");

  await app.convert();
})();
```

## Help

For support, try [my discord server ✨](https://discordapp.com/invite/wHgdmf4).

## Licence

This project is licenced under the MIT licence. Because it's MIT Scratch. Haha.
