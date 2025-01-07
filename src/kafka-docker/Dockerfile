FROM openjdk:11-jre-slim

# Ustawienie zmiennych środowiskowych
ENV KAFKA_VERSION=3.5.1 \
    SCALA_VERSION=2.13 \
    KAFKA_HOME=/opt/kafka \
    ZOOKEEPER_DIR=/tmp/zookeeper \
    KAFKA_LOGS=/tmp/kafka-logs

# Pobieranie i instalacja Kafki
RUN apt-get update && apt-get install -y wget bash curl && \
    wget https://downloads.apache.org/kafka/${KAFKA_VERSION}/kafka_${SCALA_VERSION}-${KAFKA_VERSION}.tgz && \
    tar -xzf kafka_${SCALA_VERSION}-${KAFKA_VERSION}.tgz && \
    mv kafka_${SCALA_VERSION}-${KAFKA_VERSION} ${KAFKA_HOME} && \
    rm kafka_${SCALA_VERSION}-${KAFKA_VERSION}.tgz && \
    mkdir -p ${ZOOKEEPER_DIR} ${KAFKA_LOGS}

# Dodanie konfiguracji Zookeepera
RUN echo "tickTime=2000" > ${KAFKA_HOME}/config/zookeeper.properties && \
    echo "dataDir=${ZOOKEEPER_DIR}" >> ${KAFKA_HOME}/config/zookeeper.properties && \
    echo "clientPort=2181" >> ${KAFKA_HOME}/config/zookeeper.properties

# Dodanie konfiguracji Kafki
RUN echo "log.dirs=${KAFKA_LOGS}" > ${KAFKA_HOME}/config/server.properties && \
    echo "zookeeper.connect=localhost:2181" >> ${KAFKA_HOME}/config/server.properties

# Ustawienia portów
EXPOSE 9092 2181

# Skrypt startowy
CMD bash -c "\
    ${KAFKA_HOME}/bin/zookeeper-server-start.sh ${KAFKA_HOME}/config/zookeeper.properties & \
    sleep 5 && \
    ${KAFKA_HOME}/bin/kafka-server-start.sh ${KAFKA_HOME}/config/server.properties"
