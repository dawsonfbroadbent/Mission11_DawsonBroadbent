declare module 'bootstrap' {
  export class Offcanvas {
    constructor(element: Element);
    hide(): void;
    show(): void;
    static getOrCreateInstance(element: Element): Offcanvas;
  }

  export interface ToastOptions {
    animation?: boolean;
    autohide?: boolean;
    delay?: number;
  }

  export class Toast {
    constructor(element: Element, options?: ToastOptions);
    hide(): void;
    show(): void;
    static getOrCreateInstance(element: Element, config?: ToastOptions): Toast;
  }
}
