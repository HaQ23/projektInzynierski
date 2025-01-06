
FROM openjdk:17-jdk-slim


ENV LANG=C.UTF-8


WORKDIR /app

COPY target/core-1.0-SNAPSHOT.jar app.jar

CMD ["java", "-jar", "app.jar"]
