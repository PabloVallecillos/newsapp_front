const handleResponseError = (err) => {
  let msg = '';
  if (typeof err === 'object' && err !== null) {
    Object.values(err).forEach((e) => {
      msg += `${e}<br/>`;
    });
  } else if (err && Array.isArray(err)) {
    err.forEach((e) => {
      msg += `${e}<br/>`;
    });
  } else {
    console.error(err);
    msg = err;
  }
  return msg;
};

export default handleResponseError;
