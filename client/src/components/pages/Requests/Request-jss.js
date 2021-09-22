import { createUseStyles } from 'react-jss';
import colors from '../../../Styles/Color';
import {  BUTTON_PRIMARY,
          INPUT_TEXT ,
          POSTITEM_CARD } from '../../../Styles/Button';


const useStyles = createUseStyles({
  page: {
    padding: '30px 20px',
    marginBottom: '-40px',
   
    '&.card-shadow': {
      borderRadius: '10px',
     
      
    'box-shadow': '26px 26px 26px rgb(109,184,241, 0.16)',
    },
    '& .title': {
      color: '#2d3748',
    },


    '& .subtitle': {
      color: colors['text-gray-700'],
      fontWeight: '400',
    },

    '& .search-form': {
      padding: '20px 20px',
      '& .input-text': {
        ...INPUT_TEXT,
        width: '100%',
      },
    },

    '& .button-primary': BUTTON_PRIMARY,    

    '& .input-select': {
      height: 'auto',
      background: 'none',
    },
    '@media screen and (min-width: 992px)': {
      '& .collapse': { display: 'block' },
    },
    '& .postitem-card': {
      ...POSTITEM_CARD,
      '& .postitem-details-top': {
        '& h5.title': {
          color: colors['text-gray-800'],
        },
        '& p.description': {
          color: colors['text-gray-600'],
          fontWeight: 500,
          fontSize: '15px',
        },
      },
      '& .postitem-details-bottom': {
        '& p.location': {
          color: colors['text-gray-700'],
          fontWeight: 500,
          fontSize: '15px',
        },
        '& p.date': {
          color: colors['text-gray-600'],
          fontSize: '15px',
        },
      },
    },
    '& .no-requests': {
      '& p': {
        color: colors['text-gray-500'],
        fontWeight: '400',
      },
    },
    '& .post-content': {
      '& .title': {
        fontWeight: 600,
        color: colors.primary,
        '& .status': {
          fontWeight: 500,
          fontSize: '15px',
          color: colors['text-gray-900'],
        },
      },
      '& .description': {
        maxWidth: '700px',
        fontWeight: 400,
        color: colors['text-gray-700'],
        '& .subtitle': {
          fontWeight: 600,
        },
      },
      '& .date': {
        fontSize: '.9rem',
        fontWeight: 500,
        color: colors['text-gray-500'],
      },
      '& .pictures': {
        '& img': {
          cursor: 'pointer',
        },
      },
      '& .contact-details': {
        '& .icon': {
          color: colors['text-gray-700'],
          fontSize: '28px',
        },
        '& .title': {
          fontWeight: 600,
          color: colors['text-gray-700'],
        },
      },
      '& .button-primary, & .button-transparent': {
        padding: '15px 30px !important',
        borderRadius: '18px',
      },
    },
    '& .add-form': {
      maxWidth: '520px',
      '& .input-text': {
        ...INPUT_TEXT,
        width: '100%',
      },
      '& [type="file"]': {
        display: 'none',
        '& + label': {
          fontWeight: 600,
          background: colors['text-gray-100'],
          padding: '15px 30px',
          '&:hover': {
            background: colors['text-gray-300'],
          },
        },
      },
    },
    '&.user-posts': {
      '& .table': {
        minWidth: '750px',
        '& thead th': {
          fontWeight: '600',
          fontSize: '15px',
        },
        '& .type': {
          fontWeight: '600',
          fontSize: '14px',
          padding: '2px 5px',
          borderRadius: '5px',
          color: colors['text-white'],
          '&.donation': {
            background: colors['primary-fill'],
          },
          '&.request': {
            background: colors.request,
          },
        },
        '& .actions': {
          '& .icon': {
            fontSize: '18px',
            '&.icon-decline': {
              color: colors.danger,
            },
          },
        },
      },
    },
  },
});

export default useStyles;
