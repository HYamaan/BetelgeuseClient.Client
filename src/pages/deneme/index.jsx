import React, {useRef, useEffect, useState} from "react";
import Plyr from "plyr";
import "plyr/dist/plyr.css";
import contents from "./contents.json";

export default function VideoList() {
    const videoRefs = useRef([]);
    const [currentPlaybackPosition, setCurrentPlaybackPosition] = useState(0);
    const [currentVolume, setCurrentVolume] = useState(0.5);
    const [currentSpeed, setCurrentSpeed] = useState(1);
    const [quality,setQuality]=useState(720);


    useEffect(() => {
        videoRefs.current = videoRefs.current.map((videoRef, index) => {
            let player;

            const initializePlayer = () => {
                player = new Plyr(videoRef, {
                    controls: ["play", "progress", "current-time", "mute", "volume", "settings", "fullscreen","play-large"],
                    captions: { active: true, update: true, language: "auto" },
                    quality: {
                        default: "auto",
                        options: [720, 480, 360],
                        forced: true,
                        onChange: (quality) => {
                            console.log("Selected quality:", quality);
                            setCurrentPlaybackPosition(player?.currentTime);
                            setCurrentVolume(player?.volume);
                            setCurrentSpeed(player?.speed);
                            sendApiRequest(quality);
                        },
                    },
                    autoplay: true,
                });

                player.on("keydown", (event) => {
                    if (event.code === "ArrowRight") {
                        player.currentTime += 5;
                    } else if (event.code === "ArrowLeft") {
                        player.currentTime -= 5;
                    }
                });

                player.on("captionsdisabled", () => {
                    console.log("CC is disabled");
                });

                const turkishCaptions = {
                    kind: "captions",
                    label: "Türkçe",
                    srclang: "tr",
                    src: `path/to/captions/${index + 1}_tr.vtt`,
                };

                const englishCaptions = {
                    kind: "captions",
                    label: "English",
                    srclang: "en",
                    src: `path/to/captions/${index + 1}_en.vtt`,
                };

                player.source = {
                    type: "video",
                    sources: [
                        {
                            src: videoRef.currentSrc,
                            type: "video/mp4",
                        },
                    ],
                    tracks: [turkishCaptions, englishCaptions],
                };

                player.on("ready", () => {
                    player.volume = currentVolume;
                    player.speed = currentSpeed;
                    player.currentTime = currentPlaybackPosition;
                    player.captionsdisabled;
                    updateQualityBasedOnConnection(player);
                    player.play();
                });
            };

            initializePlayer();

            return player;
        });
    }, []);

    useEffect(()=>{console.log("Burada",quality,currentSpeed,currentVolume)},[quality,currentSpeed,currentVolume])

    //TODO:Videoların quality değerlerine bağlı olarak apiden veri gelicek.
    const sendApiRequest = (quality) => {
        console.log("API request sent with quality:", quality);
    };

    //TODO:Daha sonradan sağlıklı kontrol yapan bir yapı yazılacak.
    const updateQualityBasedOnConnection = (player) => {
        if ("connection" in navigator) {
            const connection = navigator.connection;
            const effectiveType = connection.effectiveType;
            console.log("Connection type:", effectiveType);

            let newQuality;
            if (effectiveType === "4g") {
                newQuality = 720;
            } else if (effectiveType === "3g") {
                newQuality = 480;
            } else {
                newQuality = 360;
            }

            // Video kalitesini güncelle
            player.quality = newQuality;
            console.log("Updated quality based on connection:", newQuality);
        }
    };
    return (
        <ul className="video-list">
            {contents.videos.map((video, index) => (
                <li key={video.id} className="video-item">
                    <video
                        key={video.id}
                        ref={(ref) => (videoRefs.current[index] = ref)}
                        controls
                    >
                        <source src={video.source} type="video/mp4" />
                    </video>
                </li>
            ))}
        </ul>
    );
}
