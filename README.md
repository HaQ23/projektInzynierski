# 💇‍♂️ Aplikacja do zarządzania salonem fryzjerskim

Projekt inżynierski autorstwa Krzysztofa Dobosza. Aplikacja umożliwia zarządzanie rezerwacjami oraz usługami salonu fryzjerskiego, skierowana zarówno do klientów, jak i administratorów salonu.
## 🛠️ Technologie

- **Frontend:** Angular, Angular Material, TypeScript, HTML, SCSS
- **Backend:** Java, Spring Boot, Spring Data, Spring Security, Hibernate, Lombok
- **Baza danych:** PostgreSQL
- **Inne:** Apache Kafka, Eureka Discovery Server, JWT

## 📌 Główne funkcje

- Rejestracja i logowanie z obsługą tokenów JWT
- Rezerwacja usług fryzjerskich u konkretnych pracowników
- Przypomnienia i potwierdzenia wizyt za pomocą systemu powiadomień
- Zarządzanie użytkownikami, pracownikami, usługami i rezerwacjami przez panel administratora
- Automatyczne powiadomienia (Apache Kafka + e-mail)

## 🧱 Architektura systemu

System oparty na architekturze mikroserwisowej:

- **Frontend:** Angular + Angular Material (SPA)
- **Backend:** Java + Spring Boot (REST API, Spring Security, Hibernate, Lombok)
- **Baza danych:** PostgreSQL
- **Komunikacja:** Apache Kafka
- **Rejestr usług:** Eureka Server

## 🧑‍💼 Widoki użytkownika

- **Klient:** może rezerwować wizyty, zarządzać nimi, edytować profil
- **Administrator:** pełna kontrola nad użytkownikami, pracownikami, usługami i rezerwacjami

## 🖼️ Zrzuty ekranu

### Logowanie
![Logowanie](https://raw.githubusercontent.com/HaQ23/projektInzynierski/main/screenshots/login.png)

### Rejestracja
![Rejestracja](https://raw.githubusercontent.com/HaQ23/projektInzynierski/main/screenshots/register.png)

### Rezerwacja usługi
![Rezerwacja](https://raw.githubusercontent.com/HaQ23/projektInzynierski/main/screenshots/reservation.png)

### Panel administratora
![Panel Admina](https://raw.githubusercontent.com/HaQ23/projektInzynierski/main/screenshots/admin_panel.png)


