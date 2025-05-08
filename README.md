# 💇‍♂️ Aplikacja do zarządzania salonem fryzjerskim

Projekt inżynierski autorstwa Krzysztofa Dobosza. Celem projektu było stworzenie kompleksowego systemu wspierającego pracę salonów fryzjerskich poprzez umożliwienie zarządzania rezerwacjami, klientami, ofertami i personelem.## 🛠️ Technologie

- **Frontend:** Angular, Angular Material, TypeScript, HTML, SCSS
- **Backend:** Java, Spring Boot, Spring Data, Spring Security, Hibernate, Lombok
- **Baza danych:** PostgreSQL
- **Inne:** Apache Kafka, Eureka Discovery Server, JWT

## 📌 Główne funkcje

### ✅ Rejestracja i logowanie (z obsługą JWT)
- Bezpieczne logowanie i rejestracja z użyciem tokenów JWT.
- Proces aktywacji konta poprzez e-mail.
- Obsługa błędów i komunikatów walidacyjnych po stronie klienta i serwera.

### 💬 Interaktywny widok usług i pracowników
- Możliwość przeglądania dostępnych usług fryzjerskich przypisanych do konkretnych pracowników.
- Dynamiczne filtrowanie usług według pracownika i typu zabiegu.

### 📅 System rezerwacji
- Rezerwacja terminu u wybranego fryzjera w dogodnym dniu i godzinie.
- Interaktywny kalendarz z wyszarzonymi niedostępnymi terminami.
- Automatyczne przypomnienia i potwierdzenia wizyt wysyłane e-mailem (Apache Kafka).

### 👤 Panel klienta
- Przegląd zaplanowanych i zakończonych wizyt.
- Możliwość anulowania rezerwacji.
- Edycja danych osobowych i kontaktowych.
- Historia wszystkich usług z możliwością przeglądu szczegółów.

### 🛠️ Panel administratora
- Zarządzanie użytkownikami: edycja danych, blokowanie kont, przegląd aktywności.
- Zarządzanie pracownikami: dodawanie, usuwanie, przypisywanie ofert.
- Zarządzanie ofertami: pełna edycja, dodawanie i usuwanie usług.
- Przypisywanie usług do konkretnych pracowników z określeniem ceny i czasu trwania.

### 🔁 Powiadomienia i automatyzacja
- Obsługa powiadomień e-mail za pomocą Apache Kafka.
- Przypomnienia o wizytach, potwierdzenia i anulacje realizowane asynchronicznie.

### 🔒 Bezpieczeństwo i autoryzacja
- Pełna ochrona zasobów z wykorzystaniem Spring Security.
- Uwierzytelnianie użytkowników poprzez tokeny JWT oraz odświeżające (refresh tokens).
- Obsługa autologowania i wygasania sesji.

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

### 🔐 Logowanie
![Logowanie](https://raw.githubusercontent.com/HaQ23/projektInzynierski/main/screenshots/strona_logowania.png)

### 📝 Rejestracja
![Rejestracja](https://raw.githubusercontent.com/HaQ23/projektInzynierski/main/screenshots/strona_rejestracji.png)

### 💇‍♀️ Przegląd usług
![Usługi](https://raw.githubusercontent.com/HaQ23/projektInzynierski/main/screenshots/strona_usług.png)

### 📅 Rezerwacja usługi
![Rezerwacja](https://raw.githubusercontent.com/HaQ23/projektInzynierski/main/screenshots/modal_rezerwacji_usługi.png)

### 👤 Profil użytkownika
![Profil](https://raw.githubusercontent.com/HaQ23/projektInzynierski/main/screenshots/profil_uzytkownika.png)

### 🧰 Panel administratora – zarządzanie ofertami
![Zarządzanie ofertami](https://raw.githubusercontent.com/HaQ23/projektInzynierski/main/screenshots/zarzadzanie_ofertami.png)

### 🧾 Diagram bazy danych (ERD)
![Diagram ERD](https://raw.githubusercontent.com/HaQ23/projektInzynierski/main/screenshots/diagram_erd.png)
