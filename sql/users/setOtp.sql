UPDATE users 
SET otp = ${otp}, otp_creation_time = CURRENT_TIMESTAMP
WHERE email = ${email}

