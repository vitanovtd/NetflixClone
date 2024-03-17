import { useRef, useEffect } from "react";
import "./BillboardComponent.css";

const VITE_SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const BillboardComponent = ({ title, description }) => {
    const videoRef = useRef(null);
    const posterSrc = `${VITE_SERVER_BASE_URL}/movies/the_matrix/poster.jpg`;
    const trailerSrc = `${VITE_SERVER_BASE_URL}/movies/the_matrix/trailer_360p.mp4`;

    useEffect(() => {
        setTimeout(() => {
            // videoRef.current.play();
        }, 5000);
    }, []);

    return (
        <div className="BillboardComponent">
            <video
                ref={videoRef}
                className="BillboardComponent__video"
                autoPlay={false}
                muted={true}
                loop={false}
                poster={posterSrc}
            >
                <source src={trailerSrc} type="video/mp4" />
            </video>
        </div>
    )
}

export default BillboardComponent;
