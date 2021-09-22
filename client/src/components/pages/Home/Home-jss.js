import { createUseStyles } from 'react-jss';

const Styles = createUseStyles({
  page: {
    padding: '0px 150px 0px 150px',
    marginBottom: '10px',
    '& .loop': {
    color: '#c2255c',
    },
    '& h1.title': {
      color: '#2d3748',
      fontWeight: '700',
      fontSize: '3rem',
      maxWidth: '700px',
      '& .red' :{
        color : '#c2255c',
    },
    },

    '@media screen and (max-width: 576px)': {
      '& h1.title': {
        fontSize: '2rem',
      },
      '& .red' :{
        color : '#c2255c',
    },
    },

    '& .paragraph': {
      textAlign: 'center',
      color: '#718096',
      fontWeight: '500',
      maxWidth: '500px',
      fontSize: '1.3rem',
      '& span': {
        fontWeight: '700',
        color: '#4a5568',
      },
    },

    '& h3.title': {
      color: '#2d3748',
      fontWeight: '500',
      maxWidth: '250px',
      position: 'relative',
      '& .bold': {
        fontWeight: '700',
      },
      
    },

    '& .features': {
      '& .img' : {
        maxWidth : '50px',
        maxHeight : '50px'
      },
      '& .title': {
        color: '#2d3748',
        fontWeight: '600',
      },
      '& .description': {
        color:  '#718096',
        fontWeight: '600',
        maxWidth: '500px',
      },
    },

    '& .this-platform': {
      '& .paragraph': {
        textAlign:'center',
        fontSize: '1.1rem',
      },
    },

    '@media screen and (min-width: 992px)': {
      '& h3.title': {
        '&:after': {
          content: '""',
          position: 'absolute',
          bottom: 13,
          width: '50px',
          display: 'inline',
          borderTop: `3px solid ${'#cbd5e0'}`,
        },
      },

      '& .features': {
        '& h3.title': {
          '&:after': {
            right: -70,
          },
        },
      },

      '& .this-platform': {
        '& h3.title': {
          '&:after': {
            right: 0,
          },
        },
      },
    },
  },
});

export default Styles;
