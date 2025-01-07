FROM confluentinc/cp-kafka:7.0.1

# Skopiuj plik konfiguracyjny Kafka
COPY kafka.properties /etc/kafka/kafka.properties

# Domyślny CMD do uruchamiania Kafki z KRaft
CMD ["kafka-server-start", "/etc/kafka/kafka.properties"]
