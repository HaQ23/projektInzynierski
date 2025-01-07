#!/bin/bash

# Start Zookeeper
echo "Starting Zookeeper..."
zookeeper-server-start /etc/kafka/zookeeper.properties &

# Czekanie na Zookeepera
sleep 10

# Start Kafka
echo "Starting Kafka..."
exec kafka-server-start /etc/kafka/server.properties
