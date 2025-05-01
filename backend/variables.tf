variable "region" {
  type        = string
  description = "The region in which to create/manage resources"
  default     = "us-east-1"
}

variable "MomentoApiKey" {
  type        = string
  description = "Api Key"
}

variable "MomentoHTTPEndpoint" {
  type        = string
  description = "HTTP Endpoint"
}

variable "MomentoRefreshToken" {
  type        = string
  description = "Refresh Token"
}