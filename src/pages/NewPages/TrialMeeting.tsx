import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import IndependentTabs from "../../components/NewPage/TrialMeeting/Tabs";

const NextArrow = () => <div className="text-black">→</div>;

const TrialMeeting = () => {
  //@ts-ignore
  const Mentorsettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section>
      {/* <Tabs recommendMentor={allMentorData}/> */}
      <IndependentTabs />
    </section>
  );
};

export default TrialMeeting;
