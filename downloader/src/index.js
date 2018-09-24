import AWS from 'aws-sdk/global'
import Lambda from 'aws-sdk/clients/lambda'
import promisify from './promisify'
import Vue from 'vue'
import App from './App.vue'


AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const lambda = new Lambda();

function invoke(id, password) {
  return promisify(lambda.invoke).bind(lambda)({
    FunctionName : process.env.AWS_LAMBDA_BACKEND_FUNCTION || 'depot-backend',
    Payload : JSON.stringify({ id, password }),
  });
}

new Vue({
  el: 'main',
  render: h => h(App),
});

/*
window.onload = function() {
  invoke('Pokemon.csv', 'foo').then((data) => console.log(JSON.parse(data.Payload)));
};
*/
