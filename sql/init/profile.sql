CREATE TABLE IF NOT EXISTS profile (
	user_id INTEGER references users(id) PRIMARY KEY,
	adhaar text NOT NULL,
	city TEXT NOT NULL,
	district TEXT NOT NULL,
	pin_code INTEGER NOT NULL,
	town TEXT NOT NULL,
	account_number INTEGER NOT NULL,
	branch TEXT NOT NULL,
	ifsc TEXT NOT NULL
);
