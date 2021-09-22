import React from 'react';
import { Container } from 'react-bootstrap';
import useStyles from './Footer-jss';

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={`${classes.footer} `}>
      <div className='container'>
        <div className='row'>
          <div className='col text-center'>
           
          <Container>
            <div className='footer my-4 text-center'>
              Crafted with {' '}
              <span role='img' aria-label='heart'>
              ❤️
              </span>{' '} By {' '}
              <a className='gh'
                href='https://github.com/sidahmedsahraoui/Full-Project'
                target='_blank'
                rel='noopener noreferrer'
              >{`<Github />`}</a>
            </div>
          </Container>
            
            <div className='Copyright mx-auto'>
              <p>Copy Rights &copy; Social Charities 2021</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


