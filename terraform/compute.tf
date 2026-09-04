# launch template
resource "aws_launch_template" "pizza_lt" {
  name_prefix   = "pizza-lt-"
  image_id      = data.aws_ami.amazon_linux_2023.id
  instance_type = "t3.micro"

  iam_instance_profile {
    arn = aws_iam_instance_profile.ec2_profile.arn
  }

  network_interfaces {
    associate_public_ip_address = false
    security_groups             = [aws_security_group.ec2_sg.id]
  }

  user_data = base64encode(<<-EOF
              #!/bin/bash
              dnf update -y
              dnf install -y docker
              systemctl start docker
              systemctl enable docker
              docker run -d -p 80:80 vinothdilshan/pizza-backend:latest
              EOF
  )

  tag_specifications {
    resource_type = "instance"
    tags          = { Name = "pizza-backend-asg-server" }
  }
}

# auto scaling group
resource "aws_autoscaling_group" "pizza_asg" {
  name                = "pizza-asg"
  vpc_zone_identifier = [aws_subnet.private_1.id, aws_subnet.private_2.id]
  target_group_arns   = [aws_lb_target_group.pizza_tg.arn]
  min_size            = 1
  max_size            = 3
  desired_capacity    = 2

  launch_template {
    id      = aws_launch_template.pizza_lt.id
    version = "$Latest"
  }

  health_check_type         = "ELB"
  health_check_grace_period = 300

  lifecycle {
    create_before_destroy = true
  }
}