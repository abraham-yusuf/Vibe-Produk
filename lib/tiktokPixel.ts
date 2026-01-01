declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ttq: any;
  }
}

export const pageview = () => {
  window.ttq?.page();
};

export const trackClick = (product: string) => {
  window.ttq?.track('ClickButton', {
    product,
  });
};
