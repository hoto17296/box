import AWS from 'aws-sdk/global'
import Vue from 'vue'
import App from './App.vue'

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

new Vue({ el: 'main', render: h => h(App) });
