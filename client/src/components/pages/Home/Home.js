import React from "react";
import Helmet from "react-helmet";
import TextLoop from "react-text-loop";
// Utils
import { WEBSITE_NAME } from "../../../utils/Data";

// Images
import Home01 from "../../../images/logo avec script.png";
import About from "../../../images/Online.svg";
import Online from "../../../images/online-order.svg";
import Smart from "../../../images/smartphone.svg";
import Settings from "../../../images/settings.svg";
import Chat from "../../../images/chat.svg";
import Styles from "./Home-jss";
import Typewriter from "typewriter-effect";

const Home = () => {
  const classes = Styles();

  return (
    <>
      <Helmet>
        <title>{`${WEBSITE_NAME}`}</title>
      </Helmet>
      <div className={`${classes.page}`}>
        <div className="row py-5 align-items-center">
          <div className="col-12 col-lg-6 text-center text-lg-left">
            <h1 className="title mx-auto mx-lg-0 ">
              Social Services <br /> Platform <br /> for{" "}
              <TextLoop
                interval={15}
                fade={true}
                className="loop"
                children={[
                  <Typewriter
                    options={{
                      strings: ["Teachers", "Employees", "Academic staff"],
                      autoStart: true,
                      loop: true,
                    }}
                  />,
                ]}
              />
              <br />
            </h1>
          </div>
          <div className="col-12 col-lg-6 mt-lg-5 mt-5 mt-lg-0 text-center">
            <img className="img img-fluid" src={Home01} alt="Home" />
          </div>
        </div>

        <div className="features py-5">
          <div className="row">
            <div className="col-12 col-lg-6 text-center text-lg-left">
              <h3 className="title mb-5 mx-auto mx-lg-0 ">
                What does <span className="bold">Social Charities</span> provide
                ?
              </h3>
            </div>
          </div>

          <div className="row text-center text-lg-left">
            <div className="col-12 col-lg-3">
              <div>
                <img className="img img-fluid mb-3" src={Online} alt="Home" />
                <h5 className="title mb-2 mt-2 mx-auto mx-lg-0">Request</h5>
                <p className="description mb-5 mx-auto mx-lg-0">
                  Select a category , offer , and add your request and attach
                  your additional justification files
                </p>
              </div>
            </div>

            <div className="col-12 col-lg-3">
              <div>
                <img className="img img-fluid mb-3" src={Smart} alt="Home" />

                <h5 className="title mb-2 mt-2 mx-auto mx-lg-0">
                  E-mail notifications
                </h5>
                <p className="description mb-5 mx-auto mx-lg-0">
                  Receive messages about the status of your requests , new
                  offers and more information
                </p>
              </div>
            </div>

            <div className="col-12 col-lg-3">
              <div>
                <img className="img img-fluid mb-3" src={Settings} alt="Home" />

                <h5 className="title mb-2 mt-2 mx-auto mx-lg-0"> Settings </h5>
                <p className="description mb-5 mx-auto mx-lg-0">
                  Edit your profile
                </p>
              </div>
            </div>

            <div className="col-12 col-lg-3">
              <div>
                <img className="img img-fluid mb-3" src={Chat} alt="Home" />
                <h5 className="title mb-2 mt-2 mx-auto mx-lg-0">
                  FAQ {"&"} informations
                </h5>
                <p className="description mb-5 mx-auto mx-lg-0">
                  Get additional information about categories, offers,
                  conditions for benefition and others
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="this-platform py-5">
          <div className="row align-items-center">
            <div className="col-12 col-lg-6 text-center">
              <h3 className="">
                <img className="img img-fluid" src={About} alt="Home2" />
              </h3>
            </div>
            <div className="col-12 col-lg-6 text-center text-lg-left">
              <h3 className="title mb-3 mt-4 mt-lg-0 mx-auto mx-lg-0 ">
                This<span className="bold"> platform </span>
              </h3>
              <p className="paragraph mx-auto mx-lg-0 mt-3">
                The main objective is to facilate the processing of requests and
                donations,
                <span> Social Charities Platform</span> attempts to make basic
                health tools , donations and services more accessible to
                employees in regards to their social and financial status.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
