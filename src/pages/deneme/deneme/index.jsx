import React, { useRef, useEffect, useState } from "react";
import contents from "./../contents.json";

export default function VideoList() {
    const videoRefs = useRef([]);
    const [currentPlaybackPosition, setCurrentPlaybackPosition] = useState(0);
    const [currentVolume, setCurrentVolume] = useState(0.5);
    const [currentSpeed, setCurrentSpeed] = useState(1);

    useEffect(() => {
        videoRefs.current = videoRefs.current.map((videoRef, index) => {
            videoRef.addEventListener("keydown", handleKeyDown);
            videoRef.addEventListener("captionsdisabled", handleCaptionsDisabled);
            videoRef.addEventListener("loadedmetadata", handleLoadedMetadata);

            // Türkçe alt yazı
            const turkishCaptions = document.createElement("track");
            turkishCaptions.kind = "captions";
            turkishCaptions.label = "Türkçe";
            turkishCaptions.srclang = "tr";
            turkishCaptions.src = `path/to/captions/${index + 1}_tr.vtt`;
            turkishCaptions.default = true;

            // İngilizce alt yazı
            const englishCaptions = document.createElement("track");
            englishCaptions.kind = "captions";
            englishCaptions.label = "English";
            englishCaptions.srclang = "en";
            englishCaptions.src = `path/to/captions/${index + 1}_en.vtt`;

            videoRef.appendChild(turkishCaptions);
            videoRef.appendChild(englishCaptions);

            return videoRef;
        });
    }, []);

    const handleKeyDown = (event) => {
        const video = event.currentTarget;
        if (event.code === "ArrowRight") {
            video.currentTime += 5;
        } else if (event.code === "ArrowLeft") {
            video.currentTime -= 5;
        }
    };

    const handleCaptionsDisabled = (event) => {
        console.log("CC is disabled");
        // CC kapalı olduğunda yapılacak işlemleri burada gerçekleştirin
    };

    const handleLoadedMetadata = (event) => {
        const video = event.currentTarget;
        video.volume = currentVolume;
        video.playbackRate = currentSpeed;
        video.currentTime = currentPlaybackPosition;
    };

    return (
        <ul className="video-list">
            {contents.videos.map((video, index) => (
                <li key={video.id} className="video-item">
                    <video
                        ref={(ref) => (videoRefs.current[index] = ref)}
                        controls
                        src={video.source}
                        type="video/mp4"
                    ></video>
                </li>
            ))}
        </ul>
    );
}
