import React from "react";
import Slider from "react-slick";
import slide1 from "../../Assets/images/s2.jpg";
import slide2 from "../../Assets/images/ss2.jpg";
import slide3 from "../../Assets/images/b1.jpg";
import slide4 from "../../Assets/images/slide4.jpg";
import slide5 from "../../Assets/images/m1.jpg";
import "./mainSlider.scss"
function MainSlider() {
  const settings = {  
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <>
      <div className="container-fluid pt-5">
        <div className="row pt-4 ">
          <div className="col-md-8 ">
            <div className="layOut">
                <h5>New Arrivals</h5>
                <p className="ps-2">Enjoy This Winter Collection</p>
                <button className="btn bg-main-light ms-2">Discover more</button>
            </div>
            <Slider {...settings} className="position-relative">
              <div>
              <img height={610} className="w-100 rounded" src={slide4} alt="prod" />
              </div>
              <div>
              <img height={610} className="w-100 rounded" src={slide5} alt="prod" />
              </div>
            </Slider>
          </div>
          <div className="col-md-4 left__CatSide">
            <div className="position-relative">
              <h4 className="img__LayOut">Sneakers</h4>
              <img
                src={slide1}
                className="w-100 rounded "
                height={300}
                alt="prod"
             
              />
            </div>
            <div className="row pt-2">
              <div className="col-md-6 position-relative">
              <h4 className="img__LayOut">Electronics</h4>
                <img 
                  src={slide2}
                  height={300}
                  className="w-100 rounded"
                  alt="prod"
                 
                />
              </div>
              <div className="col-md-6 position-relative">
              <h4 className="img__LayOut">Bags</h4>
                <img
                  src={slide3}
                  height={300}
                  className="w-100 rounded"
                  alt="prod"
              
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainSlider;
