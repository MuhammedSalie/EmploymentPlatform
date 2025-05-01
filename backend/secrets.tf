resource "aws_secretsmanager_secret" "credentials" {
  name        = "credentials"
  description = "Credentials for job portal"
}

