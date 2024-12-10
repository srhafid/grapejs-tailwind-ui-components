import { structureComponentGenerate } from "./interfaces/structureComponentGenerate";


const getSvgHtml = (svgElement: SVGElement): string => {
    if (typeof window === 'undefined' || !svgElement) return '';
    svgElement.setAttribute('width', '100%');
    svgElement.setAttribute('height', '100%');
    return svgElement.outerHTML;
};


export const grapeJsTailwindUiComponents = (editor: any, options: Array<Array<structureComponentGenerate>>): void => {
    const blockManager = editor.Blocks;

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

    options
        .flatMap(category => category.map(processComponent))
        .forEach(component => blockManager.add(component.id, component));
};