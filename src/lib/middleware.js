// eslint-disable-next-line import/no-extraneous-dependencies
import { wrapError, DBError } from "db-errors";

// A very simple error handler. In a production setting you would
// not want to send information about the inner workings of your
// application or database to the client.
// eslint-disable-next-line import/prefer-default-export
export function onError(error, request, response, next) {
  if (response.headersSent) {
    next(error);
  }
  const wrappedError = wrapError(error);
  if (wrappedError instanceof DBError) {
    response.status(400).send(wrappedError.data || wrappedError.message || {});
  } else {
    response
      .status(wrappedError.statusCode || wrappedError.status || 500)
      .send(wrappedError.data || wrappedError.message || {});
  }
}
