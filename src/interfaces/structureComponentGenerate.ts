export interface structureComponentGenerate {
    id: string;         // Unique identifier for the component
    class: string;      // Optional CSS class for the component
    label: string;      // HTML string for visual representation
    content: string;    // Content associated with the component
    category: string;   // Category of the component
}

export interface Options {
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
