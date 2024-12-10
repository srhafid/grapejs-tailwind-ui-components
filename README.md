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
import grapesJsTailwindUiComponents from 'grapesjs-tailwind-ui-components';

const editor = grapesjs.init("gjs");

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

grapesJsTailwindUiComponents(editor, components);
```

Code in `index.html` for example.

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

## License

MIT License
