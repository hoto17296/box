<template>
  <div>
    <div v-if="file">
      <dl>
        <dt>Name</dt>
        <dd>{{ file.name }}</dd>
        <dt>Size</dt>
        <dd>{{ file.size }} bytes</dd>
      </dl>
      <a :href="file.url">Download</a>
    </div>
    <form v-else v-on:submit.prevent="onSubmit">
      <input type="password" v-model="password" placeholder="Password" />
      <input type="submit" value="Submit" />
      <p v-if="errorMessage">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import Lambda from 'aws-sdk/clients/lambda'

function authenticate(id, password) {
  const lambda = new Lambda();
  return new Promise((resolve, reject) => {
    const params = {
      FunctionName: process.env.AWS_LAMBDA_BACKEND_FUNCTION || 'depot-backend',
      Payload: JSON.stringify({ id, password }),
    };
    lambda.invoke(params, (err, data) => {
      if (err) reject(err);
      else resolve(JSON.parse(data.Payload));
    });
  });
}

export default {
  name: 'app',
  props: {
    id: {
      required: true,
      type: String,
      validator(value) {
        return value.match(/^[\da-f-]{36}$/i);
      },
    },
  },
  data() {
    return {
      password: '',
      file: null,
      errorMessage: null,
    }
  },
  methods: {
    onSubmit(event) {
      authenticate(this.id, this.password).then(data => {
        if (data) {
          this.file = data;
        }
        else {
          this.errorMessage = 'password incorrect';
        }
      });
    },
  },
}
</script>
