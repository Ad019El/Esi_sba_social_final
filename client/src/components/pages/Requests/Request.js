import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import { Container, Form } from "react-bootstrap";
import useStyles from "./Request-jss";
import axios from "axios";

// Actions
import { request, clearErrors } from "../../../redux/actions/requestActions";
import { setAlert } from "../../../redux/actions/alertActions";

// App layout components
import Spinner from "../../layout/Spinner/Spinner";
import Input from "./InputElement";
// Utils
import { WEBSITE_NAME } from "../../../utils/Data";

////////////
let data = "";
var options = [{ value: "", displayValue: "Choose chapter" }];
axios
  .get("http://localhost:5000/chapitres")
  .then((result) => {
    data = result.data;

    for (const chapitre of data) {
      options.push({ value: chapitre._id, displayValue: chapitre.titre });
    }
  })
  .catch((error) => {
    console.log(error);
  });

/////////////
let offersData = "";
var sousCOptions = [
  { value: "", chapitre: "", displayValue: "Choose chapter" },
];
axios
  .get("http://localhost:5000/sous_chapitres")
  .then((result) => {
    data = result.data;

    for (const sousChapitre of data) {
      sousCOptions.push({
        value: sousChapitre._id,
        chapitre: sousChapitre.chapitre,
        displayValue: sousChapitre.titre,
      });
    }
  })
  .catch((error) => {
    console.log(error);
  });
////////////////
const Request = (props) => {
  const { error, loading, request, clearErrors, setAlert, user } = props;

  const [state, setState] = useState({
    orderForm: {
      category: {
        elementType: "select",
        elementConfig: {
          options,
          // options: [
          //     {value: '', displayValue: 'Choose chapter'},
          //     {value: 'Social aid', displayValue: 'Social aid'},
          //     {value: 'Health services', displayValue: 'Health services'},
          //     {value: 'Solidarity', displayValue: 'Solidarity'},
          //     {value: 'Other services', displayValue: 'Other services'}
          // ]
        },
        displayValue: "",
        value: "",
        validation: {},
        valid: true,
      },
      offer: {
        elementType: "select",
        elementConfig: {
          options: [{ value: "", displayValue: "Choose sub-chapter" }],
        },
        value: "",
        validation: {},
        valid: true,
      },
    },
    formIsValid: false,
    loading: false,
  });

  useEffect(() => {
    if (error && error.length) {
      if (typeof error === "object") {
        error.forEach((err) => {
          setAlert(err.msg, "danger");
        });
      } else {
        setAlert(error, "danger");
      }

      clearErrors();
    }

    // eslint-disable-next-line
  }, [error]);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (
      state.orderForm.category.value === "" ||
      state.orderForm.offer.value === ""
    ) {
      setAlert("Please enter all fields", "danger");
    } else {
      const name = user.username;
      const email = user.email;
      const category = state.orderForm.category.value;
      const offer = state.orderForm.offer.value;
      await request({ name, email, category, offer });
      setAlert("Request send with success", "success");
    }
  };

  const classes = useStyles();

  const checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...state.orderForm,
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    if (updatedOrderForm.category.value === "Choose chapter") {
      updatedOrderForm.offers.elementConfig.options = [];
    }

    if (updatedOrderForm.category.value === "Choose chapter") {
      updatedOrderForm.offer.elementConfig.options = [
        { value: "", displayValue: "offers" },
      ];
    }
    var selectedID = updatedOrderForm.category.value;
    // for (const element of options) {
    //   if(updatedOrderForm.category.value == element.displayValue){
    //     selectedID = element.value;
    //   }
    // };

    updatedOrderForm.offer.elementConfig.options = [
      { value: "", displayValue: "Choose sub-chapter" },
    ];
    for (const element of sousCOptions) {
      if (element.chapitre == selectedID) {
        updatedOrderForm.offer.elementConfig.options.push({
          value: element._id,
          displayValue: element.displayValue,
        });
      }
    }

    // if (updatedOrderForm.category.value === 'Social aid') {
    //     updatedOrderForm.offer.elementConfig.options = [
    //          {value: '', displayValue: 'Choose sub-chapter'},
    //         {value: 'Retirement', displayValue: 'Retirement'},
    //         {value: 'Death', displayValue: 'Death'},
    //         {value: 'Marriage', displayValue: 'Marriage'},
    //         {value: 'New born', displayValue: 'New born'},
    //         {value: 'Circumcision', displayValue: 'Circumcision'}
    //     ]
    // };
    // if (updatedOrderForm.category.value === 'Health services') {
    //     updatedOrderForm.offer.elementConfig.options = [
    //         {value: '', displayValue: 'Choose sub-chapter'},
    //         {value: 'Surgery operations', displayValue: 'Surgery operations'},
    //         {value: 'Hammamat( mineral bath )', displayValue: 'Hammamat( mineral bath )'}
    //     ]
    // };
    // if (updatedOrderForm.category.value === 'Solidarity') {
    //     updatedOrderForm.offer.elementConfig.options = [
    //        {value: '', displayValue: 'Choose sub-chapter'},
    //         {value: 'Aids for accident and catastrophe', displayValue: 'Aids for accident and catastrophe'},
    //         {value: ' Aids for the exceptional cases', displayValue: ' Aids for the exceptional cases'},
    //     ]
    // };
    // if (updatedOrderForm.category.value === 'Other services') {
    //     updatedOrderForm.offer.elementConfig.options =[
    //         {value: '', displayValue: 'Choose sub-chapter'},
    //         {value: 'Exceptional loan', displayValue: 'Exceptional loan'},
    //         {value: 'Sport and cultural activities', displayValue: 'Sport and cultural activities'},
    //     ]
    // };

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  const formElementsArray = [];
  for (let key in state.orderForm) {
    formElementsArray.push({
      id: key,
      config: state.orderForm[key],
    });
  }
  return (
    <>
      <Helmet>
        <title>{`${WEBSITE_NAME} | Request`}</title>
      </Helmet>
      <Container className={`${classes.page} `}>
        <div className="container-inner px-3 mt-4">
          <div className="auth mx-auto">
            <h4 className="mb-3 text-center ">
              <strong className="title">Add a request</strong>
            </h4>

            <Form className="form form-container" onSubmit={onSubmit}>
              <form onSubmit={onSubmit}>
                {formElementsArray.map((formElement) => (
                  <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) =>
                      inputChangedHandler(event, formElement.id)
                    }
                  />
                ))}
              </form>

              <div className="links d-flex align-items-center justify-content-between mt-4">
                {loading ? (
                  <Spinner />
                ) : (
                  <button className="button-primary" type="submit">
                    SEND
                  </button>
                )}
              </div>
            </Form>
          </div>
        </div>
      </Container>
    </>
  );
};

const mapSateToProps = (state) => ({
  error: state.auth.error,
  user: state.auth.user,
  loading: state.auth.loading,
});

export default connect(mapSateToProps, { request, clearErrors, setAlert })(
  Request
);
