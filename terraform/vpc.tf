# vpc
resource "aws_vpc" "pizza_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = { Name = "pizza-vpc" }
}

# internet gateway
resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.pizza_vpc.id

  tags = { Name = "pizza-igw" }
}

# public subnets
resource "aws_subnet" "public_1" {
  vpc_id                  = aws_vpc.pizza_vpc.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "${var.aws_region}a"
  map_public_ip_on_launch = true

  tags = { Name = "pizza-public-subnet-1" }
}

resource "aws_subnet" "public_2" {
  vpc_id                  = aws_vpc.pizza_vpc.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = "${var.aws_region}b"
  map_public_ip_on_launch = true

  tags = { Name = "pizza-public-subnet-2" }
}

# private subnets
resource "aws_subnet" "private_1" {
  vpc_id            = aws_vpc.pizza_vpc.id
  cidr_block        = "10.0.3.0/24"
  availability_zone = "${var.aws_region}a"

  tags = { Name = "pizza-private-subnet-1" }
}

resource "aws_subnet" "private_2" {
  vpc_id            = aws_vpc.pizza_vpc.id
  cidr_block        = "10.0.4.0/24"
  availability_zone = "${var.aws_region}b"

  tags = { Name = "pizza-private-subnet-2" }
}

# elastic ip and nat gateway
resource "aws_eip" "eip_1" {
  domain = "vpc"

}

resource "aws_nat_gateway" "nat_gw_1" {
  allocation_id = aws_eip.eip_1.id
  subnet_id     = aws_subnet.public_1.id

  tags = { Name = "pizza-nat-gw-1" }
}

# public route table
resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.pizza_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = { Name = "pizza-public-rt" }
}

resource "aws_route_table_association" "pub_assoc_1" {
  subnet_id      = aws_subnet.public_1.id
  route_table_id = aws_route_table.public_rt.id

}

resource "aws_route_table_association" "pub_assoc_2" {
  subnet_id      = aws_subnet.public_2.id
  route_table_id = aws_route_table.public_rt.id
}

# private route table
resource "aws_route_table" "private_rt_1" {
  vpc_id = aws_vpc.pizza_vpc.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat_gw_1.id
  }

  tags = { Name = "pizza-private-rt-1" }
}

resource "aws_route_table_association" "priv_assoc_1" {
  subnet_id      = aws_subnet.private_1.id
  route_table_id = aws_route_table.private_rt_1.id
}

resource "aws_route_table_association" "priv_assoc_2" {
  subnet_id      = aws_subnet.private_2.id
  route_table_id = aws_route_table.private_rt_1.id
}

# s3 gateway endpoint
resource "aws_vpc_endpoint" "s3" {
  vpc_id            = aws_vpc.pizza_vpc.id
  service_name      = "com.amazonaws.${var.aws_region}.s3"
  vpc_endpoint_type = "Gateway"
  route_table_ids   = [aws_route_table.private_rt_1.id]

  tags = {
    Name = "pizza-s3-endpoint"
  }
}