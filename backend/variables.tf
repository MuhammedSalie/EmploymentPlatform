variable "region" {
  type        = string
  description = "The region in which to create/manage resources"
  default     = "us-east-1"
}

variable "momentoApiKey" {
  type        = string
  description = "Api Key"
}

variable "momentoHTTPEndpoint" {
  type        = string
  description = "HTTP Endpoint"
}

variable "momentoRefreshToken" {
  type        = string
  description = "Refresh Token"
}
variable "environment" {
  type        = string
  description = "Environment"
}