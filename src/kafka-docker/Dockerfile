FROM confluentinc/cp-kafka:7.0.1

# Skopiuj plik konfiguracyjny Kafka
COPY kafka.properties /etc/kafka/kafka.properties

# Ustawienia środowiskowe
ENV KAFKA_BROKER_ID=1
ENV KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1
ENV KAFKA_LOG_DIRS=/tmp/kafka-logs

# Uruchom Kafka z plikiem konfiguracyjnym
CMD ["kafka-server-start", "/etc/kafka/kafka.properties"]
