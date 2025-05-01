resource "aws_sns_topic" "job_status_topic" {
  name = "job-status-updates"
}

resource "aws_sns_topic_subscription" "email_subscription" {
  topic_arn = aws_sns_topic.job_status_topic.arn
  protocol  = "email"
  endpoint  = var.email
}