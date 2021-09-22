import React from 'react';

import useStyles from './Spinner-jss';

const Spinner = () => {
  const classes = useStyles();

  return <div className={classes.spinner}></div>;
};

export default Spinner;