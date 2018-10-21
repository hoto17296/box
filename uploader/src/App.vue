<template>
  <main>
    <h1>File Uploader</h1>
    <Form />
    <h1>File List</h1>
    <ul>
      <li v-for="file in files">
        <File :name="file.Key" :date="file.LastModified" />
      </li>
    </ul>
  </main>
</template>

<script>
import Form from './Form.vue'
import File from './File.vue'
import S3 from 'aws-sdk/clients/s3'

export default {
  data() {
    return {
      files: [],
    }
  },
  mounted() {
    const s3 = new S3();
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
    };
    s3.listObjectsV2(params, (err, data) => {
      if (err) return console.error(err);
      this.files = data.Contents.sort((a, b) => b.LastModified - a.LastModified);
    });
  },
  components: {
    Form,
    File,
  }
}
</script>
