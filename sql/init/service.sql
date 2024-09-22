CREATE TABLE service_data (
	id SERIAL PRIMARY KEY,
	name text NOT NULL,
	rate INTEGER NOT NULL,
);

CREATE TABLE service (
	data INTEGER references service_data(id),
	user_id INTEGER references users(id),
)
