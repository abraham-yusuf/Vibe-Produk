declare global {
  interface Window {
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
