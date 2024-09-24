SELECT name, rate, working_days, working_hours_start, working_hours_end
FROM service INNER JOIN service_data ON service_data.id = service.data 
WHERE user_id = ${user_id};
