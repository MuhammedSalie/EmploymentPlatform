variable "region" {
  type        = string
  description = "The region in which to create/manage resources"
  default     = "us-east-1"
}

variable "MomentoApiKey" {
  type        = string
}

variable "MomentoHTTPEndpoint" {
  type        = string
}

variable "MomentoRefreshToken" {
  type        = string
}