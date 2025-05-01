resource "aws_secretsmanager_secret" "credentials" {
  name        = "credentials"
  description = "Credentials for job portal"
  recovery_window_in_days  = 0
}

resource "aws_secretsmanager_secret_version" "credentials" {
  secret_id     = aws_secretsmanager_secret.credentials.id
  secret_string = jsonencode({
    MomentoApiKey = var.momentoApiKey,
    MomentoHTTPEndpoint = var.momentoHTTPEndpoint,
    MomentoRefreshToken = var.momentoRefreshToken
  })
}