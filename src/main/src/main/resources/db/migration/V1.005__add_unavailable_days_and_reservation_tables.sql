CREATE TABLE IF NOT EXISTS unavailable_days (
    id BIGSERIAL PRIMARY KEY,
    date DATE NOT NULL,
    reason VARCHAR(255),
    is_recurring BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS reservation (
    id BIGSERIAL PRIMARY KEY,
    reservation_date DATE NOT NULL,
    reservation_time TIME NOT NULL,
    employee_offer_id BIGINT,
    user_id UUID NOT NULL,
    duration INTEGER NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'pending',
    CONSTRAINT fk_employee_offer_id FOREIGN KEY (employee_offer_id) REFERENCES employee_offer(id)
);
