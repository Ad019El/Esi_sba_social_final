import React, { Component } from 'react';
import Input from './InputElement';



class Form extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Full Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            category: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'All categories', displayValue: 'All categories'},
                        {value: 'Social aid', displayValue: 'Social aid'},
                        {value: 'Health services', displayValue: 'Health services'},
                        {value: 'Solidarity', displayValue: 'Solidarity'},
                        {value: 'Other services', displayValue: 'Other services'}
                    ]
                },
                value: '',
                validation: {},
                valid: true
            },
            offers: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'All offers', displayValue: 'All offers'},
                    ]
                },
                value: '',
                validation: {},
                valid: true
            }
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = ( event ) => {
        event.preventDefault();
        this.setState( { loading: true } );
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }  
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        if (updatedOrderForm.category.value === 'All categories') {
            updatedOrderForm.offers.elementConfig.options = [

            ]
        }
        if (updatedOrderForm.category.value === 'Social aid') {
            updatedOrderForm.offers.elementConfig.options = [
                {value: 'Retirement', displayValue: 'Retirement'},
                {value: 'Death', displayValue: 'Death'},
                {value: 'Marriage', displayValue: 'Marriage'},
                {value: 'New born', displayValue: 'New born'},
                {value: 'Circumcision', displayValue: 'Circumcision'}
            ]
        };
        if (updatedOrderForm.category.value === 'Health services') {
            updatedOrderForm.offers.elementConfig.options = [
                {value: 'Surgery operations', displayValue: 'Surgery operations'},
                {value: 'Hammamat( mineral bath )', displayValue: 'Hammamat( mineral bath )'}
            ]
        };
        if (updatedOrderForm.category.value === 'Solidarity') {
            updatedOrderForm.offers.elementConfig.options = [
                {value: 'Aids for accident and catastrophe', displayValue: 'Aids for accident and catastrophe'},
                {value: ' Aids for the exceptional cases', displayValue: ' Aids for the exceptional cases'},
            ]
        };
        if (updatedOrderForm.category.value === 'Other services') {
            updatedOrderForm.offers.elementConfig.options =[
                {value: 'Exceptional loan', displayValue: 'Exceptional loan'},
                {value: 'Sport and cultural activities', displayValue: 'Sport and cultural activities'},
            ]
        };
        if (updatedOrderForm.category.value === 'All categories') {
            updatedOrderForm.offers.elementConfig.options =[
                {value: 'All types', displayValue: 'All types'}
            ]
        }
        
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
            </form>
        );
       
        return (
            <div >
                {form}
            </div>
        );
    }
}

export default Form;