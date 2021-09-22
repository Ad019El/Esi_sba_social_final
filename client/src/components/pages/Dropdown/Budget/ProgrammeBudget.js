import React, { Component } from "react";
import "./Programme.css";
import axios from "axios";
import ListModal from "./ListModal";

const Chapitre = (props) => (
  <div className="list-group-item">
    <div className="list-group-item">
      <a
        // className="text-link"
        // onClick={props.handleClick}
        style={{ color: "#1a202c" }}
      >
        {props.chapitre.titre}
      </a>
      <p className="budget-text debit">{props.chapitre.debit}</p>
      <p className="budget-text credit">{props.chapitre.credit}</p>
      <p className="budget-text sold">{props.chapitre.sold}</p>
    </div>
    <div className="list-group">
      <tbody>{props.sousChapitre}</tbody>
    </div>
  </div>
);

const SousChapitre = (props) => (
  <>
    <div className="list-group-item">
      <a
        href="#"
        // className="list-group-item"
        onClick={props.handleClick}
        style={{ color: "#718096" }}
      >
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {props.sousChapitre.titre}
      </a>
      <p className="budget-text debit">{props.sousChapitre.debit}</p>
      <p className="budget-text credit">{props.sousChapitre.credit}</p>
      <p className="budget-text sold">{props.sousChapitre.sold}</p>
    </div>
  </>
);

export default class Programme extends Component {
  //initialize items arrays
  constructor(props, context) {
    super(props, context);
    this.state = {
      chapitres: [[]],
      sousChapitres: [],
      show: false,
      showModal: false,
      showInputAdd: false,
      showInputEdit: false,
      value: "",
      Selected: "",
      article_type: "",
      amount: 0,
    };

    //
    this.handleClick = this.handleClick.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  //get items from DB
  componentDidMount() {
    axios
      .get("http://localhost:5000/chapitres/")
      .then((response) => {
        this.setState({ chapitres: response.data });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost:5000/sous_chapitres/")
      .then((response) => {
        this.setState({ sousChapitres: response.data });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost:5000/budget/")
      .then((response) => {
        this.setState({ amount: response.data.amount });
      })
      .catch((error) => console.log(error));
  }

  //set items in html form
  chapitreList() {
    if (this.state.chapitres) {
      return this.state.chapitres.map((currentChapitre) => {
        return (
          <Chapitre
            chapitre={currentChapitre}
            key={currentChapitre._id}
            sousChapitre={this.sousChapitreList(currentChapitre._id)}
            handleClick={() => {
              // switch the value of the showModal state
              this.setState({
                article_type: "chapitre",
              });
              this.setState({
                Selected: currentChapitre,
              });
              this.setState({
                showModal: !this.state.showModal,
              });
            }}
          />
        );
      });
    }
  }

  sousChapitreList(chapitreID) {
    if (this.state.sousChapitres) {
      return this.state.sousChapitres
        .filter((currentSousChapitre) => {
          return chapitreID == currentSousChapitre.chapitre;
        })
        .map((currentSousChapitre) => {
          return (
            <SousChapitre
              sousChapitre={currentSousChapitre}
              key={currentSousChapitre._id}
              handleClick={() => {
                // switch the value of the showModal state
                this.setState({
                  article_type: "sousChapitre",
                });
                this.setState({
                  Selected: currentSousChapitre,
                });
                this.setState({
                  showModal: !this.state.showModal,
                });
              }}
            />
          );
        });
    }
  }

  // -- show/hide modal --
  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleClick() {
    // console.log(id);
    // switch the value of the showModal state
    this.setState({
      showModal: !this.state.showModal,
    });
  }
  // // ----------------------------

  render() {
    const { useStyles } = this.props;
    if (this.state.showModal) {
      // show the modal if state showModal is true
      return (
        <ListModal
          show={this.handleShow}
          onHide={this.handleClick}
          element={this.state.Selected}
          articleType={this.state.article_type}
          amount={this.state.amount}
        />
      );
    }
    return (
      <div>
        <div>
          <div className="center-cont">
            <div>
              <h2>Available:</h2>
              <h1 className={this.state.amount >= 0 ? "green" : "red"}>
                {this.state.amount}
              </h1>
            </div>
          </div>
          <br />
          <div className="list-group list-group-root well">
            <tbody>{this.chapitreList()}</tbody>
          </div>
        </div>
      </div>
    );
  }
}
