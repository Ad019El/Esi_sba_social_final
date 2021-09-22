import { createUseStyles } from 'react-jss';
import colors from '../../../Styles/Color';

const useStyles = createUseStyles({
  footer: {
    float : 'bottom' ,
    marginBottom: '30px',
    '& .social': {
      '& .icon': {
        color: colors['text-gray-500'],
        fontSize: '28px',
        '&:hover': {
          color: colors['text-gray-600'],
        },
      },
    },
    '& .message': {
      maxWidth: '680px',
      color: colors['text-gray-600'],
      padding: '0 15px',
    },
    '& .Copyright': {
      color: colors['text-gray-700'],
      fontWeight: 500,
    },
    '& .footer':{
      color: colors['text-gray-700'],
      fontWeight: 500,
    },
    '& .span' : {
      color: colors['text-gray-700'],
      fontWeight: 500,
    },
    '& .gh' :{
      color : '#f06595',
      fontWeight : 500 ,
      '&:hover' :{
        color :'#c2255c'
      }
    }
  },
});

export default useStyles;
