import { structureComponentGenerate } from "./interfaces/structureComponentGenerate";

/**
 * Retrieves the HTML string of an SVG element with adjusted width and height attributes.
 * @param {SVGElement} svgElement - The SVG element to extract HTML from.
 * @returns {string} The SVG element's outer HTML as a string, or an empty string if the element is invalid.
 */
const getSvgHtml = (svgElement: SVGElement): string => {
    if (typeof window === 'undefined' || !svgElement) return '';
    svgElement.setAttribute('width', '100%');
    svgElement.setAttribute('height', '100%');
    return svgElement.outerHTML;
};

/**
 * Adds custom components to the GrapesJS editor using Tailwind UI components.
 * @param {any} editor - The GrapesJS editor instance.
 * @param {Array<Array<structureComponentGenerate>>} options - An array of component categories to process.
 * @returns {void} This function does not return anything.
 */
export const grapeJsTailwindUiComponents = (editor: any, options: Array<Array<structureComponentGenerate>>): void => {
    const blockManager = editor.Blocks;

    /**
     * Processes a component to generate its configuration.
     * @param {Object} source - The component's source data.
     * @returns {Object} The component configuration containing its ID, label, attributes, content, and category.
     */
    const processComponent = (source: any): any => {
        const svgElement = editor.$(source.label).get(0) as SVGElement;
        const svgHtml = getSvgHtml(svgElement);
        return {
            id: source.id,
            label: svgHtml,
            attributes: { class: `${source.class} block-full-width` },
            content: source.content,
            category: { label: source.category, open: false },
        };
    };

    options
        .flatMap(category => category.map(processComponent))
        .forEach(component => blockManager.add(component.id, component));
};
