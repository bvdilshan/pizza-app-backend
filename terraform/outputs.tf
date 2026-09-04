output "alb_dns_name" {
  value       = "http://${aws_lb.pizza_alb.dns_name}"
  description = "public url of the pizza alb"
}