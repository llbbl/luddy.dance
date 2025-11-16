import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { log, reportError, setUserContext, trackPerformance } from '@/lib/logger';

export default function Component() {
  const [isIframeLoaded, setIframeLoaded] = useState(false);
  const [shouldLoadIframe, setShouldLoadIframe] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Set user context on page load
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setUserContext(undefined, sessionId, {
      page: 'home',
      userAgent: navigator.userAgent,
      referrer: document.referrer,
    });

    log.appReady({ page: 'home', sessionId });

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          const startTime = performance.now();
          setShouldLoadIframe(true);
          trackPerformance('iframe_intersection', performance.now() - startTime);
          log.componentMount('VideoIframe');
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (iframeRef.current) {
      observer.observe(iframeRef.current);
    } else {
      reportError(new Error('iframe ref not available'), { context: 'useEffect' });
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#F59E0B] to-[#F472B6] h-screen flex flex-col items-center justify-start pt-16 lg:pt-32">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight lg:text-4xl text-center px-4">
          10 hours of Ludwig doing the Luddy! 🕺
        </h1>
      </header>
      <main className="flex justify-center w-full mt-6 px-4">
        <section
          className="aspect-youtube w-full flex justify-center relative"
          style={{ maxWidth: '80vw' }}
          aria-label="Ludwig Luddy dance video player"
        >
          {!isIframeLoaded && (
            <Image
              alt="Ludwig dancing placeholder image showing a purple and orange gradient background while the 10-hour Ludwig Luddy dance video loads"
              className="absolute top-0 left-0"
              src="/luddy.svg"
              fill
              priority
              sizes="(max-width: 80vw) 100vw, 80vw"
            />
          )}
          <iframe
            ref={iframeRef}
            className="absolute top-0 left-0 w-full h-auto"
            src={shouldLoadIframe ? 'https://www.youtube.com/embed/L3Ucukzbp6k' : undefined}
            title="10 hours of Ludwig doing the Luddy dance - YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            onLoad={() => {
              const loadTime = performance.now();
              setIframeLoaded(true);
              trackPerformance('iframe_load', loadTime);
              log.componentMount('VideoIframeContent');
            }}
            onError={(e) => {
              reportError(new Error('iframe failed to load'), {
                src: shouldLoadIframe ? 'https://www.youtube.com/embed/L3Ucukzbp6k' : 'undefined',
                event: e.type,
              });
            }}
            role="application"
            aria-label="Embedded YouTube video: 10 hours of Ludwig doing the Luddy dance"
            style={{
              aspectRatio: '16 / 9',
              visibility: isIframeLoaded ? 'visible' : 'hidden',
            }}
          ></iframe>
        </section>
      </main>
    </div>
  );
}
