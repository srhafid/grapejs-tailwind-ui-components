import { Frame } from "grapesjs";
import { Options, structureComponentGenerate } from "./interfaces/structureComponentGenerate";

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

/**
 * Function to integrate custom UI components into GrapesJS with Tailwind UI integration.
 * 
 * @param {any} editor - The GrapesJS editor instance.
 * @param {Array<ArraystructureComponentGenerate>} options
 */
export const grapeJsTailwindUiComponents = (
    editor: any,
    components: Array<structureComponentGenerate>
): void => {
    const blockManager = editor.Blocks;

    const processComponent = (component: structureComponentGenerate) => {
        const svgElement = editor.$(component.label).get(0) as SVGElement;
        const svgHtml = getSvgHtml(svgElement);
        return {
            id: component.id,
            label: svgHtml,
            attributes: { class: `${component.class} block-full-width` },
            content: component.content,
            category: { label: component.category, open: false },
        };
    };

    components.forEach(component => {
        const processedComponent = processComponent(component);
        blockManager.add(processedComponent.id, processedComponent);
    });
};
