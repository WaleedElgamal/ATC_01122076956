FROM openjdk:25-ea-4-jdk-oraclelinux9

WORKDIR /app

COPY ./target/ target/

ENV JWT_SECRET="3cfa76ef14937c1c0ea519f8fc057a80fcd04a7420f8e8bcd0a7567c272e007b"
ENV JWT_EXPIRATION="3600000"


EXPOSE 8080

ENTRYPOINT ["java", "-jar", "target/event-booking-0.0.1-SNAPSHOT.jar"]