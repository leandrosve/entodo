#### Stage 1: Build the application
FROM openjdk:8 as build

# Set the current working directory inside the image
WORKDIR /app

# Copy maven executable to the image
COPY mvnw .
COPY .mvn .mvn

# Copy the pom.xml file
COPY pom.xml .

# Copy the project source
COPY src src

EXPOSE 8080

ENTRYPOINT ["./mvnw", "spring-boot:run"]
