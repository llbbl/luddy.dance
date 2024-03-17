import { useState } from 'react';

export default function Component() {
  const [ isIframeLoaded, setIframeLoaded ] = useState( false );

  return (
    <>
      <div
        className="bg-gradient-to-br from-[#F59E0B] to-[#F472B6] h-screen flex flex-col items-center justify-start pt-16 lg:pt-32"> {/* Adjusted padding-top */ }
        <h1 className="text-2xl font-semibold tracking-tight lg:text-4xl text-center px-4">
          10 hours of Ludwig doing the Luddy! 🕺
        </h1>
        <section className="flex justify-center w-full mt-6 px-4"> {/* Added padding to section */ }
          <div className="aspect-youtube w-full flex justify-center relative"
               style={ { maxWidth: '80vw' } }> {/* Set maximum width to 80% of viewport width */ }
            { !isIframeLoaded && (
              <img
                alt="Loading placeholder"
                className="absolute top-0 left-0 w-full" // Make the placeholder fill the container
                src="/luddy.svg"
              />
            ) }
            <iframe
              className="absolute top-0 left-0 w-full h-auto" // Make the iframe fill the container
              src="https://www.youtube.com/embed/L3Ucukzbp6k"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={ () => setIframeLoaded( true ) }
              style={ {
                aspectRatio: '16 / 9',
                visibility: isIframeLoaded ? 'visible' : 'hidden' // Hide the iframe until it's loaded
              } }
            ></iframe>
          </div>
        </section>
      </div>
    </>
  );
}
