import { useParams } from "@solidjs/router";
import { updatePath } from "solid-js/store/types/store.js";
import VideoPlayer from "~/components/video-player"

const CDN_BASE = "https://aerial-cdn.ndru.io/"

export default function VideoPath() {
    const params = useParams();
    
    return (
        <VideoPlayer src={CDN_BASE + params.region + "/" + params.subregion + "/4k/playlist.m3u8" } />
    )
}