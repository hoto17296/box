# Uploader

## Environment Variables
Create `.env` file before build.

| key | default value |
|---|---|
| `AWS_ACCESS_KEY_ID` | required |
| `AWS_SECRET_ACCESS_KEY` | required |
| `AWS_REGION` | required |
| `AWS_S3_BUCKET_NAME` | required |
| `HASH_SECRET` | required |

## CORS Configuration Example
``` xml
<CORSConfiguration>
    <CORSRule>
        <AllowedOrigin>*</AllowedOrigin>
        <AllowedMethod>GET</AllowedMethod>
        <AllowedMethod>PUT</AllowedMethod>
        <AllowedHeader>*</AllowedHeader>
    </CORSRule>
</CORSConfiguration>
```
