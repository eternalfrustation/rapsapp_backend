CREATE TABLE IF NOT EXISTS users (
	id SERIAL PRIMARY KEY,
	name text NOT NULL,
	email text NOT NULL UNIQUE,
	otp text,
	otp_creation_time timestamp with time zone,
	phone text NOT NULL,
	role user_role NOT NULL,
	password bytea NOT NULL,
	salt bytea NOT NULL);

