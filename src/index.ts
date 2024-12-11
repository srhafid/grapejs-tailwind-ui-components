import { Frame } from "grapesjs";
import { structureComponentGenerate } from "./interfaces/structureComponentGenerate";

/**
 * Configuration options for the GrapeJS Tailwind Support plugin.
 */
interface Options {
    /**
     * URL of the Tailwind CSS CDN.
     * @default 'https://cdn.tailwindcss.com'
     */
    tailwindPlayCdn?: string;

    /**
     * Additional CSS to be appended as a cover style.
     */
    cover?: string;

    /**
     * CSS selector for retrieving styles from the parent document.
     * @default 'style[data-vite-dev-id]'
     */
    data_selector?: string;
}

/**
 * Default configuration options.
 */
const defaultOptions: Options = {
    tailwindPlayCdn: 'https://cdn.tailwindcss.com',
    data_selector: 'style[data-vite-dev-id]',
};
/**
 * Function to extract the outer HTML from an SVG element and set its width and height to 100%.
 * 
 * @param {SVGElement} svgElement - The SVG element to extract HTML from.
 * @returns {string} The outer HTML of the SVG element with updated width and height.
 */
const getSvgHtml = (svgElement: SVGElement): string => {
    if (typeof window === 'undefined' || !svgElement) return '';
    svgElement.setAttribute('width', '100%');
    svgElement.setAttribute('height', '100%');
    return svgElement.outerHTML;
};

/**
 * Function to integrate custom UI components into GrapesJS with Tailwind UI integration.
 * It processes components in batches and adds them to the editor's block manager.
 * 
 * @param {any} editor - The GrapesJS editor instance.
 * @param {Array<Array<structureComponentGenerate>>} options - An array of categories, where each category contains a list of structureComponentGenerate objects.
 * @param {number} [batchSize=10] - The size of each batch to process at once.
 * @returns {Promise<void>} A promise that resolves once all components are processed and added to the block manager.
 */
export const tailwindSupport = async (
    editor: any,
    options: Array<Array<structureComponentGenerate>>,
    batchSize: number = 10
): Promise<void> => {
    const blockManager = editor.Blocks;

    /**
     * Processes a single component and prepares it for addition to the block manager.
     * 
     * @param {any} source - The source component to process.
     * @returns {object} The processed component ready to be added to the block manager.
     */
    const processComponent = (source: any) => {
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

    /**
     * Processes a batch of components and adds them to the block manager.
     * 
     * @param {Array<structureComponentGenerate[]>} batch - The batch of components to process.
     * @returns {Promise<void>} A promise that resolves once the batch has been processed and the components are added to the block manager.
     */
    const processBatch = async (batch: Array<structureComponentGenerate[]>) => {
        const components = batch
            .map(category => category.map(processComponent))
            .reduce((acc, curr) => acc.concat(curr), []);
        components.forEach(component => blockManager.add(component.id, component));
    };

    // Processes options in batches
    for (let i = 0; i < options.length; i += batchSize) {
        const batch = options.slice(i, i + batchSize);
        await processBatch(batch);
    }
};

/**
 * Adds Tailwind CSS support to GrapeJS editor by appending styles to frames.
 *
 * @param editor - The GrapeJS editor instance.
 * @param opts - Custom configuration options.
 */
export const grapeJsTailwindSupport = (editor: any, opts: Options = {}): void => {
    const options: Options = { ...defaultOptions, ...opts };

    /**
     * Appends Tailwind CSS and additional styles to a specific frame.
     *
     * @param frame - The GrapeJS frame to append styles to.
     */
    const appendTailwindCss = async (frame: Frame): Promise<void> => {
        if (!frame.view) return;

        const iframe = frame.view.getEl() as HTMLIFrameElement | null;

        if (!iframe) return;

        const { cover } = options;
        const cssStyle = document.createElement('style');
        const parentStyles = Array.from(document.querySelectorAll<HTMLStyleElement>(options.data_selector || ''));
        let combinedCss = cover || '';

        parentStyles.forEach(style => {
            combinedCss += style.innerHTML;
        });

        cssStyle.textContent = combinedCss;

        const intervalId = setInterval((): void => {
            const doc = iframe.contentDocument;
            if (doc && doc.readyState === 'complete') {
                doc.head.appendChild(cssStyle);
                clearInterval(intervalId);
            }
        }, 100);
    };

    editor.Canvas.getModel().on('change:frames', (model: any, frames: Frame[]) => {
        frames.forEach(frame => frame.once('loaded', () => appendTailwindCss(frame)));
    });
};
