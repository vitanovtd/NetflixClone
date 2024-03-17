import "./LongCardComponent.css";

const LongCardComponent = ({
    cardType = "default",
    rowIsEven,
    title,
    subTitle,
    imagePath,
    videoPath,
    alt
}) => {
    return (
        <div className="LongCardComponent__wrapper">
            <div className={`LongCardComponent${rowIsEven === true ? " row-is-even" : ""}`}>
                <div className={`LongCardComponent__text-container`}>
                    <p className="LongCardComponent__title">{title}</p>
                    <p className="LongCardComponent__subtitle">{subTitle}</p>
                </div>
                <div className="LongCardComponent__img-container">
                    <img
                        className={`LongCardComponent__img ${cardType}`}
                        src={imagePath}
                        alt={alt}
                    />
                    <LongCardComponentVideoEl
                        cardType={cardType}
                        videoPath={videoPath}
                    />
                </div>
            </div>
        </div>
    );
}

function LongCardComponentVideoEl({ cardType, videoPath }) {
    if (cardType !== "watch-on-tv" && cardType !== "watch-on-device") {
        return null;
    }

    return (
        <div className={`LongCardComponent__video-container ${cardType}`}>
            <video className="LongCardComponent__video"
                autoPlay={true}
                playsInline={true}
                muted={true}
                loop={true}
            >
                <source src={videoPath} type="video/mp4" />
            </video>
        </div>
    );
}

export default LongCardComponent;
