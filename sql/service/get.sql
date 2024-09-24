SELECT name, rate 
FROM service INNER JOIN service_data ON service_data.id = service.data 
WHERE user_id = ${user_id};
