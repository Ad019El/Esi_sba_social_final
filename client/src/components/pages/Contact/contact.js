import React from "react";
import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { WEBSITE_NAME } from "../../../utils/Data";
import useStyles from "./contact-jss";
import RealTime from "../../../images/real_time.svg";
import Git from "../../../images/github.png";
import Face from "../../../images/facebook.png";
import Tweet from "../../../images/twitter.png";

const Contact = () => {
  const classes = useStyles();
  return (
    <div>
      <Helmet>
        <title>{`${WEBSITE_NAME} | Contact`}</title>
      </Helmet>
      <Container>
        <div className={`${classes.root} card-shadow text-center`}>
          <div className="row">
            <div className="col-12">
              <h3 className="title mb-5 d-flex justify-content-center">
                Contact us
              </h3>
              <div className=" boxs text-center">
                <img className="img img-fluid" src={RealTime} alt="RealTime" />
              </div>
              <br />
              <div className=" boxs text-center">
                <a
                  className="gh"
                  href="https://github.com/sidahmedsahraoui/Full-Project"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img className="imgii img-fluid" src={Git} alt="RealTime" />
                </a>
                <a
                  className="gh"
                  href="https://github.com/sidahmedsahraoui/Full-Project"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img className="imgii img-fluid" src={Tweet} alt="RealTime" />
                </a>
                <a
                  className="gh"
                  href="https://github.com/sidahmedsahraoui/Full-Project"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img className="imgii img-fluid" src={Face} alt="RealTime" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Contact;
