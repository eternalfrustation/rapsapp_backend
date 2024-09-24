INSERT INTO service (data, user_id) 
VALUES (
    (INSERT INTO service_data (name, rate) 
     VALUES (${name}, ${rate}) 
     RETURNING id),
    ${user_id}
);
