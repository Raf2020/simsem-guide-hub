/// <reference types="vite/client" />

declare namespace JSX {
  interface IntrinsicElements {
    'healcode-widget': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
      'data-type'?: string;
      'data-widget-partner'?: string;
      'data-widget-id'?: string;
      'data-widget-version'?: string;
    }, HTMLElement>;
  }
}
