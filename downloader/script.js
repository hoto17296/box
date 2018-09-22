function main() {
  const lambda = new AWS.Lambda();
  const params = {
    FunctionName : 'depot-backend',
    Payload : JSON.stringify({
      id: 'Pokemon.csv',
      password: 'foo',
    }),
  };
  lambda.invoke(params, (err, data) => {
    if (err) console.error(err, err.stack);
    else console.log(JSON.parse(data.Payload));
  });
}
