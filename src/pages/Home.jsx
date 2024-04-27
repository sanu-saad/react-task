import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Home = () => {
  var settings = {
    dots: true,
    // fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enable auto-slide
    autoplaySpeed: 2000,
  };
  return (
    <div className="w-full px-7">
      {/* <h2>Home</h2> */}
      <Slider {...settings}>
        <div>
          <img src="../../assets/Coffee 4.webp" alt="img1" />
        </div>
        <div>
          <img src="../../assets/Coffee 1.jpg" alt="img2" />
        </div>
        <div>
          <img src="../../assets/Coffee 3.jpg" alt="img3" />
        </div>
        <div>
          <img src="../../assets/Coffee 4.jpg" alt="img4" />
        </div>
        <div>
          <img src="../../assets/Coffee 8.webp" alt="img5" />
        </div>
        <div>
          <img src="../../assets/Coffee 7.webp" alt="img7" />
        </div>
      </Slider>
      <h2 className="text-center mt-20 text-3xl font-bold">
        APPLE ROCKET COFFEE SHOP
      </h2>
    </div>
  );
};

export default Home;
