# iam roal
resource "aws_iam_role" "ec2_ssm_role" {
  name = "pizza-ec2-ssm-role"

  assume_role_policy = jsonencode({
    Version     = "2012-10-17"
    Statement   = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = { Service = "ec2.amazonaws.com" }
    }]
  })
}

# attach policy 
resource "aws_iam_role_policy_attachment" "ssm_policy" {
  role       = aws_iam_role.ec2_ssm_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}

# ec2 instance profile
resource "aws_iam_instance_profile" "ec2_profile" {
  name = "pizza-ec2-instance-profile"
  role = aws_iam_role.ec2_ssm_role.name


}