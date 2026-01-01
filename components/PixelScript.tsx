'use client';

import React from 'react';
import Script from 'next/script';

interface PixelScriptProps {
  pixel_tiktok?: string;
  pixel_meta?: string;
}

export default function PixelScript({ pixel_tiktok, pixel_meta }: PixelScriptProps) {
  return (
    <>
      {/* TikTok Pixel */}
      {pixel_tiktok && (
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject = t;
              var ttq = w[t] = w[t] || [];
              ttq.methods = ["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];
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
              ttq.load("${pixel_tiktok}");
              ttq.page();
            }(window, document, 'ttq');
          `}
        </Script>
      )}

      {/* Meta Pixel */}
      {pixel_meta && (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${pixel_meta}');
              fbq('track', 'PageView');
            `}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${pixel_meta}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      )}
    </>
  );
}
