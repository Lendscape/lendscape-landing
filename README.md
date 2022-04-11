# lendscape-landing

## Frontend setup with Webpack

Setup with npm:

```bash
cd lendscape-landing/webpack
npm i
```

Setup with yarn:

```bash
cd lendscape-landing/webpack
yarn
```

This will generate the `node_modules` folder, containing all required packages for building, bundling, transforming and packaging the frontend CSS and JS assets.

## Building the frontend assets
Within the `lendscape-landing/webpack` folder you can run the following commands to build the assets:


`npm run build` or `yarn build` - This will build the required CSS and JS files within a new `dist` folder. This is used for development environments.

`npm run watch` or `yarn watch` - This will build the required CSS and JS files within a new `dist` folder, plus add a watcher to watch for any file changes. This is used for development environments.

`npm run prod` or `yarn prod` - This will build the required CSS and JS files within a new `dist` folder. This should be run to create the assets for the production environment (minified assets, sourcemaps removed etc).

<br>

## Viewing Changes in the Browser

For now, you can simply open the [index.html](/lendscape-landing\index.html) in a browser to view any changes. As the site grows we will add in local webserver to view any local changes made. It's not currently necessary for the basic assets we're working with.