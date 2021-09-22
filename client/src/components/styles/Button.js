import colors from './Color'

export const BUTTON_PRIMARY = {
    background:  '#f06595',
    border: 0,
    borderRadius: '10px',
    fontWeight: 600,
    color: '#fff !important',
    padding: '8px 20px !important',
    '&:not([disabled]):hover': {
      background: '#c2255c',
    },
  };
  
  export const BUTTON_PRIMARY_OUTLINE = {
    background: '#fff',
    border: `2px solid ${'#67C8DC'}`,
    borderRadius: '10px',
    fontWeight: 600,
    color: '#67C8DC',
    padding: '8px 20px !important',
    '&:hover': {
      color: '#46B0C6',
      borderColor: '#46B0C6',
    },
  };
  
  export const BUTTON_LIGHT = {
    background: '#f7fafc',
    borderRadius: '10px',
    fontWeight: 500,
    color: '#4a5568',
    padding: '8px 20px !important',
    '&:hover': {
      background: '#edf2f7',
    },
  };
  
  export const BUTTON_GRAY = {
    background: '#edf2f7',
    border: 0,
    borderRadius: '10px',
    fontWeight: 600,
    color: '#2d3748'.concat('!important'),
    padding: '8px 20px !important',
    '&:not([disabled]):hover': {
      background: '#e2e8f0',
    },
  };
  
  export const BUTTON_TRANSPARENT = {
    background: 'transparent',
    color: '#67C8DC',
    border: 0,
    borderRadius: '10px',
    fontWeight: 600,
    padding: '8px 20px !important',
    '&:not([disabled]):hover': {
      color: '#46B0C6',
      borderColor: '#46B0C6',
    },
  };
  
  export const LINK_PRIMARY = {
    fontWeight: 500,
    color: `${'#1a202c'} !important`,
    '&:hover': {
      color: '#1a202c',
    },
  };


  export const CARD_SHADOW = {
    borderRadius: '10px',
    'box-shadow': '0px 13px 26px rgb(109,184,241, 0.16)',
  };
  
  export const INPUT_TEXT = {
    fontWeight: 500,
    borderRadius: '10px',
    padding: '8px 20px',
    border: `2px solid ${colors['text-gray-200']}`,
    '&:focus': {
      borderColor: colors['text-gray-400'],
    },
  };
  
  export const SIDEBAR_TITLE = {
    fontWeight: 500,
    color: colors['text-gray-500'],
  };
  
  export const POSTITEM_CARD = {
    
    '&:hover': {
      'box-shadow': '0px 13px 26px rgb(109,184,241, 0.16)',
    },
  };
  export const BUTTON_TRANSPARENT_D = {
    background: 'transparent',
    color: '#46B0C6',
    border: 0,
    borderRadius: '10px',
    fontWeight: 600,
    padding: '8px 20px !important'
  };
  export const BUTTON_TRANSPARENT_N = {
    background: 'transparent',
    color: 'black',
    border: 0,
    borderRadius: '10px',
    fontWeight: 600,
    padding: '8px 20px !important'
  };

  export const BUTTON_LOGIN = {
    padding: '40px 40px !important',
    background: ' #38d9a9',
    border: 0,
    borderRadius: '5px',
    fontWeight: 600,
    color: '#46B0C6 !important',
    '&:not([disabled]):hover': {
      background: 'red ',
    },
  }