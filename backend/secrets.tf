resource "aws_secretsmanager_secret" "credentials" {
  name        = "credentials"
  description = "Credentials for job portal"
}

resource "aws_secretsmanager_secret_version" "credentials" {
  secret_id     = aws_secretsmanager_secret.credentials.id
  secret_string = jsonencode({
    MomentoApiKey = var.MomentoApiKey,
    MomentoHTTPEndpoint = var.MomentoHTTPEndpoint,
    MomentoRefreshToken = var.MomentoRefreshToken
  })
}