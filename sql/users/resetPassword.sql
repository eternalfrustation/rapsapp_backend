UPDATE users
SET salt = ${salt}, password = ${password} 
WHERE 
	email = ${email} AND
	otp = ${otp} AND
	otp_creation_time < CURRENT_TIMESTAMP - interval '5 minutes';
