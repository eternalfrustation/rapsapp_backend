INSERT INTO users (name, email, password, salt, phone, role)
VALUES (${name}, ${email}, ${hash}, ${salt}, ${phone}, 'provider');
