import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export default function Component() {
  const [isIframeLoaded, setIframeLoaded] = useState(false);
  const [shouldLoadIframe, setShouldLoadIframe] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setShouldLoadIframe(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (iframeRef.current) {
      observer.observe(iframeRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#F59E0B] to-[#F472B6] h-screen flex flex-col items-center justify-start pt-16 lg:pt-32">
      {/* Adjusted padding-top */}
      <h1 className="text-2xl font-semibold tracking-tight lg:text-4xl text-center px-4">
        10 hours of Ludwig doing the Luddy! 🕺
      </h1>
      <section className="flex justify-center w-full mt-6 px-4">
        {/* Added padding to section */}
        <div
          className="aspect-youtube w-full flex justify-center relative"
          style={{ maxWidth: '80vw' }}
        >
          {/* Set maximum width to 80% of viewport width */}
          {!isIframeLoaded && (
            <Image
              alt="Loading placeholder"
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
            src={shouldLoadIframe ? "https://www.youtube.com/embed/L3Ucukzbp6k" : undefined}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            onLoad={() => setIframeLoaded(true)}
            style={{
              aspectRatio: '16 / 9',
              visibility: isIframeLoaded ? 'visible' : 'hidden',
            }}
          ></iframe>
        </div>
      </section>
    </div>
  );
}
