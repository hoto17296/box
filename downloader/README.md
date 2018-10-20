# Downloader

## Environment Variables
Create `.env` file before build.

| key | default value |
|---|---|
| `AWS_ACCESS_KEY_ID` | required |
| `AWS_SECRET_ACCESS_KEY` | required |
| `AWS_REGION` | required |
| `AWS_LAMBDA_BACKEND_FUNCTION` | `depot-backend` |

The AWS credentials should **only** be allowed to invoke the Lambda function.
