interface HttpErrors {
  unprocessableEntity(message: string): string;
  notFound(message: string): string;
  unauthorized(message: string): string;
  forbidden(message: string): string;
}

const httpErrorsMessages = {
  unprocessableEntity: 'not valid or already exists',
  notFound: 'not found or does not exist',
  unauthorized: 'not authenticated',
  forbidden: 'not granted access',
};

const httpErros = Object.entries(httpErrorsMessages).reduce(
  (previousValues, currentValuePair) => ({
    ...previousValues,
    [currentValuePair[0]]: (message: string) => new Error(`${message} ${currentValuePair[1]}`),
  }),
  {},
) as HttpErrors;

export default httpErros;
