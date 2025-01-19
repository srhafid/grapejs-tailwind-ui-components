# GrapesJS Tailwind UI Components

This package integrates **Tailwind UI components** into **GrapesJS**, allowing you to easily add customizable components with SVG and HTML content.

In order for the package that integrates Tailwind UI components in GrapesJS to work correctly, it is necessary to add other packages that contain the different component libraries. These additional packages are the ones that provide the necessary component libraries, since, on its own, the package does not include everything necessary to work. In a next post I will upload the component groups so that you can freely choose.

## Installation

To install, run:

```bash
npm install grapesjs-tailwind-ui-components
```

## Usage

Import and use the `grapeJsTailwindUiComponents` function to add components to your GrapesJS editor.

```javascript
import grapesjs from "grapesjs";
import { grapeJsTailwindSupport, grapeJsTailwindUiComponents } from 'grapesjs-tailwind-ui-components';

const editor = grapesjs.init({
  container: '#gjs',
  plugins: [
    grapeJsTailwindSupport
  ]
});

const components = [
  [
    {
      id: 'button-1',
      class: 'btn-primary',
      label: '<svg>...</svg>',
      content: '<button class="btn">Click Me</button>',
      category: 'UI Components',
    },
    // More components...
  ]
];

grapeJsTailwindUiComponents(editor, components); // allows us to add components with a certain structure that use tailwind
```
**grapeJsTailwindSupport (plugin):**
This plugin adds the necessary support for Twilwind to work correctly with its custom components or from the component kits that are already being created.
**grapesJsTailwindUiComponents:**
This is a feature which allows us to add our custom components eschos with tailwind

**NOTE**
The general functionality allows, for example, injecting a specific selector that can be changed in the options of our `grapeJsTailwindSupport` plugin. It is only necessary to modify the selector, which by default is the `style` tag selector from Vite when it is already rendered. To use a different selector, you need to change the `data_selector: 'style[data-vite-dev-id]' # by new value` option and assign it the corresponding value. This is because the main functionality involves injecting the parent styles into the iframe. This approach may lead to some issues, so I recommend exercising caution when using it.

```html
<div id="gjs"></div>
```


### Parameters

- **editor**: The GrapesJS editor instance.
- **components**: An array of components defined by the `structureComponentGenerate` interface. Each component has:
  - `id`: Unique identifier
  - `class`: Optional CSS class
  - `label`: SVG or HTML content or Img in jpg
  - `content`: The content for the editor
  - `category`: Category for the component

### Credits
- **[GrapesJS](https://grapesjs.com/)**: A visual web editor for creating and managing web pages without writing code.
- **[TailwindCSS](https://tailwindcss.com/)**: A highly configurable CSS framework.
- **[grapesjs-tailwind](https://github.com/Ju99ernaut/grapesjs-tailwind)**: Mainly inspired by and based on this plugin.


## License

MIT License
