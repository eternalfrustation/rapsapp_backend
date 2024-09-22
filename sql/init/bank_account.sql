CREATE TABLE bank_account (
	id SERIAL PRIMARY KEY,
	account_number INTEGER NOT NULL,
	branch TEXT NOT NULL,
	ifsc TEXT NOT NULL,
)
