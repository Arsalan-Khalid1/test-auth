const uniqueMessage = (error: any) => {
  let output;
  try {
    let fieldName = error.message.substring(
      error.message.lastIndexOf(".$") + 2,
      error.message.lastIndexOf("_1")
    );
    output =
      fieldName.charAt(0).toUpperCase() +
      fieldName.slice(1) +
      " already exists";
  } catch (ex) {
    output = "Unique field already exists";
  }

  return output;
};

/**
 * Get the erroror message from error object
 */
const dbErrorHandler = (error: any) => {
  let message = "";
  let code : number = 500;

  if (error.code) {
    switch (error.code) {
      case 11000:
      case 11001:
        message = uniqueMessage(error);
        code = 400
        break;
      default:
        code = 500
        message = "Something went wrong";
    }
  } else {
    console.log(error)
    for (let errorName in error.errors) {
      if (error.errors[errorName].message)
        message = error.errors[errorName].message;
    }
  }

  return {message, code};
};

export default dbErrorHandler;
