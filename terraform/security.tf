# alb security group
resource "aws_security_group" "alb_sg" {
  name        = "pizza-alb-sg"
  description = "allow public http access to alb"
  vpc_id      = aws_vpc.pizza_vpc.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = { Name = "pizza-alb-sg" }
}

# ec2 security group 
resource "aws_security_group" "ec2_sg" {
  name        = "pizza-ec2-sg"
  description = "allow http traffic from alb only "
  vpc_id      = aws_vpc.pizza_vpc.id

  ingress {
    from_port       = 5000
    to_port         = 5000
    protocol        = "tcp"
    security_groups = [aws_security_group.alb_sg.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = { Name = "pizza-ec2-sg" }
}