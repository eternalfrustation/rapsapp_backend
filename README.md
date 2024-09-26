- `PUT /auth/sign_in`
    - Json({email, password})
- `POST /auth/sign_up`
    - Json({name, email, phone, password})
- `POST /auth/google`
    - Json({credential})
- `POST /auth/new_otp`
    - Json({email})
- `POST /auth/verify_otp`
    - Json({email, otp})
- `POST /auth/reset_password`
    - Json({email, otp, password})
- `GET /users`
- `POST /profile`
    - Json({adhaar, city, district, pin_code, town, account_number, branch, ifsc})
- `GET /profile`
- `POST /profile/photo`
    - Image Bytes
- `GET /profile/photo`
- `POST /profile/services`
    - Json({name, rate, working_days, working_hours_start, working_hours_end})
- `GET /profile/services`

/auth/sign_in responds with a cookie name auth-token 
auth-token should be sent back as a cookie, this is automatically done for web browsers, must be done manually on mobile.
