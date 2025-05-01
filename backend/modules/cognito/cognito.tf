resource "aws_cognito_user_pool" "user_pool" {
  name = "job-portal-user-pool"
}

resource "aws_cognito_user_pool_client" "user_pool_client" {
  name         = "job-portal-app-client"
  user_pool_id = aws_cognito_user_pool.user_pool.id
  generate_secret = false
}