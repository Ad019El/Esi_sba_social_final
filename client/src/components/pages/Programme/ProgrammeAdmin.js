import React, { Component } from "react";
import "./Programme.css";
import axios from "axios";
import ListModal from "./ListModalAdmin";
import { BUTTON_PRIMARY } from "../../styles/Button";

const Chapitre = (props) => (
  <div className="list-group-item">
    <a
      href="#"
      className="list-group-item"
      onClick={props.handleClick}
      style={{ color: "#1a202c" }}
    >
      {props.chapitre.titre}
    </a>
    <div className="list-group">
      <tbody>{props.sousChapitre}</tbody>
    </div>

    {/* admin controle buttons */}
    {/* <FontAwesomeIcon
      className="icons"
      icon={faTrash}
      onClick={props.handleRemove}
    />
    <FontAwesomeIcon
      className="icons"
      icon={faPlusCircle}
      onClick={props.handleInputFieldAdd}
    />
    <FontAwesomeIcon
      className="icons"
      icon={faEdit}
      onClick={props.handleInputFieldEdit}
    /> */}
    {/* props form to add to the program list */}
    {/* {props.state.showInputAdd ? (
      <form onSubmit={props.handleSubmitAdd}>
        <input
          type="text"
          name="name"
          value={props.state.value}
          onChange={props.handleChangeAdd}
        />
        <input type="submit" name="Submit" />
      </form>
    ) : null} */}
    {/* props form to edit to the program list */}
    {/* {props.state.showInputEdit ? (
      <form onSubmit={props.handleSubmitEdit}>
        <input
          type="text"
          name="name"
          value={props.state.value}
          onChange={props.handleChangeEdit}
        />
        <input type="submit" name="Submit" />
      </form>
    ) : null} */}
  </div>
);

const SousChapitre = (props) => (
  <>
    <a
      href="#"
      className="list-group-item"
      onClick={props.handleClick}
      style={{ color: "#718096" }}
    >
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{props.sousChapitre.titre}
    </a>
    <div className="list-group">
      <tbody>{props.article}</tbody>
    </div>
  </>
);

const Article = (props) => (
  <a
    href="#"
    className="list-group-item"
    onClick={props.handleClick}
    style={{ color: "#a0aec0" }}
  >
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    {props.article.titre}
  </a>
);

export default class Programme extends Component {
  //initialize items arrays
  constructor(props, context) {
    super(props, context);
    this.state = {
      chapitres: [[]],
      sousChapitres: [],
      articles: [],
      show: false,
      showModal: false,
      showInputAdd: false,
      showInputEdit: false,
      value: "",
      Selected: "",
      article_type: "",
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
      .get("http://localhost:5000/articles/")
      .then((response) => {
        this.setState({ articles: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
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
              article={this.articleList(currentSousChapitre._id)}
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

  articleList(sousChapitreID) {
    if (this.state.articles) {
      return this.state.articles
        .filter((currentArticle) => {
          return sousChapitreID == currentArticle.sous_chapitre;
        })
        .map((currentArticle) => {
          return (
            <Article
              article={currentArticle}
              key={currentArticle._id}
              handleClick={() => {
                // switch the value of the showModal state
                this.setState({
                  article_type: "article",
                });
                this.setState({
                  Selected: currentArticle,
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
        />
      );
    }
    return (
      <div>
        <div className="just-padding">
          <button
            className="button-primary d-flex "
            onClick={() => {
              // switch the value of the showModal state
              this.setState({
                article_type: "addChapitre",
              });
              this.setState({
                showModal: !this.state.showModal,
              });
            }}
          >
            add new chapter
          </button>
          <div className="list-group list-group-root well">
            <tbody>{this.chapitreList()}</tbody>
          </div>
        </div>
      </div>
    );
  }
}
