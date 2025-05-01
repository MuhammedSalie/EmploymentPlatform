module "dynamodb" {
  source = "./modules/dynamodb"
  environment = var.environment
}

module "cognito" {
  source = "./modules/cognito"
}

module "sns" {
  source = "./modules/sns"
  email  = var.email
}

module "s3" {
  source = "./modules/s3"
}

module "secrets" {
  source = "./modules/secrets"
  momentoApiKey = var.momentoApiKey
  momentoHTTPEndpoint = var.momentoHTTPEndpoint
  momentoRefreshToken = var.momentoRefreshToken
}

