import { Component, onMount } from 'solid-js';
import Hls from 'hls.js';

const VIDEO_SRC = "https://aerial-cdn.ndru.io/undersea/tahiti-waves-2/4k/playlist.m3u8";

const VideoPlayer: Component = () => {
  let videoRef: HTMLVideoElement | undefined;

  onMount(() => {
    if (videoRef) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(VIDEO_SRC);
        hls.attachMedia(videoRef);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          videoRef?.play().catch(error => {
            console.error("Autoplay was prevented:", error);
            // UI could inform user to manually play
          });
        });
        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                console.error('Fatal network error encountered', data);
                // try to recover network error
                hls.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                console.error('Fatal media error encountered', data);
                hls.recoverMediaError();
                break;
              default:
                // cannot recover
                console.error('Unrecoverable fatal error', data);
                hls.destroy();
                break;
            }
          }
        });
      } else if (videoRef.canPlayType('application/vnd.apple.mpegurl')) {
        // Fallback for browsers that support HLS natively but Hls.js is not supported (e.g. Safari)
        videoRef.src = VIDEO_SRC;
        videoRef.addEventListener('loadedmetadata', () => {
           videoRef?.play().catch(error => {
            console.error("Autoplay was prevented (native HLS):", error);
          });
        });
      }
    }
  });

  return (
    <video
      ref={videoRef}
      controls
      autoplay // Autoplay is attempted by hls.js after manifest parsing or natively
      muted
      playsinline
      loop
      style={{ width: '100%', height: '100%', "object-fit": "cover" }}
    >
      Your browser does not support the video tag or HLS playback.
    </video>
  );
};
export default VideoPlayer;