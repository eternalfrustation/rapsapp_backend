INSERT INTO service (data, user_id) 
VALUES (
    (INSERT INTO service_data (name, rate, working_days, working_hours_start, working_hours_end) 
     VALUES (${name}, ${rate}, ${working_days}, ${working_hours_start}, ${working_hours_end}) 
     RETURNING id),
    ${user_id}
);
