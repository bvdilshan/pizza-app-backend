# application lb
resource "aws_lb" "pizza_alb" {
  name               = "pizza-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb_sg.id]
  subnets            = [aws_subnet.public_1.id, aws_subnet.public_2.id]

  tags = { Name = "pizza-alb" }
}

# target group
resource "aws_lb_target_group" "pizza_tg" {
  name     = "pizza-tg-5000"
  port     = 5000
  protocol = "HTTP"
  vpc_id   = aws_vpc.pizza_vpc.id

  health_check {
    path                = "/health"
    port                = "5000"
    healthy_threshold   = 2
    unhealthy_threshold = 5
    timeout             = 5
    interval            = 30
    matcher             = "200"
  }
}

#alb listener
resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.pizza_alb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.pizza_tg.arn
  }
}