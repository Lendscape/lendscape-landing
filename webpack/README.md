```
        _______
.-----.|    ___|.----..---.-..--------..-----.
|     ||    ___||   _||  _  ||        ||  -__|
|__|__||___|    |__|  |___._||__|__|__||_____|
```

**Fast, scalable and made to work great with EPiServer**

# Table of Contents

- [Installation](#Installation)
- [Technologies](#Technologies)
- [Customising nFrame](#Customising-nFrame)
- [Standards / Conventions](#Standards-/-Conventions)
  - [SCSS](#Standards-/-Conventions/SCSS)
  - [TypeScript]()
- [Blocks](#Blocks)
  - [SCSS]()
  - [TypeScript]()
- [Pages](#Pages)
  - [SCSS](#Pages/SCSS)
  - [TypeScript]()
  - [Razor]()
- [React Components](#React-Components)
  - [Creating the component]()
  - [Passing data from EPiServer without an API]()
  - [Example component]()

# Installation

**Installing nFrame into an EPiServer project is easy.**

1. Install NPM through Node.js. The best way is to install through [NVM](https://github.com/coreybutler/nvm-windows/releases) so you can switch Node versions if and when needed. The latest version should work fine - `nvm install latest`, then type `nvm list` to see the version number. Finally `nvm use [version number]` to switch to it.
1. Copy the entire contents of this repository into a folder inside your project. `nFrame` is the preferred folder name as you won't need to change anything in the configuration.
1. Inside the nFrame folder, open a command line and type `npm i` to install the dependancies
1. Run whichever build command you'd like, `npm run dev` or `npm run prod`.
1. Inside the `<head>` your `_Root.cshtml`, add a partial that links to your bundle file that's been generated. By default, this will be `@Html.Partial("~/nFrame/dist/_main.cshtml")`

**Extra things to install for frontend developers.**

- Install the [Prettier extension]() for VS Code and enable `Format on Save` as this will make sure everyone's code is clean and stays consistant.

# Technologies

- [SCSS](https://sass-lang.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Webpack](https://webpack.js.org/)
- [Babel](https://babeljs.io/)
- [PostCSS](https://postcss.org/)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)
- [Jest](https://jestjs.io/)
- [Enzyme](https://enzymejs.github.io/enzyme/)
- [Node/NPM through NVM](https://github.com/coreybutler/nvm-windows)

# Customising nFrame

To customize nFrame, you can change the settings in `~/webpack/nFrame.config.js` to suit your projects needs. By default, these settings should be all you need but if you need to do further customization, you can edit the `~/webpack/webpack.*.js` files to suit your needs.

TODO: Abstract further settings into config files from Webpack.

# Standards / Conventions

## SCSS

- Start filename with an underscore and use kebab-case
- Do not include the term block or page in the file name
- Follow [BEM (Block, Element, Modifier)](http://getbem.com/) class naming conventions
- Only import files you need bundled in the main bundle into `~src/scss/index.scss`. This means, do NOT include pages or react component styles here.
- Import variables and mixins through the shared scss file and import them into each file that uses them. _Only include SCSS specific code inside these files as SCSS specific code won't get bundled to CSS and will therefore reduce duplication_

## TypeScript

- Classes and React Components in PascalCase
- Functions and variables in camelCase
- Constants in UPPER_SNAKE_CASE
- Name files with the same naming conventions based on the default/predominant export
- Interfaces should begin with an `I`, E.g. `IComponentProps`
- Avoid using the `any` keyword and type casting, i.e. `example as string`

# Blocks

**NOTE: This guide is only for blocks that aren't primarily driven by React. These are covered in the [Components section](#React-Components)**

## SCSS

1. Create a file in `~/src/scss/_blocks/` and follow naming conventions.
1. Add an import declaration to `~/src/scss/index.scss` under the blocks section and add it in alphabetical order to prevent merge conflicts.

## TypeScript

If your block needs JavaScript functionality

1. Create a file inside `~/src/ts/blocks` and follow naming conventions.
1. Create a [dynamic import](https://v8.dev/features/dynamic-import) inside `~/src/ts/initBlocks.ts`.

Eg.

```ts
const accordion = document.querySelector(".js-accordion");
if (accordion) {
  import("./blocks/accordion").then(e => e.default());
}
```

Use the `default()` method if it's the default export, else use the name of the method.

_You'll want to use a `forEach()` if there are multiple occurances of your block on the page_

# Pages

Pages are special as these are automagically™ split by nFrame and seperate scss is generated on the fly which can be referenced to directly in the page model. This allows for smaller main bundle sizes since we don't need to have page specific CSS on every page.

## SCSS

1. Create a file in `~/src/scss/_pages/` and follow naming conventions.
1. That's it! nFrame will handle the rest

## TypeScript

If your page needs JavaScript functionality, follow the same steps as you did for blocks, however insert these files into `~/src/ts/pages/` and import them into `~/src/ts/initPages.ts`

## Razor

Now you can add the generated CSS file into your Razor view by referencing the generated partial.
Eg.

```cshtml
@Html.Partial("~/nFrame/dist/_page--standard.cshtml")
```

_Note: The generated file name is the name you gave your SCSS file but with `_page--` appended to the beginning_

# React Components

nFrame uses [Preact](https://preactjs.com) which is pretty much the same as React but with some slight differences and with a much smaller size that suits the needs of the majority of our projects.

## Creating the component

1. Inside `~/src/ts/components` create a folder which contains:
   - `{ComponentName}.tsx`
   - `{ComponentName}.styles.scss`
   - `{ComponentName}.tests.tsx` _(optional but recommended)_
1. Code your component, making sure to follow conventions.
1. Create a [dynamic import](https://v8.dev/features/dynamic-import) inside `~/src/ts/initComponents.ts`.

Eg.

```ts
const counterEntry = document.querySelector(".js-counter");
if (counterEntry) {
  import("./components/Counter/Counter").then(e =>
    render(e.default, counterEntry)
  );
}
```

## Passing data from EPiServer without an API

To pass data into a component, we can use data attributes and load them into the components props on intialisation.

Eg.

`/Views/Shared/Profile/index.cshtml`

```cshtml
  <div
    class="js-profile"
    data-name="@Model.Name"
    data-image-url="@Url.ContentUrl(Model.Image)"
    data-image-alt="@Model.Image.GetImageAlt()"
  ></div>
```

`~/src/ts/initComponents.ts`

```ts
import { h } from "preact";

const profileEntry = document.querySelector(".js-profile");
if (profileEntry) {
  const props = profileEntry.dataset;
  import("./components/Profile/Profile").then(e =>
    render(h(e.default, props, null), profileEntry)
  );
}
```

_Note: The second argument to the h function is the props you want to pass down_

`~/src/ts/components/Profile/Profile.tsx`

```tsx
import { h } from "preact";

import "./Profile.styles.scss";

interface IProfileProps {
  name: string;
  imageUrl: string;
  imageAlt: string;
}

const Profile = (props: IProfileProps) => (
  <div class="profile">
    <img src={props.imageUrl} alt={props.imageAlt} />
    <h1>{props.name}</h1>
  </div>
);

export default Profile;
```

_Note: Data attributes get converted from kebab-case to camelCase when referenced from the dataset property_

## Example component

`~/src/ts/components/Counter/Counter.tsx`

```tsx
import { h } from "preact";
import { useState } from "preact/hooks";

import "./Counter.styles.scss";

const Counter = () => {
  const [count, setCount] = useState<number>(0);
  return (
    <div class="counter">
      <h1 class="counter__title">Current count is {count}</h1>
      <button class="counter__button" onClick={() => setCount(count + 1)}>
        Increase Count
      </button>
      <button class="counter__button" onClick={() => setCount(count - 1)}>
        Decrease Count
      </button>
    </div>
  );
};

export default Counter;
```

`~/src/ts/components/Counter/Counter.styles.scss`

```scss
@import "../../../scss/shared";

.counter {
  &__button {
    display: inline-block;
    padding: 14px 20px;
    color: white;
    @include theme {
      background-color: $color;
    }
  }
}
```
