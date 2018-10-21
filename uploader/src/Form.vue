<template>
  <form v-on:submit.prevent="onSubmit">
    <dl>
      <dt>File</dt>
      <dd>
        <input type="file" name="file" required />
      </dd>
      <dt>File Name</dt>
      <dd>
        <input type="text" v-model="filename" required />
      </dd>
      <dt>Password</dt>
      <dd>
        <input type="password" v-model="password" placeholder="Password" required />
      </dd>
      <dt>Password (confirm)</dt>
      <dd>
        <input type="password" v-model="passwordConfirm" placeholder="Password (Confirm)" required />
      </dd>
      <dt>Expires</dt>
      <dd>
        <input type="number" v-model="expires" min="1" max="30" required />
        days
      </dd>
    </dl>
    <input type="submit" value="Submit" />
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </form>
</template>

<script>
import crypto from 'crypto'
import S3 from 'aws-sdk/clients/s3'
import uuidv4 from 'uuid/v4'

function hash(str, algorithm='sha256', encoding='hex') {
    const hmac = crypto.createHmac(algorithm, process.env.HASH_SECRET);
    hmac.update(str);
    return hmac.digest(encoding);
}

export default {
  data() {
    return {
      filename: null,
      password: '',
      passwordConfirm: '',
      expires: 7,
      errorMessage: null,
    }
  },
  methods: {
    // TODO on file changed

    onSubmit(event) {
      // TODO password validation
      const file = event.target.file.files[0]; // TODO validation
      // TODO expires validation
      if (!file) return; // TODO
      const s3 = new S3();
      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: uuidv4(),
        Body: file,
        Expires: new Date(Date.now() + this.expires * 86400 * 1000),
        ContentType: file.type,
        ContentDisposition: "attachment; filename*=UTF-8''" + encodeURIComponent(this.filename),
        Metadata: {
          'filename': encodeURIComponent(this.filename),
          'hash': hash(this.password),
        },
      };
      s3.putObject(params, (err, data) => {
        if (err) console.error(err);
        else console.log(data);
        // TODO reload page
      });
    },
  },
}
</script>
