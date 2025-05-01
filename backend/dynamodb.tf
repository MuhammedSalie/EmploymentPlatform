resource "aws_dynamodb_table" "job_listings" {
  name           = "job_listings"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "job_id"

  attribute {
    name = "job_id"
    type = "S"
  }

  attribute {
    name = "status"
    type = "S"
  }

  global_secondary_index {
    name               = "status-index"
    hash_key           = "status"
    projection_type    = "ALL"
  }

  tags = {
    Environment = var.environment
  }
}