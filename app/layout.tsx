import './globals.css';

export const metadata = {
  title: 'Vibe Produk ID',
  description: 'Review jujur produk viral & murah',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        {/* TikTok Pixel */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
!function (w, d, t) {
  w.TiktokAnalyticsObject = t;
  var ttq = w[t] = w[t] || [];
  ttq.methods = ["page","track"];
  ttq.setAndDefer = function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
  for (var i = 0; i < ttq.methods.length; i++) {
    ttq.setAndDefer(ttq, ttq.methods[i]);
  }
  ttq.load = function(e){
    var i = d.createElement("script");
    i.async = true;
    i.src = "https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=" + e;
    d.getElementsByTagName("head")[0].appendChild(i);
  };
  ttq.load("ISI_PIXEL_ID_KAMU");
  ttq.page();
}(window, document, 'ttq');
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
