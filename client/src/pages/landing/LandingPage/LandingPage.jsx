// Components
import LongCardComponent from "../../../components/landing/LongCardComponent/LongCardComponent";

// Data
import longCardComponentData from "../../../data/landing/longCardComponentData.json";

// Local imports
import "./LandingPage.css";

const LandingPage = () => {
    return (
        <div className="LandingPage">
            <div className="LandingPage__LongCardComponent-wrapper">
                {longCardComponentData.map((item, idx) => (
                    <LongCardComponent
                        key={item.id}
                        cardType={item.cardType}
                        rowIsEven={idx % 2 === 0}
                        title={item.title}
                        subTitle={item.subTitle}
                        imagePath={item.imagePath}
                        videoPath={item.videoPath}
                        alt={item.alt}
                    />
                ))}
            </div>
        </div>
    )
}

export default LandingPage;
