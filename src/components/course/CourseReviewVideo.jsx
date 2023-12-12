import { useEffect, useRef } from "react";
import plyr from "plyr";
import "plyr/dist/plyr.css";

const PlyrComponent = (props) => {
    const {className,videoUrl}=props;
    const playerRef = useRef(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const sources = {
        type: "video",
        //TODO: api'ye urlin 0:20 saniye aralığında verilerin gelmesini sağlamalyız. Tüm videoyu çekmemeli bunun için araştırma yap.
        //TODO: AUTO işleminde kullanıcının internet hızına göre ayarlanmasını sağla

        sources: [
            {
                src:videoUrl,
                type: "video/mp4",
                size: 720
            },
            {
                src:videoUrl,
                type: "video/webm",
                size: 1080
            }
        ],
        tracks: [
            {
                kind: "captions",
                label: "English",
                srclang: "en",
                src: "https://media.nagwa.com/412180825716/en/subtitle_en.vtt",
                default: true
            },
            {
                kind: "captions",
                label: "French",
                srclang: "fr",
                src: "https://media.nagwa.com/412180825716/en/subtitle_en.vtt"
            }
        ]
    };
    console.log("sources",sources);
    useEffect(() => {
        const player = new plyr(".js-plyr", {
            controls: [
                "play",
                "progress",
                "current-time",
                "mute",
                "volume",
                "settings",
                "fullscreen",
                "play-large"
            ],
            captions: {active: true, update: true, language: "auto"},
            quality: {
                default: "auto",
                options: ["auto",1080,720, 480, 360],
                forced: true,
                autoplay: true,
                loadSprite: true,
                onChange: (quality) => {
                    if (quality === "auto" && navigator.connection) {
                        const connection = navigator.connection;
                        switch (connection.effectiveType) {
                            case "4g":
                                player.quality = 1080;
                                break;
                            case "3g":
                                player.quality = 720;
                                break;
                            default:
                                player.quality = 480;
                        }
                    }
                },
            },

        });

        const handleKeyDown = (event) => {
            const { code } = event;
            const seekTime = 5;
            if (code === "ArrowRight") {
                player.currentTime += seekTime;
            } else if (code === "ArrowLeft") {
                player.currentTime -= seekTime;
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        player.source = sources;

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            player.destroy();
        };
    }, [sources]);

    return <div className={className}>
        <video className="js-plyr plyr" ref={playerRef} />
    </div>
};

export default PlyrComponent;
